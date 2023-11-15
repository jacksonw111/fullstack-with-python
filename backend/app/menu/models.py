from sqlalchemy import Column, Integer, String
from app.database.core import Base
from app.models import TimeStampMixin


class Menu(Base, TimeStampMixin):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True, nullable=False)
    path = Column(String, index=True, nullable=False)
    component = Column(String, index=True, nullable=False)
    meta_id = Column(Integer, nullable=False, index=True)
    parent_id = Column(Integer, nullable=False)


class MenuMeta(Base):
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    icon = Column(String, nullable=True, index=True)
