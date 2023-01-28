from rest_framework import serializers

from student_class.models import StudentClass


class SearchClassSerializer(serializers.Serializer):
    value = serializers.CharField()

    class Meta:
        fields = ('value', )

    def validate_value(self, value: str):
        return value.strip()


class ClassSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField()
    course_name = serializers.CharField()

    class Meta:
        model = StudentClass
        fields = ('id', 'student_name', 'year',
                  'course_name', 'semester',
                  )


class CreateClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentClass
        fields = ('semester', 'student', 'course', )

    def validate_semester(self, value: str):
        return value.strip().title()
