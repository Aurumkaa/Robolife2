from django.db.models import TextChoices


class NotificationsTypeEnum(TextChoices):
    """Enum для видов уведомлений"""

    TEMPERATURE = 'temperature', 'температура'
    WIND = 'wind', 'ветер'
    HUMIDITY = 'humidity', 'влажность воздуха'
    CHARGE = 'charge', 'заряд АКБ'
    SOLAR_RADIATION = 'solar radiation', 'солнечная радиация'
    PRECIPITATION = 'precipitation', 'осадки'
