from django.core.exceptions import BadRequest
from django.db import models
from django.utils import timezone
from typing import Dict, Union
from services.pagination import Pagination

class CourseManager(models.Manager):

    def update(self, pk: int, validated_data: Dict):
        self.__validate(validated_data)

        course = Course.objects.get(pk=pk)
        course.name = validated_data['name']
        course.credits = validated_data['credits']
        course.semester = validated_data['semester']
        course.department = validated_data['department']

        course.save()

    def search(self, term: str, page: int, direction: str):
        objs = Course.objects.all().order_by('-id').filter(name__icontains=term)

        if objs.count() == 0:
            raise BadRequest('No matches found for "{}"'.format(term))

        paginator = Pagination(objs, page, direction)
        data = paginator.paginate()
        return data

    def retrieve(self, page: int, direction: str):
        objs = Course.objects.all().order_by('-id')

        paginator = Pagination(objs, page, direction)
        data = paginator.paginate()
        return data

    def __validate(self, data: Dict):
        if data['credits'] <= 0 or data['credits'] > 4:
            raise BadRequest('Credits must be between 1 and 4.')

        choices = ['spring', 'fall']
        if data['semester'].lower() not in choices:
            raise BadRequest('Please choose either fall or spring.')

    def create(self, data: Dict):
        self.__validate(data)

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
