from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from components.accounts.views import (
    RegisterUserModelViewSet,
    TokenObtainPairView, DeviationSettingQueryModelViewSet, DeviationSettingCommandModelViewSet,
)

app_name = 'accounts'

router = DefaultRouter()
router.register(r'register', RegisterUserModelViewSet, basename='user')
router.register(r'settings_deviation/q', DeviationSettingQueryModelViewSet, basename='deviation_settings_command')
router.register(r'settings_deviation/c', DeviationSettingCommandModelViewSet, basename='deviation_settings_query')

urlpatterns = router.urls

urlpatterns += [
    path('authorization/', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
   ]

