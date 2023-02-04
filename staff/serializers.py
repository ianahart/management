from rest_framework import serializers
from django.core.validators import EmailValidator
from staff.models import Staff
from department.serializers import DepartmentSerializer

class StaffSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Staff
        fields = ('name', 'email', 'contact',
                  'courses', 'department', 'id',
                  )


class UpdateStaffSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = ('courses', 'email', 'name',
                  'contact', 'department', )
        extra_kwargs = {
            'email': {'validators': [EmailValidator, ]},
        }

    def validate_name(self, value: str):
        return value.strip().title()


class CreateStaffSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = ('courses', 'email', 'name',
                  'contact', 'department')

    def validate_name(self, value: str):
        return value.strip().title()
