from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from api.deps import get_db
from models.consumption_log import ConsumptionLog
from models.product_cache import ProductCache
from models.user_product import UserProduct
import datetime

router = APIRouter()

@router.get("/consumption/stats")
def get_stats(user_id: int = Query(...), db: Session = Depends(get_db)):
    today = datetime.date.today()
    last_30_days = today - datetime.timedelta(days=30)

    logs = db.query(ConsumptionLog).filter(
        ConsumptionLog.user_id == user_id,
        ConsumptionLog.date >= last_30_days
    ).all()

    today_kcal = 0
    kcal_values = []

    for log in logs:
        # Récupérer les calories associées
        if log.product_cache_id:
            product = db.query(ProductCache).filter(ProductCache.id == log.product_cache_id).first()
            calories = product.calories
        elif log.user_product_id:
            product = db.query(UserProduct).filter(UserProduct.id == log.user_product_id).first()
            calories = product.custom_calories
        else:
            continue

        total_kcal = calories * log.quantity

        if log.date == today:
            today_kcal += total_kcal

        kcal_values.append(total_kcal)

    avg_30_days = round(sum(kcal_values) / 30, 2) if kcal_values else 0

    return {
        "calories_today": round(today_kcal, 2),
        "average_last_30_days": avg_30_days
    }

@router.get("/consumption/history")
def get_history(user_id: int = Query(...), db: Session = Depends(get_db)):
    logs = db.query(ConsumptionLog).filter(ConsumptionLog.user_id == user_id).order_by(ConsumptionLog.date.desc()).all()

    result = []

    for log in logs:
        if log.product_cache_id:
            product = db.query(ProductCache).filter(ProductCache.id == log.product_cache_id).first()
            calories = product.calories
            name = product.name
            unit = "unit"
        elif log.user_product_id:
            product = db.query(UserProduct).filter(UserProduct.id == log.user_product_id).first()
            calories = product.custom_calories
            name = product.custom_name
            unit = "unit"
        else:
            continue

        result.append({
            "name": name,
            "quantity": log.quantity,
            "calories": calories * log.quantity,
            "unit": unit,
            "date": log.date.strftime("%Y-%m-%d")
        })

    return result

@router.get("/consumption/calories_per_day")
def get_daily_calories(user_id: int = Query(...), db: Session = Depends(get_db)):
    today = datetime.date.today()
    last_30_days = today - datetime.timedelta(days=30)

    logs = db.query(ConsumptionLog).filter(
        ConsumptionLog.user_id == user_id,
        ConsumptionLog.date >= last_30_days
    ).all()

    daily_totals = {}

    for log in logs:
        # Trouver le bon produit
        if log.product_cache_id:
            product = db.query(ProductCache).filter(ProductCache.id == log.product_cache_id).first()
            calories = product.calories
        elif log.user_product_id:
            product = db.query(UserProduct).filter(UserProduct.id == log.user_product_id).first()
            calories = product.custom_calories
        else:
            continue

        date_str = log.date.strftime("%Y-%m-%d")
        total = calories * log.quantity

        if date_str in daily_totals:
            daily_totals[date_str] += total
        else:
            daily_totals[date_str] = total

    # Normaliser les dates sur 30 jours pour éviter les trous dans le graphe
    result = []
    for i in range(30):
        d = (today - datetime.timedelta(days=i))
        date_str = d.strftime("%Y-%m-%d")
        result.append({
            "date": date_str,
            "calories": round(daily_totals.get(date_str, 0), 2)
        })

    return sorted(result, key=lambda x: x["date"])  # retour trié
