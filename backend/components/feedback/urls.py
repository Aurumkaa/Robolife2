from rest_framework.routers import DefaultRouter

from components.feedback.views.FeedbackViewSet import FeedbackModelViewSet

# from components.my_comp.views.my_comp_viewset import MyCompViewSet

app_name = 'feedback'


router = DefaultRouter()

router.register(r'c', FeedbackModelViewSet, basename='feedback')

urlpatterns = router.urls

