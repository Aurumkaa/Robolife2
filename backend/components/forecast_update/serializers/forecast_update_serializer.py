from rest_framework.serializers import ModelSerializer
from components.forecast_update.models import ForecastUpdateModel


class ForecastUpdateSerializer(ModelSerializer):
    """Сериализатор для обновлённого списка прогноза погоды"""


    class Meta:

        model = ForecastUpdateModel

        fields = [
            'id', 
            'station_code', 
            'date', 
            'forecast', 
        ]
