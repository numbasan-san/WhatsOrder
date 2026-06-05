
"""
file: backend/app/main.py
author: Eddy M (2026/06/04)
last mod: 2026/06/05
recent mods:
    - 2026/06/04 [Eddy M - BackEnd]: file created.
    - 2026/06/05 [Eddy M - BackEnd]: fixed import path.
"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from routes import health_router
import uvicorn

app = FastAPI()

app.include_router(health_router)

@app.exception_handler(404)
async def not_found(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Recurso no encontrado"}
    )

@app.get("/")
def root():
    return {"message": "WhatsOrder API"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
