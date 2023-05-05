from rest_framework.serializers import ModelSerializer
from components.metrics_changes.models import MetricChangeModel


class UserMetricChangeModelSerializer(ModelSerializer):
    """Сериализатор для создания записи об изменении метрики пользователем"""

    class Meta:
        model = MetricChangeModel
        fields = [
            'id',
            'station_id',
            'value_after',
            'user',
            'date',
        ]
