import traceback


try:
    from app.auth.models import User
except Exception as e:
    traceback.print_exc()
