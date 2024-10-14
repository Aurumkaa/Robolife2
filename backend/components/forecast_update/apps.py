from django.apps import AppConfig


class ForecastUpdateConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'components.forecast_update'
    label = 'forecast_update'
    verbose_name = 'Обновление прогноза погоды'
