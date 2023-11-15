from typing import ForwardRef
from pydantic import BaseModel, Field

SelfReference = ForwardRef("MenuResponse", is_class=True)


class CreateMenuRequest(BaseModel):
    name: str = Field()
    path: str = Field()
    component: str = Field()
    meta_id: int = Field()
    parent_id: int = Field()


class MenuMeta(BaseModel):
    icon: str


class MenuResponse(BaseModel):
    id: int = Field()
    name: str = Field()
    path: str = Field()
    # meta: MenuMeta
    children: list = []
