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

from authentication.serializers import CreateAccountSerializer


logger = logging.getLogger('django')


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
            }, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({
                'errors': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)
