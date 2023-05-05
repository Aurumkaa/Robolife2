from rest_framework.serializers import ModelSerializer

from components.accounts.serializers import UserModelSerializer
from components.metrics_changes.models import MetricChangeModel


class UserMetricChangeListModelSerializer(ModelSerializer):
    """Сериализатор для списка комментариев пользователя"""

    user = UserModelSerializer(read_only=True)

    class Meta:
        model = MetricChangeModel
        fields = [
            'id',
            'station_id',
            'value_after',
            'user',
            'date',
            'created'
        ]
