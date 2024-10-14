# Generated by Django 4.1.3 on 2024-10-09 16:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('metrics_changes', '0003_alter_metricchangemodel_date'),
        ('notifications', '0004_usernotificationsmodel_metric_change_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usernotificationsmodel',
            name='recommendation',
            field=models.CharField(choices=[('NOT_ENOUGH_SUNLIGHT', 'Не хватает солнечного света для роста'), ('SEED_GOOD_TEMPERATURE', 'Хорошая температура для прорастания семян'), ('DROUGHT_HIGH_RISK_URGENT_HYDRATION', 'Высокий риск засухи и гибели сахарной свёклы. Срочно необходимо увлажнение почвы')], max_length=128, null=True, verbose_name='Тип рекомендации по выращиванию культуры'),
        ),
        migrations.AlterField(
            model_name='usernotificationsmodel',
            name='metric_change',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='metrics_changes.metricchangemodel', verbose_name='Изменение метрики'),
        ),
        migrations.AlterField(
            model_name='usernotificationsmodel',
            name='notification_type',
            field=models.CharField(choices=[('COMMENT_CREATED', 'Комментарий создан'), ('METRICS_UPDATED', 'Метрика обновлена'), ('NEW_CROP_RECOMMENDATION_RECEIVED', 'Получена новая рекомендация по выращиванию культуры')], max_length=128, null=True, verbose_name='Тип уведомления'),
        ),
    ]