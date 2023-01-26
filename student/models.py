from datetime import datetime
from typing import Dict
from django.core.exceptions import BadRequest
from django.db import models
from django.utils import timezone

from services.pagination import Pagination


class StudentManager(models.Manager):

    def retrieve(self, page: int, direction: str):
        objs = Student.objects.all().order_by('-id')

        paginator = Pagination(objs, page, direction)
        data = paginator.paginate()
        return data

    def __validate_student(self, data: Dict):
        student = Student.objects.filter(email=data['email']).first()
        if student is not None:
            raise BadRequest('A student with that email already exists.')

        if data['section'] > 4:
            raise BadRequest('A section can only be 1-4.')

        if len(data['address']['zip']) > 5 or not data['address']['zip'].isnumeric():
            raise BadRequest('A zip code cannot exceed five numbers')

        genders = ['male', 'female', 'non-binary']
        if data['gender'].lower() not in genders:
            raise BadRequest(
                'Please choose a gender of male, female, or non-binary.')

    def create(self, data: Dict):
        self.__validate_student(data)

        student = self.model(
            name=data['name'],
            email=data['email'],
            gender=data['gender'].title(),
            section=data['section'],
            dob=data['dob'],
            street=data['address']['street'].title(),
            state=data['address']['state'],
            city=data['address']['city'].title(),
            zip=data['address']['zip'],
            department=data['department'],
            joining_date=datetime.now()
        )

        student.save()


class Student(models.Model):

    objects: StudentManager = StudentManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=200)
    gender = models.CharField(max_length=20)
    dob = models.DateField(auto_now=False, auto_now_add=False)
    email = models.CharField(max_length=200, unique=True)
    street = models.CharField(max_length=200, blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    zip = models.CharField(max_length=200, blank=True, null=True)
    section = models.IntegerField()
    joining_date = models.DateField(auto_now=False, auto_now_add=False)
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name="department_students"
    )
