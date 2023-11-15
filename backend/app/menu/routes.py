from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from app.database.core import DbSession
from app.menu.models import Menu
from app.menu.schemas import CreateMenuRequest


api_router = APIRouter(prefix="/menus")


def build_menu_tree(menus) -> list:
    menu_dict = {menu["id"]: menu for menu in menus}
    root_menus = []

    for menu in menus:
        parent_id = menu["parent_id"]
        if parent_id == 0:
            root_menus.append(menu)
        else:
            parent_menu: dict = menu_dict.get(parent_id)
            if parent_menu:
                children: list = parent_menu.setdefault("children", [])
                children.append(menu)

    return root_menus


@api_router.get("")
async def protect(*, db: DbSession):
    menus = db.query(Menu).all()
    return build_menu_tree(jsonable_encoder(menus))


@api_router.post("")
def add(*, db: DbSession, request: CreateMenuRequest):
    menu: Menu = Menu(**jsonable_encoder(request))
    db.add(menu)
    db.commit()
    db.flush()
