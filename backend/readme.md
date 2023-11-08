cheatsheet

```
poetry export --without-hashes --format=requirements.txt > requirements.txt


alembic init app/database/revisions/core
alembic revision --autogenerate -m "test" # 需要将所有的model 在 app/__init__.py 导出
alembic upgrade head
```
