from django.db import models
from django.utils import timezone


class StudentManager(models.Manager):

    def post(self):
        print('Creating student')


class Student(models.Model):

    objects: StudentManager = StudentManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=200)
    gender = models.CharField(max_length=20)
    dob = models.DateField(auto_now=False, auto_now_add=False)
    email = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=200)
    section = models.IntegerField()
    joining_date = models.DateField(auto_now=False, auto_now_add=False)
    department = models.ForeignKey(
        'department.Department',
        on_delete=models.CASCADE,
        related_name="department_students"
    )
