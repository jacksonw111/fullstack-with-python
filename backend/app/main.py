import logging
from fastapi import FastAPI
from .rate_limiter import limiter
from app.routes import api_router

logging.basicConfig(level=logging.DEBUG)


app = FastAPI()
app.state.limiter = limiter

app.include_router(api_router)
