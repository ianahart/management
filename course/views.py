from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from course.serializers import CreateCourseSerializer
from course.models import Course
import logging

from department.serializers import CreateDepartmentSerializer, DepartmentSerializer, UpdateDepartmentSerializer


logger = logging.getLogger('django')


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            serializer = CreateCourseSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            Course.objects.create(serializer.validated_data)

            return Response({
                'message': 'success'
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        try:
            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)
