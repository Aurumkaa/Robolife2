from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from components.accounts.models.user_model import DeviationSetting
from components.accounts.serializers import DeviationSettingModelSerializer
from shared.api.views import QueryModelViewSet


class DeviationSettingQueryModelViewSet(QueryModelViewSet):
    """QueryModelViewSet для работы c пользовательскими настройками оповещений о климатических отклонениях"""

    queryset = DeviationSetting.objects.all()
    serializer_class = DeviationSettingModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.queryset.filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
