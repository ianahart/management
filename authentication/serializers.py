from rest_framework import serializers
from account.models import CustomUser


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.CharField()

    class Meta:
        fields = ('email', )

class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    class Meta:
        fields = ('refresh_token', )


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = ('email', 'password', )


class CreateAccountSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(
        error_messages={'blank': 'Confirm password may not be  blank.'})

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name',
                  'email', 'password', 'confirm_password'
                  )
        extra_kwargs = {
            "password": {"error_messages": {
                "blank": "Password may not be blank."}
            },
        }

    def validate_first_name(self, value: str):
        if len(value) == 0 or len(value) > 75:
            raise serializers.ValidationError(
                'First name must be at least 1 character and a maximum of 75 characters.'
            )
        return value.lower().capitalize()

    def validate_last_name(self, value: str):
        if len(value) == 0 or len(value) > 75:
            raise serializers.ValidationError(
                'Last name must be at least 1 character and a maximum of 75 characters.'
            )
        return value.lower().capitalize()

    def validate_password(self, value):
        uppercase, digit, special_char = False, False, False
        for char in value:
            if char.isnumeric():
                digit = True
            if not char.isalnum():
                special_char = True
            if not char.isnumeric() and char.isalnum() and char.upper() == char:
                uppercase = True

        satisfied = all([uppercase, digit, special_char])

        if not satisfied:
            raise serializers.ValidationError(
                'Password must include 1 special, 1 digit, and 1 uppercase characters.')

        data = self.get_initial()
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('Passwords do not match.')
        return value
