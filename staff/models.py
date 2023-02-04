from typing import Dict
from django.db import models
from django.utils import timezone
from department.models import Department

from services.pagination import Pagination


class StaffManager(models.Manager):

    def create(self, data: Dict):

        new_staff = self.model(
            name=data['name'],
            email=data['email'],
            contact=data['contact'],
            courses=data['courses'],
            department_id=data['department']
        )

        new_staff.save()

    def update(self, pk: int, data: Dict):
        to_update = Staff.objects.get(pk=pk)
        exists = Staff.objects.filter(email=data['email'])
        to_update.name = data['name']
        to_update.email = data['email']
        to_update.contact = data['contact']
        to_update.courses = data['courses']
        to_update.department = Department.objects.get(pk=data['department'].id)
        to_update.save()

    def retrieve_all(self, page: str, direction: str):

        objs = Staff.objects.all().order_by('-id')

        paginator = Pagination(objs, page, direction)
        data = paginator.paginate()

        return data

    def retrieve(self, pk: int):
        return Staff.objects.get(pk=pk)


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
