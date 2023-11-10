from functools import wraps
import logging
from logging.handlers import TimedRotatingFileHandler
import os
from asgi_request_id import get_request_id


class MyLogger:
    def process(func):
        """
        自定义日志处理, 往日志中输出额外参数字段(这里为request id)
        """

        @wraps(func)
        def wrapper(self, msg, *args, **kwargs):
            # 获取调用方所在栈帧(第2帧，数组下标为1)

            kwargs["extra"] = {
                # 当前请求id
                "request_id": get_request_id(),
            }
            func(self, msg, *args, **kwargs)

        return wrapper

    def __init__(self, name):
        self.logger = logging.getLogger(name)
        self.name = name

    def setLevel(self, log_level):
        self.logger.setLevel(log_level)

    def addHandler(self, handler):
        self.logger.addHandler(handler)

    @process
    def debug(self, msg, *args, **kwargs):
        self.logger.debug(msg, *args, **kwargs)

    @process
    def info(self, msg, *args, **kwargs):
        self.logger.info(msg, *args, **kwargs)

    @process
    def warn(self, msg, *args, **kwargs):
        self.logger.warn(msg, *args, **kwargs)

    @process
    def error(self, msg, *args, **kwargs):
        self.logger.error(msg, *args, **kwargs)

    @staticmethod
    def getLogger(name):
        # Web应用日志
        app_logger = MyLogger(name)
        if not os.path.exists("logs"):
            os.mkdir("logs")

        app_logger.setLevel(logging.DEBUG)
        app_fh = TimedRotatingFileHandler(
            filename="logs/app.log", when="midnight", backupCount=30
        )
        # 设置打印字段格式
        formatter = logging.Formatter(
            "%(asctime)s %(request_id)s - %(levelname)s: %(message)s"  # noqa
        )

        app_fh.setLevel(logging.DEBUG)
        app_fh.setFormatter(formatter)
        app_logger.addHandler(app_fh)
        return app_logger
