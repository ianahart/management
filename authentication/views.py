from rest_framework.exceptions import ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from account.models import CustomUser
import logging
from account.serializers import CustomUserSerializer

from authentication.serializers import CreateAccountSerializer, LoginSerializer, LogoutSerializer


logger = logging.getLogger('django')


class LogoutAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            serializer = LogoutSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            CustomUser.objects.logout(
                request.user,
                serializer.validated_data['refresh_token']
            )
            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)
        except:
            return Response({
                'message': 'error',
            }, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(APIView):
    """
       A View for creating/registering a user.
    """
    permission_classes = [AllowAny, ]

    def post(self, request):
        try:

            serializer = CreateAccountSerializer(data=request.data)

            serializer.is_valid(raise_exception=True)
            include_fields = ['first_name', 'last_name']
            extra_fields = {
                key: val for key, val in serializer.validated_data.items() if key in include_fields}

            CustomUser.objects.create(
                serializer.validated_data['email'],
                serializer.validated_data['password'],
                **extra_fields
            )
            return Response({
                'message': 'success'
            }, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({
                'errors': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)


class TokenObtainPairView(APIView):

    permission_classes = [AllowAny, ]

    def post(self, request):
        try:

            login_serializer = LoginSerializer(data=request.data)
            login_serializer.is_valid(raise_exception=True)
            email, password = login_serializer.validated_data.values()

            data = CustomUser.objects.login(email, password)
            user_serializer = CustomUserSerializer(data['user'])
            if data:
                return Response({
                    'message': 'success',
                    'tokens': data['tokens'],
                    'user': user_serializer.data,
                }, status=status.HTTP_200_OK)

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            if str(e) == 'User does not exist.':
                status_code = status.HTTP_404_NOT_FOUND
            return Response({
                'message': str(e)
            }, status=status_code)
