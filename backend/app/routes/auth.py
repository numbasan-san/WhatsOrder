
"""
file: backend/app/routes/auth.py
author: Eddy M (2026/06/05)
last mod: 2026/06/05.
desc: Este archivo maneja la autenticación de usuarios (login y generación de tokens JWT).
recent mods:
    - 2026/06/05 [Eddy M - BackEnd]: file created.
"""


# Importaciones necesarias
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext  # Para hashear y verificar contraseñas
from jose import jwt  # Para crear y verificar tokens JWT
from datetime import datetime, timedelta  # Para manejar fechas de expiración

# Importaciones locales del proyecto
from db_conn import get_db  # Para obtener la sesión de la base de datos
from models.user import User  # Modelo de usuario
from config import settings  # Configuración (variables de entorno)

# Crear un router para agrupar los endpoints de autenticación
# prefix: todas las rutas empezarán con /auth
# tags: para organizar en la documentación automática de FastAPI
router = APIRouter(prefix="/auth", tags=["autenticación"])

# Configurar el contexto de encriptación de contraseñas
# bcrypt es el algoritmo de hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con su hash.
    Retorna True si coinciden, False si no.
    """
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """
    Crea un token JWT con los datos proporcionados y una fecha de expiración.
    
    Args:
        data: Diccionario con los datos que quieres incluir en el token (ej: email, rol)
        expires_delta: Tiempo de expiración personalizado (opcional)
    
    Returns:
        El token JWT como string
    """
    # Copiar los datos para no modificar el original
    to_encode = data.copy()
    
    # Calcular la fecha de expiración
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Usar el tiempo configurado en las variables de entorno
        expire = datetime.utcnow() + timedelta(hours=settings.jwt_expiration_hours)
    
    # Agregar la expiración al payload del token
    to_encode.update({"exp": expire})
    
    # Generar y retornar el token usando la clave secreta y algoritmo configurados
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)


@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    """
    Endpoint para iniciar sesión.
    
    Recibe email y contraseña, verifica credenciales y retorna un token JWT.
    """
    # Buscar el usuario en la base de datos por su email
    user = db.query(User).filter(User.email == email).first()
    
    # Si el usuario no existe, error 401 (no autorizado)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    # Verificar que la contraseña sea correcta
    if not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    # Crear el token con el email y rol del usuario
    access_token = create_access_token(data={
        "sub": user.email,  # 'sub' es el campo estándar para el identificador del usuario
        "role": user.role   # Incluimos el rol para control de permisos
    })
    
    # Retornar el token y el rol del usuario
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role
    }