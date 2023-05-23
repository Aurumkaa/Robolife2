from rest_framework.serializers import ModelSerializer
from components.accounts.models.user_model import DeviationSetting
from components.accounts.serializers import UserModelSerializer

class DeviationSettingModelSerializer(ModelSerializer):
    """Сериализатор для списка пользовательских настроек оповещений о климатических отклонениях"""

    # user = UserModelSerializer(read_only=True)

    class Meta:
        model = DeviationSetting
        fields = [
            'id',
            'user',
            'param_type',
            'min',
            'max'
        ]
