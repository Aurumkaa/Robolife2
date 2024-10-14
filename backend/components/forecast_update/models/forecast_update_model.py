from django.db.models import CharField, DateTimeField, JSONField
from shared.models import BaseModel


class ForecastUpdateModel(BaseModel):
    """Модель для обновлённого прогноза погоды"""

    station_code = CharField(max_length=10, verbose_name='Код станции')
    date = DateTimeField(verbose_name='Дата')
    forecast = JSONField(verbose_name='Прогноз погоды')


    class Meta:

        verbose_name = 'Обновление прогноза погоды'
        verbose_name_plural = 'Обновления прогнозов погоды'
        ordering = ['-created']


    def __str__(self):
        return f'Updated forecast for station {self.station_code} on {self.date}'
