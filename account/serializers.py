from rest_framework import serializers

from account.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'avatar_url', )
