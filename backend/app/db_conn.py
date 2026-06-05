
"""
file: backend/app/db_conn.py
author: Eddy M (2026/06/04)
last mod: 2026/06/04.
recent mods:
    - 2026/06/04 [Eddy M - BackEnd]: file created.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
