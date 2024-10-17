from django.db.models import TextChoices


class NotificationsTypeEnum(TextChoices):
    """Enum для видов уведомлений"""

    COMMENT_CREATED = 'COMMENT_CREATED', 'Комментарий создан'
    METRICS_UPDATED = 'METRICS_UPDATED', 'Метрика fобновлена'
    CROP_RECOMMENDATION_RECEIVED = 'CROPS_RECOMMENDATIONS_RECEIVED', 'Получен список рекомендаций по выращиванию агрокультур'
