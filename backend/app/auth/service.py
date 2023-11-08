from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel, ValidationError

from app.auth.models import User
from app.config import settings
from app.database.core import DbSession
from app.logging import MyLogger
from app.services import redis_service

logger = MyLogger.getLogger(__name__)
reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{settings.API_STR}/token")


class Token(BaseModel):
    user_id: str
    access_token: str
    refresh_token: str
    token_type: str


class TokenPayload(BaseModel):
    sub: Optional[int] = None


def get_user_by_email(db: DbSession, email: str):
    user: User = db.query(User).filter(User.email == email).one_or_none()
    if not user:
        raise HTTPException(status_code=status, detail=f"user not found. id={id}")
    return user


def get_user_by_id(db: DbSession, id: int):
    user: User = db.query(User).filter(User.id == id).one_or_none()
    if not user:
        raise HTTPException(status_code=status, detail=f"user not found. id={id}")
    return user


def get_current_user_by_token(token: str, secret_key: str, db: DbSession):
    try:
        logger.info(f"token: {token}")
        payload = jwt.decode(token, secret_key, algorithms=[settings.JWT_ALG])
        logger.info(f"payload: {payload}")
        token_data = TokenPayload(**payload)
        logger.info(f"token_data: {token_data}")
    except (JWTError, ValidationError) as e:
        logger.error(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="validate token error. expired",
        )

    user = db.query(User).filter(User.id == int(token_data.sub)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="auth failed. User not found",
        )

    return user


def get_current_user(db: DbSession, token: str = Depends(reusable_oauth2)) -> User:
    user = get_current_user_by_token(
        db=db, secret_key=settings.ACCESS_TOKEN_SECRET, token=token
    )
    return user


def get_user_from_refresh_token(refresh_token: str, db: DbSession) -> User:
    user = get_current_user_by_token(
        db=db, secret_key=settings.REFRESH_TOKEN_SECRET, token=refresh_token
    )
    return user


def new_token(user: User):
    new_access_token = user.access_token
    new_refresh_token = user.refresh_token
    redis_service.instance.set_value(str(user.id) + "_REFRESH_TOKEN", new_refresh_token)
    redis_service.instance.set_value(str(user.id) + "_ACCESS_TOKEN", new_access_token)
    return {"access_token": new_access_token, "refresh_token": new_refresh_token}


def get_access_token(user_id: str):
    return redis_service.instance.get_value(user_id + "_ACCESS_TOKEN")


def get_refresh_token(user_id: str):
    return redis_service.instance.get_value(user_id + "_REFRESH_TOKEN")
