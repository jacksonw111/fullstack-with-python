from pydantic import BaseModel


class RegisterRequest(BaseModel):
    email: str
    name: str
    password: str
