from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.models import User, hash_password
from app.auth.schemas import RegisterRequest
from app.auth.service import (
    Token,
    get_access_token,
    get_current_user,
    get_refresh_token,
    get_user_by_email,
    get_user_from_refresh_token,
    new_token,
)

from app.database.core import DbSession
from app.services import redis_service

api_router = APIRouter()


@api_router.post("/register")
async def register(db: DbSession, request: RegisterRequest):
    user = User(
        email=request.email, password=hash_password(request.password), name=request.name
    )
    db.add(user)
    db.commit()
    db.flush()


@api_router.api_route("/token", methods=["POST"])
async def get_token(db: DbSession, form_data: OAuth2PasswordRequestForm = Depends()):
    user: User = get_user_by_email(db=db, email=form_data.username)
    if user.check_password(form_data.password):
        return new_token(user)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="password error"
    )


@api_router.put("/refresh-token")
async def refresh_token(db: DbSession, request: Token):
    """
    1. redis 需要存在这个 token
    2. 这个 token 要能够解密
    """
    refresh_token = get_refresh_token(request.user_id)
    old_access_token = get_access_token(request.user_id)

    if old_access_token != request.access_token:
        raise HTTPException(
            status_code=401,
            detail=f"access token not found. token={request.access_token}",
        )

    if refresh_token != request.refresh_token:
        raise HTTPException(
            status_code=401,
            detail=f"refresh token not found. token={request.refresh_token}",
        )

    user: User = get_user_from_refresh_token(refresh_token=request.refresh_token, db=db)
    return new_token(user)


@api_router.delete("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    redis_service.instance.delete(
        str(current_user.id) + "_ACCESS_TOKEN"
    )  # 删除 access_token
    redis_service.instance.delete(
        str(current_user.id) + "_REFRESH_TOKEN"
    )  # 删除 refresh_token
