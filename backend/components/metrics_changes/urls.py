from rest_framework.routers import DefaultRouter

from components.metrics_changes.views import UserMetricChangeCommandViewSet, UserMetricChangeQueryModelViewSet

app_name = 'metric_change'

router = DefaultRouter()
router.register(r'q', UserMetricChangeQueryModelViewSet, basename='metric_change_query')
router.register(r'c', UserMetricChangeCommandViewSet, basename='metric_change_command')

urlpatterns = router.urls
