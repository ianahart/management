# Generated by Django 4.0.4 on 2023-02-03 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staff',
            name='courses',
        ),
        migrations.AddField(
            model_name='staff',
            name='courses',
            field=models.JSONField(blank=True, null=True),
        ),
    ]