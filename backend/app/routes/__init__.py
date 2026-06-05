"""
file: backend/app/routes/__init__.py [2026/06/04]
last mod: 2026/06/05
recent mods:
    - 2026/06/04 [Eddy M - BackEnd]: file created.
    - 2026/06/05 [Eddy M - BackEnd]: auth import creado.
"""

from .health import router as health_router
from .auth import router as auth_router
from .order import router as order_router
