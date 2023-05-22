from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from components.metrics_changes.models import MetricChangeModel
from components.metrics_changes.serializers import (
    UserMetricChangeListModelSerializer,
)
from components.metrics.models import WeatherMetricsModel
from shared.api.views import QueryModelViewSet


class UserMetricChangeQueryModelViewSet(QueryModelViewSet):
    """QueryModelViewSet для работы с изменениями метрик"""

    queryset = MetricChangeModel.objects.all().order_by('created')
    serializer_class = UserMetricChangeListModelSerializer
    # permission_classes = [IsAuthenticated]
    pagination_class = None
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['user']
    ordering = ['-created']

