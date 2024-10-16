from rest_framework.routers import DefaultRouter

from components.harvest_recomendation.views.harvest_recomendation_viewset import HarvestRecomendationViewSet

app_name = 'harvest_recomendation'

router = DefaultRouter()
router.register(r'', HarvestRecomendationViewSet, basename='harvest_recommendations')

urlpatterns = router.urls
