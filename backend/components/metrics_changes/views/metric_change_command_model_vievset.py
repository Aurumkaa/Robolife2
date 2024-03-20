from rest_framework.permissions import IsAuthenticated

from components.metrics_changes.models import MetricChangeModel
from components.metrics_changes.serializers import UserMetricChangeModelSerializer
from components.notifications.enums import NotificationsTypeEnum
from components.notifications.services import UserNotificationService
from shared.api.views import CommandModelViewSet


class UserMetricChangeCommandViewSet(CommandModelViewSet):
    """CommandModelViewSet для работы с изменениями метрик"""

    queryset = MetricChangeModel.objects.all()
    serializer_class = UserMetricChangeModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    service_class = UserNotificationService

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service_class = self.service_class()

    def perform_create(self, serializer):
        user_updated_metric_model = serializer.save()
        self.service_class.create_user_notifications(
            None,
            user_updated_metric_model,
            NotificationsTypeEnum.METRICS_UPDATED
        )