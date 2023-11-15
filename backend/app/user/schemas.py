from typing import List
from pydantic import BaseModel, EmailStr, Field


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str
    is_active: bool


class UsersResponse(BaseModel):
    total: int = Field()
    users: List[UserResponse]


class UserUpdate(BaseModel):
    email: EmailStr = Field()
    name: str = Field()
    is_active: bool = Field()
