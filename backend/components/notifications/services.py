from typing import NoReturn

from components.accounts.repositories import UserRepository
from components.comments.models import UserCommentsModel
from components.metrics_changes.models import MetricChangeModel
from components.notifications.enums import NotificationsTypeEnum
from components.notifications.repository import UserNotificationRepository


class UserNotificationService:
    """Сервис для работы с уведомлениями пользователей"""

    __repository_class = UserNotificationRepository
    __user_repository_class = UserRepository

    def __init__(self):
        self.__repository_class = self.__repository_class()
        self.__user_repository_class = self.__user_repository_class()

    def create_user_notifications(
            self, 
            user_comment: UserCommentsModel, 
            user_update_metric: MetricChangeModel, 
            crop_recommendation: str, 
            notification_type: NotificationsTypeEnum, 
    ) -> None:

        """Создать уведомления для всех пользователей"""

        if user_comment:
            users = self.__user_repository_class.get_all_users_without_specified([user_comment.user.id])  # Исключаем из рассылки автора уведомления
        elif user_update_metric:
            users = self.__user_repository_class.get_all_users_without_specified([user_update_metric.user.id])  #
        else:
            users = self.__user_repository_class.get_all_users()

        self.__repository_class.create_user_notifications(
            users, 
            user_update_metric, 
            user_comment, 
            crop_recommendation, 
            notification_type, 
        )
