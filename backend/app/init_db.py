
"""
file: backend/app/init_db.py
author: Eddy M (2026/06/05)
last mod: 2026/06/05.
recent mods:
    - 2026/06/05 [Eddy M - BackEnd]: file created.
"""


from app.db_conn import engine, Base
from app.models import User, Order  # Importar ambos

print("Creando tablas...")
Base.metadata.create_all(bind=engine)
print("Tablas creadas exitosamente.")
