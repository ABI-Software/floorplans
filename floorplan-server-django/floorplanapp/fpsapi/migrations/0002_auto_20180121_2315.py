# Generated by Django 2.0.1 on 2018-01-21 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fpsapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='url',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='username',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
