from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated

from components.accounts.models.user_model import DeviationSetting
from components.accounts.serializers import DeviationSettingModelSerializer
from shared.api.views import QueryModelViewSet


class DeviationSettingQueryModelViewSet(QueryModelViewSet):
    """QueryModelViewSet для работы c пользовательскими настройками оповещений о климатических отклонениях"""

    queryset = DeviationSetting.objects.all()
    serializer_class = DeviationSettingModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['user']
