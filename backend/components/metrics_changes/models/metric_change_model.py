from django.db.models import FloatField,  ForeignKey, SET_NULL, CharField, DateTimeField
from shared.models import BaseModel
from config.settings import AUTH_USER_MODEL

class MetricChangeModel(BaseModel):
    """Модель для изменившейся метрики"""

    station_id = CharField(max_length=20,  verbose_name='Станция')
    value_after = FloatField(verbose_name='Значение после изменения')
    date = DateTimeField(verbose_name='Дата')
    user = ForeignKey(AUTH_USER_MODEL, null=True, on_delete=SET_NULL, verbose_name='Пользователь')

    class Meta:
        verbose_name_plural = 'Изменения метрик'
        verbose_name = 'Изменение метрики'
        ordering = ['-created']

    def __str__(self):
        return f'{self.date} | {self.user} |  {self.value_after}'
