from typing import NoReturn

from components.accounts.models import UserModel
from components.comments.models import UserCommentsModel
from components.metrics_changes.models import MetricChangeModel
from components.notifications.enums import NotificationsTypeEnum
from components.notifications.models import UserNotificationsModel


class UserNotificationRepository:
    """Репозиторий для работы с уведомлениями пользователей """

    model_class = UserNotificationsModel

    def create_user_notifications(self,
                                  users: list[UserModel],
                                  user_update_metric: MetricChangeModel,
                                  user_comment: UserCommentsModel,
                                  notification_type: NotificationsTypeEnum) -> NoReturn:
        """Создать массово уведомления для пользователей"""

        self.model_class.objects.bulk_create([
            UserNotificationsModel(
                comment=user_comment,
                metric_change=user_update_metric,
                user=user,
                notification_type=notification_type.value
            )
            for user in users
        ])
