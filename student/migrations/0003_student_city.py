# Generated by Django 4.0.4 on 2023-01-26 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0002_remove_student_address_student_state_student_street_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='city',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
