
"""
file: backend/app/models/user.py [2026/06/05]
last mod: 2026/06/05
recent mods:
    - 2026/06/05 [Eddy M - BackEnd]: file created.
"""

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from db_conn import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="csr")
    full_name = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
