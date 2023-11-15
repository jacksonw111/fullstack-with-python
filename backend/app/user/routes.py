from typing import Annotated
from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
from sqlalchemy import desc
from app.auth.models import User

from app.database.core import DbSession
from app.logging import MyLogger
from app.user.schemas import UserResponse, UserUpdate, UsersResponse
from app.user import services as user_service

api_router = APIRouter(prefix="/users")
logger = MyLogger.getLogger(__name__)


@api_router.get("")
async def query(
    *,
    db: DbSession,
    email: Annotated[str | None, Query()] = None,
    current_page: Annotated[int, Query()] = 0,
    page_size: Annotated[int, Query()] = 10,
):
    query = db.query(User)
    if email is not None:
        logger.info(f"email: {email}")
        query = query.filter(User.email == email)

    total = query.count()
    query = (
        query.order_by(desc(User.created_at))
        .offset(current_page * page_size)
        .limit(page_size)
    )
    users = query.all()
    return UsersResponse(
        total=total, users=[UserResponse(**jsonable_encoder(user)) for user in users]
    )


@api_router.put("/{user_id}")
def update(*, user_id=Annotated[int, Query()], db: DbSession, request: UserUpdate):
    user: User = user_service.instance.get_user_by_id(db=db, user_id=user_id)
    user_obj = jsonable_encoder(user)
    updated_user = request.model_dump(exclude_unset=True)
    for field in user_obj:
        if field in updated_user:
            setattr(user, field, updated_user[field])
