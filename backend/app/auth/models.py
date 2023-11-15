from datetime import datetime, timedelta
import secrets
import string
from jose import jwt
from sqlalchemy import Boolean, Column, Integer, LargeBinary, String
import bcrypt


from app.database.core import Base
from app.config import settings
from app.logging import MyLogger
from app.models import TimeStampMixin

logger = MyLogger.getLogger(__name__)


def generate_password():
    """Generates a reasonable password if none is provided."""
    alphanumeric = string.ascii_letters + string.digits
    while True:
        password = "".join(secrets.choice(alphanumeric) for i in range(10))
        if (
            any(c.islower() for c in password)
            and any(c.isupper() for c in password)  # noqa
            and sum(c.isdigit() for c in password) >= 3  # noqa
        ):
            break
    return password


def hash_password(password: str):
    """Generates a hashed version of the provided password."""
    pw = bytes(password, "utf-8")
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pw, salt)


class User(Base, TimeStampMixin):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    name = Column(String(120), nullable=False, index=True)
    password = Column(LargeBinary, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("utf-8"), self.password)

    @property
    def access_token(self):
        now = datetime.now()
        exp = (now + timedelta(minutes=settings.ACCESS_TOKEN_EXP)).timestamp()
        data = {"exp": exp, "sub": str(self.id)}
        logger.info(f"exp: {exp}")
        return jwt.encode(
            data, settings.ACCESS_TOKEN_SECRET, algorithm=settings.JWT_ALG
        )

    @property
    def refresh_token(self):
        now = datetime.now()
        exp = (now + timedelta(days=settings.REFRESH_TOKEN_EXP)).timestamp()
        data = {"exp": exp, "sub": str(self.id)}
        return jwt.encode(
            data, settings.REFRESH_TOKEN_SECRET, algorithm=settings.JWT_ALG
        )
