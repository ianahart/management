from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from student.models import Student
import json
import logging


logger = logging.getLogger('django')


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            return Response({
                'message': 'success'
            }, status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):

        try:
            return Response({
                'message': 'success',

            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_404_NOT_FOUND)
