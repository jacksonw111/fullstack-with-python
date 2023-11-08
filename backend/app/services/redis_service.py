import redis
from app.config import settings


class RedisService:
    def __init__(self):
        self.redis_client = redis.Redis(
            host=settings.REDIS_URL,
            port=settings.REDIS_PORT,
            password=settings.REDIS_PASS,
        )

    def set_value(self, key: str, value: str) -> bool:
        return self.redis_client.set(key, value.encode("utf-8"))

    def set_value_ex(self, key: str, value: str, ex: int) -> bool:
        return self.redis_client.set(key, value.encode("utf-8"), ex=ex)

    def delete(self, *args):
        return self.redis_client.delete(*args)

    def get_value(self, key: str) -> str:
        value = self.redis_client.get(key)
        return value.decode() if value else None


instance = RedisService()
