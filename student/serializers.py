from rest_framework import serializers
from department.serializers import DepartmentSerializer

from student.models import Student
from student_class.serializers import ClassSerializer


class RetrieveSearchedStudentSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Student
        fields = ('id', 'name', 'gender', 'dob',
                  'email', 'street', 'state', 'city', 'zip',
                  'joining_date', 'department', 'section',
                  )


class SearchRetrieveStudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id', 'name', )


class SearchStudentSerializer(serializers.ModelSerializer):
    term = serializers.CharField()
    direction = serializers.CharField()
    page = serializers.IntegerField()

    class Meta:
        model = Student
        fields = ('term', 'direction', 'page', )


class StudentSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Student
        fields = ('name', 'email', 'gender', 'section',
                  'dob', 'state', 'city', 'zip', 'street',
                  'department', 'joining_date', 'id',
                  )


class UpdateStudentSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    address = serializers.JSONField()
    dob = serializers.DateField(
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', '%Y-%m-%d'])

    class Meta:
        model = Student
        fields = ('name', 'email', 'gender',
                  'section', 'dob', 'address',
                  'department', 'city',
                  )

    def validate_name(self, value: str):
        return value.strip().title()

    def validate_dob(self, value):
        return value.strftime('%Y-%m-%d')


class CreateStudentSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    address = serializers.JSONField()
    dob = serializers.DateField(input_formats=['%Y-%m-%dT%H:%M:%S.%fZ'])

    class Meta:
        model = Student
        fields = ('name', 'email', 'gender',
                  'section', 'dob', 'address',
                  'department', 'city',
                  )

    def validate_name(self, value: str):
        return value.strip().title()

    def validate_dob(self, value):
        return value.strftime('%Y-%m-%d')
