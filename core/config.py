"""Application configuration settings."""

try:  # pragma: no cover - optional dependency
    from pydantic_settings import BaseSettings
except Exception:  # pragma: no cover - fallback when package missing
    from pydantic import BaseSettings

class Settings(BaseSettings):
    """Base configuration for the project."""

    DATABASE_URL: str = "sqlite:///./test.db"
    SECRET_KEY: str = "change-me"


settings = Settings()