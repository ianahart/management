# Generated by Django 4.0.4 on 2023-01-18 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_alter_course_created_at_alter_course_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='semester',
            field=models.CharField(max_length=20),
        ),
    ]
