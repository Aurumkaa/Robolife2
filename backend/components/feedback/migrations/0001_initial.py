# Generated by Django 4.1.3 on 2023-05-29 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FeedbackModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
                ('message', models.CharField(blank=True, max_length=256, verbose_name='Сообщение')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email')),
                ('url', models.CharField(blank=True, max_length=512, verbose_name='URL')),
            ],
            options={
                'verbose_name': 'Обращение',
                'verbose_name_plural': 'Обращения',
                'ordering': ['-created'],
            },
        ),
    ]
