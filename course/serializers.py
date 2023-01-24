from rest_framework import serializers

from course.models import Course
from department.serializers import DepartmentSerializer


class SearchCourseSerializer(serializers.Serializer):
    value = serializers.CharField()

    class Meta:
        fields = ('value', )

    def validate_value(self, value: str):
        return value.strip()


class UpdateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'credits', 'semester', 'department', )

    def validate_name(self, value: str):
        return value.strip().title()

    def validate_semester(self, value: str):
        return value.strip().title()


class CreateCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('name', 'credits', 'semester', 'department', )

    def validate_name(self, value: str):
        return value.strip().title()

    def validate_semester(self, value: str):
        return value.strip().title()


class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Course
        fields = ('id', 'semester', 'credits',
                  'name', 'department',
                  )
