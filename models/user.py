from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)

    recipes = relationship("Recipe", back_populates="owner")
    pantry = relationship("UserIngredient", back_populates="user", cascade="all, delete-orphan")
    suggestions = relationship("RecipeSuggestion", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"


