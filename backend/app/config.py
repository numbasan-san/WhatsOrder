
"""
file: backend/app/config.py
author: Eddy M (2026/06/04)
last mod: 2026/06/05.
recent mods:
    - 2026/06/04 [Eddy M - BackEnd]: file created.
    - 2026/06/05 [Eddy M - BackEnd]: jwt_algorithm agregado.
"""


from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    redis_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 8
    gpt_api_key: str
    whatsapp_token: str

    class Config:
        env_file = ".env"

settings = Settings()
