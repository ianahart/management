from datetime import datetime
from dateutil import parser
from typing import Dict
from django.core.exceptions import BadRequest
from django.db import models
from django.utils import timezone
from rest_framework.exceptions import NotFound

from services.pagination import Pagination
from student_class.models import StudentClass


class StudentManager(models.Manager):

    def retrieve_student_email(self, email: str):
        return Student.objects.filter(email=email).first()

    def retrieve_searched_student(self, pk: int):
        student = Student.objects.get(pk=pk)
        classes = []
        for student_class in student.course_students.all():
            student_class.course_name = student_class.course.name
            student_class.student_name = student_class.student.name
            classes.append(student_class)

        return {
            'student': student,
            'classes': classes,
        }

    def search(self, data: Dict):
        objs = Student.objects.filter(
            name__icontains=data['term']).order_by('-id')

        if len(objs) == 0:
            raise NotFound('no matches found for ' + data['term'])

        paginator = Pagination(objs, data['page'], data['direction'])
        data = paginator.paginate()

        return data

    def update(self, pk: int, data: Dict):
        self.__validate_student(data, 'update')
        student = Student.objects.all().filter(pk=pk).first()

        if student is not None:
            student.name = data['name'].title()
            student.email = data['email']
            student.gender = data['gender'].title()
            student.section = data['section']
            student.dob = data['dob']
            student.street = data['address']['street'].title()
            student.state = data['address']['state']
            student.city = data['address']['city'].title()
            student.zip = data['address']['zip']
            student.department = data['department']
            student.save()

    def retrieve(self, page: int, direction: str):
        objs = Student.objects.all().order_by('-id')

        paginator = Pagination(objs, page, direction)
        data = paginator.paginate()
        return data

    def __validate_student(self, data: Dict, action: str):
        student = Student.objects.filter(email=data['email']).first()
        if student is not None and action == 'create':
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
        self.__validate_student(data, 'create')

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
