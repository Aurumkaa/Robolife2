from django.contrib import admin
from components.metrics_changes.models import MetricChangeModel


@admin.register(MetricChangeModel)
class MetricChangeModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'date',
        'station_id',
        'value_after',
        'created'
    )
    list_display_links = ('id', 'user')
    search_fields = (
        'user',
    )
    list_filter = ['created']
