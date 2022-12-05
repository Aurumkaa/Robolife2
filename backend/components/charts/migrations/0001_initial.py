# Generated by Django 4.1.3 on 2022-11-27 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WindSpeedModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
                ('value', models.FloatField(blank=True, verbose_name='Значение')),
                ('date_time', models.DateTimeField(blank=True, verbose_name='Дата и время')),
            ],
            options={
                'verbose_name': 'Скорость ветра',
                'verbose_name_plural': 'Все метрики скорости ветра',
                'ordering': ['date_time'],
            },
        ),
    ]