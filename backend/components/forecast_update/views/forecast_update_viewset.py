from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from components.forecast_update.serializers.forecast_update_serializer import ForecastUpdateSerializer
from components.notifications.enums import NotificationsTypeEnum
from components.notifications.services import UserNotificationService
import json
from utils import get_crops_recommendations


class ForecastUpdateViewSet(ModelViewSet):
    """ViewSet для получения обновлённого списка прогноза погоды"""

    service_class = UserNotificationService
    serializer_class = ForecastUpdateSerializer
    crops_recommendations = []


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service_class = self.service_class()


    def create(self, request):
        serializer = ForecastUpdateSerializer(data=request.data)

        if serializer.is_valid():
            # serializer.save()
            self.crops_recommendations = get_crops_recommendations(serializer.data['forecast'])
            self.perform_create(serializer)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def perform_create(self, serializer):
        for recommendation in self.crops_recommendations:
            self.service_class.create_user_notifications(
                None, 
                None, 
                json.dumps(recommendation), 
                NotificationsTypeEnum.CROP_RECOMMENDATION_RECEIVED, 
            )
