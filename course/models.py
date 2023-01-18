from django.db import models
from django.utils import timezone


class CourseManager(models.Manager):

    def create(self):
        print('Creating course')


class Course(models.Model):

    objects: CourseManager = CourseManager()

    SEMESTER_CHOICES = (
        ('fall', 'Fall'),
        ('spring', 'Spring')
    )

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    semester = models.CharField(max_length=20, choices=SEMESTER_CHOICES)
    name = models.CharField(max_length=200)
    credits = models.IntegerField()
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name="departments"
    )
