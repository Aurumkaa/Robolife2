from django.contrib import admin

from components.notifications.models import UserNotificationsModel


@admin.register(UserNotificationsModel)
class UserNotificationsModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'comment',
        'metric_change',
        'user',
        'created',
    )
    list_display_links = ('id', 'comment', 'metric_change')
    search_fields = (
        'comment',
        'user'
    )
    list_filter = ['created']
