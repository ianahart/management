from rest_framework import serializers
from department.models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name', 'id', )


class UpdateDepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ('name', )

    def validate_name(self, value: str):
        return value.strip().title()


class CreateDepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ('name', )

    def validate_name(self, value: str):
        return value.strip().title()
