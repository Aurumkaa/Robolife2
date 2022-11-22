# Generated by Django 4.1.3 on 2022-11-22 16:53

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
                ('name', models.CharField(max_length=100, verbose_name='Название')),
                ('appearance_date', models.DateField(default=django.utils.timezone.now, verbose_name='Дата появления')),
                ('price', models.IntegerField(verbose_name='Ежемесячная цена')),
                ('duration_of_action', models.IntegerField(verbose_name='Длительность действия в месяцах')),
                ('about_product', models.CharField(blank=True, max_length=100, verbose_name='О продукте')),
                ('is_published', models.BooleanField(blank=True, default=True, verbose_name='Опубликовать')),
            ],
            options={
                'verbose_name': 'Продукт',
                'verbose_name_plural': 'Продукты',
                'ordering': ['appearance_date'],
            },
        ),
    ]
