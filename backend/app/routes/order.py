
"""
file: backend/app/routes/order.py
author: Eddy M (2026/06/05)
last mod: 2026/06/05.
description: Endpoint de órdenes
recent mods:
    - 2026/06/05 [Eddy M - BackEnd]: file created.
"""


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from db_conn import get_db
from models.order import Order
from utils.auth import get_current_user

router = APIRouter(prefix="/orders", tags=["pedidos"])

@router.get("/")
def list_orders(
    status: str = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    return query.all()

@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    return order

@router.put("/{order_id}/approve")
def approve_order(order_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    order.status = "approved"
    db.commit()
    return {"message": "Pedido aprobado", "order_id": order_id}
