from typing import Dict
from django.core.exceptions import BadRequest
from django.db import models
from django.utils import timezone
from rest_framework.exceptions import NotFound
from django.db.models import Count

from services.pagination import Pagination


class StudentClassManager(models.Manager):

    def chart_data(self):
        student_classes = StudentClass.objects.all()
        data = {}

        for student_class in student_classes:
            if student_class.course.name not in data:
                data[student_class.course.name] = 1
            else:
                data[student_class.course.name] = data[student_class.course.name] + 1

        sorted_data = sorted(
            data.items(), key=lambda x: x[1], reverse=True)[0:5]

        sorted_data = [{key: value} for key, value in sorted_data]
        return sorted_data

    def get_student_class(self, pk: int):
        student_class = StudentClass.objects.all().filter(pk=pk).first()

        if student_class is None:
            raise NotFound('This class does not exist.')

        setattr(student_class, 'student_name', student_class.student.name)
        setattr(student_class, 'course_name', student_class.course.name)
        return student_class

    def search(self, page: int, direction: str, term: str):
        objs = StudentClass.objects.all().order_by(
            '-id').filter(course__name__icontains=term)
        if objs.count() == 0:
            raise BadRequest('No matches found for "{}"'.format(term))

        paginator = Pagination(objs, page, direction)
        data = paginator.paginate()

        for item in data['items']:
            setattr(item, 'student_name', item.student.name)
            setattr(item, 'course_name', item.course.name)

        return data

    def retrieve(self, page: int, direction: str):
        objs = StudentClass.objects.all().order_by('-id')

        paginator = Pagination(objs, page, direction)
        data = paginator.paginate()

        for item in data['items']:
            setattr(item, 'student_name', item.student.name)
            setattr(item, 'course_name', item.course.name)

        return data

    def create(self, data: Dict):
        choices = ['fall', 'spring']
        if data['semester'].lower() not in choices:
            raise BadRequest(
                'Please choose either spring or fall for semester.')

        existing_classes = StudentClass.objects.all().filter(
            student_id=data['student'].id)

        for existing_class in existing_classes:

            if existing_class.course_id == data['course'].id:
                raise BadRequest(
                    'You already have selected this class for this student.')

        student_class = self.model(
            course=data['course'],
            student=data['student'],
            semester=data['semester'],
            year=timezone.now().year
        )

        student_class.save()


class StudentClass(models.Model):

    objects: StudentClassManager = StudentClassManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    year = models.CharField(max_length=10)
    semester = models.CharField(max_length=10)
    course = models.ForeignKey(
        'course.Course',
        on_delete=models.CASCADE,
        related_name="student_class_courses"
    )
    student = models.ForeignKey(
        'student.Student',
        on_delete=models.CASCADE,
        related_name="course_students"
    )
