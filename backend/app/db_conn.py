
"""
file: backend/app/db_conn.py
author: Eddy M (2026/06/04)
last mod: 2026/06/05.
recent mods:
    - 2026/06/04 [Eddy M - BackEnd]: file created.
    - 2026/06/05 [Eddy M - BackEnd]: get_db creado.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
