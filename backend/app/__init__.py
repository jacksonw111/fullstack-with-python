import traceback


try:
    from app.auth.models import User
    from app.menu.models import Menu, MenuMeta
except Exception as e:
    traceback.print_exc()
