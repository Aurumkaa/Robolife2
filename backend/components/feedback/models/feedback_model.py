from django.db.models import (
    CharField,
    EmailField,
)
from shared.models import BaseModel


class FeedbackModel(BaseModel):
    """Модель обращений"""

    message = CharField(max_length=256, blank=True, verbose_name='Сообщение')
    email = EmailField(verbose_name="email", blank=True)
    url = CharField(max_length=512, blank=True, verbose_name='URL')

    class Meta:
        verbose_name_plural = 'Обращения'
        verbose_name = 'Обращение'
        ordering = ['-created']

    def __str__(self):
        return f'{self.email} | {self.message} | {self.url}'




