from fastapi import HTTPException, status
from app.auth.models import User
from app.database.core import DbSession


class UserService:
    def __init__(self) -> None:
        pass

    def get_user_by_id(self, user_id: str, db: DbSession) -> User:
        user: User = db.query(User).filter(User.id == user_id).one_or_none()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"user not found. id={user_id}",
            )
        return user

    def get_user_by_email(self, email: str, db: DbSession) -> User:
        user: User = db.query(User).filter(User.email == email).one_or_none()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"user not found. email={email}",
            )
        return user


instance = UserService()
