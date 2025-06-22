"""Database initialization utilities."""

from db.base import Base
from db.session import engine


def init_db() -> None:
    """Create database tables."""
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()