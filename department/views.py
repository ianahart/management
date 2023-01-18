from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from department.models import Department
import json
import logging

from department.serializers import CreateDepartmentSerializer, DepartmentSerializer, UpdateDepartmentSerializer


logger = logging.getLogger('django')


class DetailsAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, pk: int):
        try:
            department = Department.objects.get(pk=pk)

            serializer = DepartmentSerializer(department)

            return Response({
                'message': 'success',
                'department': serializer.data,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk: int):
        try:
            Department.objects.delete(pk)
            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk: int):
        try:
            serializer = UpdateDepartmentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            Department.objects.update(pk, serializer.validated_data)

            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            page, direction = request.query_params.values()

            result = Department.objects.retrieve(page, direction)

            serializer = DepartmentSerializer(result['departments'], many=True)

            return Response({
                'message': 'success',
                'departments': serializer.data,
                'page': result['page'],
                'total_pages': result['num_of_pages']
            }, status=status.HTTP_200_OK)
        except NotFound as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = CreateDepartmentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            Department.objects.create(serializer.validated_data['name'])

            return Response({
                'message': 'success'
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
