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
from app.user import services as user_service

logger = MyLogger.getLogger(__name__)
reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{settings.API_STR}/token")


class Token(BaseModel):
    user_id: int
    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    sub: Optional[int] = None


def get_current_user_by_token(token: str, secret_key: str, db: DbSession):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[settings.JWT_ALG])
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError) as e:
        logger.error(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="validate token error. expired",
        )

    # user = db.query(User).filter(User.id == int(token_data.sub)).first()
    return user_service.instance.get_user_by_id(user_id=int(token_data.sub), db=db)


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
    return {
        "user_id": user.id,
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
    }


def get_access_token(user_id: str):
    return redis_service.instance.get_value(user_id + "_ACCESS_TOKEN")


def get_refresh_token(user_id: str):
    return redis_service.instance.get_value(user_id + "_REFRESH_TOKEN")
