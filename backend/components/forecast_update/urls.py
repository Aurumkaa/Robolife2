from rest_framework.routers import DefaultRouter
from components.forecast_update.views.forecast_update_viewset import ForecastUpdateViewSet


app_name = 'forecast_update'

router = DefaultRouter()
router.register(r's', ForecastUpdateViewSet, basename='forecast_update')

urlpatterns = router.urls
