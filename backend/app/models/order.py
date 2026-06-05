
"""
file: backend/app/models/order.py
author: Eddy M (2026/06/05)
last mod: 2026/06/05
recent mods:
    - 2026/06/05 [Eddy M - BackEnd]: file created.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db_conn import Base

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    customer_phone = Column(String(20), nullable=False)
    status = Column(String(20), default="pending")  # pending, approved, rejected, completed
    total = Column(Float, default=0.0)
    items = Column(JSON, nullable=False)  # Lista de {product_id, name, quantity, unit_price, subtotal}
    
    created_by_csr_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    approved_by_csr_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    approved_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relaciones
    created_by = relationship("User", foreign_keys=[created_by_csr_id])
    approved_by = relationship("User", foreign_keys=[approved_by_csr_id])
