from fastapi import APIRouter, Depends
from app.auth.routes import api_router as auth_router
from app.menu.routes import api_router as menu_router
from app.auth.service import get_current_user


api_router = APIRouter()
authenticated_api_router = APIRouter()
api_router.include_router(auth_router)
authenticated_api_router.include_router(menu_router)
api_router.include_router(
    authenticated_api_router, dependencies=[Depends(get_current_user)]
)
