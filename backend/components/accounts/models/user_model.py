from django.db.models import CharField, ForeignKey, CASCADE, FloatField
from django.contrib.auth.models import AbstractUser

from components.accounts.enums import NotificationsTypeEnum
from config.settings import AUTH_USER_MODEL
from shared.models import BaseModel


class UserModel(AbstractUser):
    """Модель пользователя"""

    first_name = CharField("Имя", max_length=150)
    last_name = CharField("Фамилия", max_length=150)
    patronymic = CharField("Отчество", max_length=150, blank=True)
    phone = CharField("Номер телефона", max_length=20, blank=True, null=True)

    class Meta(AbstractUser.Meta):
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f'{self.pk} | {self.username}'


class DeviationSetting(BaseModel):
    """Модель пользовательских настроек оповещений при погодных отклонениях"""

    param_type = CharField(
        max_length=128,
        choices=NotificationsTypeEnum.choices,
        verbose_name='Тип параметра',
        null=False,
    )
    user = ForeignKey(AUTH_USER_MODEL, null=False, on_delete=CASCADE, verbose_name='Пользователь')

    min = FloatField(verbose_name='Минимум', null=True, blank=True)
    max = FloatField(verbose_name='Максимум', null=True, blank=True)

    class Meta:
        verbose_name = "Настройка сообщений об отклонении параметра"
        verbose_name_plural = "Настройки сообщений об отклонении параметра"

    def __str__(self):
        return f'{self.id} | {self.user} | {self.param_type} | {self.min} | {self.max}'
