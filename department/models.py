from typing import Dict
from django.core.exceptions import BadRequest
from django.db import models
from django.core.paginator import Paginator
from django.utils import timezone


class DepartmentManager(models.Manager):

    def retrieve_all(self):
        departments = Department.objects.all().order_by('name')
        return departments

    def create(self, name: str):
        department = Department.objects.all().filter(name__iexact=name).first()

        if department is not None:
            raise BadRequest('This department already exists.')

        new_department = self.model(name=name)

        new_department.save()

    def delete(self, pk: int):
        department = None
        try:
            department = Department.objects.get(pk=pk)

            if department is not None:
                department.delete()

        except Department.DoesNotExist:
            raise Exception('Department to delete was not found')

    def update(self, pk: int, form: Dict[str, str]):
        department = None
        try:
            department = Department.objects.get(pk=pk)

        except Department.DoesNotExist:
            raise Exception('Department to update was not found')

        if department is not None:
            department.name = form['name']
            department.save()

    def retrieve(self, page: str, direction: str):
        objs = Department.objects.all().order_by('name')
        next_page = 1
        paginator = Paginator(objs, 4)

        if direction == 'prev' and int(page) > 1:
            next_page = int(page) - 1
        if direction == 'next' and int(page) < paginator.num_pages:
            next_page = int(page) + 1

        cur_page = paginator.page(next_page)

        return {
            'page': next_page,
            'departments': cur_page.object_list,
            'num_of_pages': paginator.num_pages
        }


class Department(models.Model):

    objects: DepartmentManager = DepartmentManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=200)
