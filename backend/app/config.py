from functools import lru_cache
import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENV: str
    API_STR: str = "http://127.0.0.1:9091"
    # postgresql
    POSTGRES_PORT: int
    POSTGRES_USER: str
    POSTGRES_DB: str
    POSTGRES_PASSWORD: str
    POSTGRES_URL: str

    # redis
    REDIS_PASS: str
    REDIS_PORT: int
    REDIS_ARGS: str
    REDIS_URL: str

    # auth
    ACCESS_TOKEN_EXP: int = 10  # 10 minutes
    REFRESH_TOKEN_EXP: int = 7  # 7 days
    ACCESS_TOKEN_SECRET: str
    REFRESH_TOKEN_SECRET: str
    JWT_ALG: str = "HS256"


class DevSettings(Settings):
    model_config = SettingsConfigDict(env_file=".env.dev")


class PRODSettings(Settings):
    model_config = SettingsConfigDict(env_file=".env.prod")


@lru_cache
def get_settings() -> Settings:
    if os.getenv("ENV", "DEV").upper() == "PROD":
        return PRODSettings()
    else:
        return DevSettings()


settings = get_settings()
