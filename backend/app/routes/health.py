
"""
file: backend/app/routes/health.py
author: Eddy M (2026/06/04)
last mod: 2026/06/04.
description: Endpoint de health check
recent mods:
    - 2026/06/04 [Eddy M - BackEnd]: file created.
"""


from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}
