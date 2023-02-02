from django.db import models
from django.utils import timezone
from course.models import Course


class StaffManager(models.Manager):

    def create(self):
        print('Creating a staff member.')


class Staff(models.Model):

    objects: StaffManager = StaffManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200, unique=True)
    contact = models.CharField(max_length=12)
    courses = models.ManyToManyField(Course, related_name="staffs")
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name="staff_departments"
    )
