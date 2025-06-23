"""Database initialization utilities."""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db.base import Base
from db.session import engine


def init_db() -> None:
    """Create database tables."""
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()