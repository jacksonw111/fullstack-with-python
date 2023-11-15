import logging
from fastapi import FastAPI, Request
from .rate_limiter import limiter
from app.routes import api_router

logging.basicConfig(level=logging.DEBUG)


app = FastAPI()
app.state.limiter = limiter


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers[
        "Strict-Transport-Security"
    ] = "max-age=31536000 ; includeSubDomains"
    return response


app.include_router(api_router)
