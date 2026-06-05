
"""
file: backend/app/utils/auth.py
author: Eddy M (2026/06/05)
last mod: 2026/06/05.
desc: Utilidades para autenticación: obtener el usuario actual desde el token JWT.
recent mods:
    - 2026/06/05 [Eddy M - BackEnd]: file created.
"""

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from db_conn import get_db
from models.user import User
from config import settings

# Esquema para extraer el token del header Authorization: Bearer <token>
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Obtiene el usuario actual a partir del token JWT.
    Esta función se usa como dependencia en rutas protegidas.
    """
    # Extraer el token del header
    token = credentials.credentials
    
    try:
        # Decodificar el token usando la clave secreta
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        # Extraer el email del campo 'sub'
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        # Si el token es inválido o expiró
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    
    # Buscar el usuario en la base de datos
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    
    # Retornar el usuario para que las rutas lo usen
    return user
