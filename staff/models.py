from typing import Dict
from django.db import models
from django.utils import timezone


class StaffManager(models.Manager):

    def create(self, data: Dict):

        new_staff = self.model(
            name=data['name'],
            email=data['email'],
            contact=data['contact'],
            courses=data['courses'],
            department=data['department']
        )

        new_staff.save()


class Staff(models.Model):

    objects: StaffManager = StaffManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200, unique=True)
    contact = models.CharField(max_length=12)
    courses = models.JSONField(blank=True, null=True)
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name="staff_departments"
    )
