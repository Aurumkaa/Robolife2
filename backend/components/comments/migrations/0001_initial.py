# Generated by Django 4.1.3 on 2022-12-11 20:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('metrics', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserCommentsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
                ('message', models.CharField(blank=True, max_length=256, verbose_name='Комментарий')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
                ('weather_metric', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='metrics.weathermetricsmodel', verbose_name='Метрика погоды')),
            ],
            options={
                'verbose_name': 'Комментарий',
                'verbose_name_plural': 'Комментарии',
                'ordering': ['-created', '-updated'],
            },
        ),
    ]
