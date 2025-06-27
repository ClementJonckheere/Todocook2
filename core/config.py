"""Application configuration settings."""

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Base configuration for the project."""

    DATABASE_URL: str = "sqlite:///./test.db"
    SECRET_KEY: str = "change-me"


settings = Settings()