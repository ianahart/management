from django.core.exceptions import BadRequest
from django.db import models
from django.utils import timezone
from typing import Dict, Union


class CourseManager(models.Manager):

    def create(self, data: Dict):
        if data['credits'] <= 0 or data['credits'] > 4:
            print('TRUE')
            raise BadRequest('Credits must be between 1 and 4.')

        choices = ['spring', 'fall']
        if data['semester'].lower() not in choices:
            raise BadRequest('Please choose either fall or spring.')

        course = self.model(
            name=data['name'],
            credits=data['credits'],
            semester=data['semester'],
            department=data['department'],
        )

        course.save()


class Course(models.Model):

    objects: CourseManager = CourseManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    semester = models.CharField(max_length=20)
    name = models.CharField(max_length=200)
    credits = models.IntegerField()
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name="departments"
    )
