from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from models.consumption_log import ConsumptionLog
from models.product_cache import ProductCache

def get_nutrition_stats(user_id: int, db: Session):
    today = datetime.utcnow().date()
    start_date = today - timedelta(days=30)

    # Consommation totale par jour
    subquery = (
        db.query(
            ConsumptionLog.date,
            func.sum(ConsumptionLog.quantity * ProductCache.calories).label("total_calories")
        )
        .join(ProductCache, ConsumptionLog.product_cache_id == ProductCache.id)
        .filter(
            ConsumptionLog.user_id == user_id,
            ConsumptionLog.date >= start_date
        )
        .group_by(ConsumptionLog.date)
        .subquery()
    )

    # Moyenne sur 30 jours
    avg_cal = db.query(func.avg(subquery.c.total_calories)).scalar() or 0

    # Consommation aujourd'hui
    today_cal = (
        db.query(func.sum(ConsumptionLog.quantity * ProductCache.calories))
        .join(ProductCache, ConsumptionLog.product_cache_id == ProductCache.id)
        .filter(
            ConsumptionLog.user_id == user_id,
            ConsumptionLog.date == today
        )
        .scalar() or 0
    )

    return round(avg_cal, 2), round(today_cal, 2)
