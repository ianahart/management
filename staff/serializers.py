from rest_framework import serializers

from staff.models import Staff


class CreateStaffSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = ('courses', 'email', 'name',
                  'contact', 'department')

    def validate_name(self, value: str):
        return value.strip().title()
