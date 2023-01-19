from rest_framework import serializers

from course.models import Course


class CreateCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('name', 'credits', 'semester', 'department', )

    def validate_name(self, value: str):
        return value.strip().title()

    def validate_semester(self, value: str):
        return value.strip().title()
