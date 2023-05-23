from rest_framework.permissions import IsAuthenticated, IsAdminUser

from components.accounts.models.user_model import DeviationSetting
from components.accounts.permissions import IsOwner,IsStaff
from components.accounts.serializers import DeviationSettingModelSerializer
from shared.api.views import CommandModelViewSet


class DeviationSettingCommandModelViewSet(CommandModelViewSet):
    """CommandModelViewSet для работы c пользовательскими настройками оповещений о климатических отклонениях"""

    queryset = DeviationSetting.objects.all()
    serializer_class = DeviationSettingModelSerializer
    permission_classes = [IsStaff | IsOwner]
    pagination_class = None
