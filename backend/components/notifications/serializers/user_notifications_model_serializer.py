from rest_framework.serializers import ModelSerializer

from components.accounts.serializers.user_model_serializer import UserModelSerializer
from components.comments.serializers import UserCommentsListModelSerializer
from components.metrics_changes.serializers import UserMetricChangeListModelSerializer
from components.notifications.models import UserNotificationsModel


class UserNotificationsModelSerializer(ModelSerializer):
    """Сериализатор для уведомлений пользователя"""

    user = UserModelSerializer(read_only=True)
    comment = UserCommentsListModelSerializer(read_only=True)
    metric_change = UserMetricChangeListModelSerializer(read_only=True)

    class Meta:
        model = UserNotificationsModel
        fields = [
            'id',
            'comment',
            'metric_change',
            'user',
            'notification_type',
        ]
