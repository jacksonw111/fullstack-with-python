from fastapi import APIRouter


api_router = APIRouter()


@api_router.get("/test-protect")
def protect():
    return "protect"
