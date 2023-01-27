from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from student.models import Student
import json
import logging

from student.serializers import CreateStudentSerializer, StudentSerializer, UpdateStudentSerializer


logger = logging.getLogger('django')


class DetailsAPIView(APIView):

    permission_classes = [IsAuthenticated, ]



    def delete(self, request, pk: int):
        try:

            student = Student.objects.get(pk=pk)
            student.delete()

            return Response({
                                'message': 'success'
                            }, status=status.HTTP_200_OK)


        except Exception as e:
            return Response({
                                'error': str(e),
                            }, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk: int):
        try:
            serializer = UpdateStudentSerializer(data=request.data['form'])
            serializer.is_valid(raise_exception=True)
            Student.objects.update(pk, serializer.validated_data)

            return Response({
                'message': 'success',
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk: int):
        try:
            student = Student.objects.all().filter(pk=pk).first()

            if student is None:
                raise NotFound("Student doesn't exist.")

            serializer = StudentSerializer(student)
            return Response({
                'message': 'success',
                'student': serializer.data,
            })

        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_404_NOT_FOUND)


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            serializer = CreateStudentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            Student.objects.create(serializer.validated_data)

            return Response({
                'message': 'success'
            }, status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):

        try:
            page, direction = request.query_params.values()
            result = Student.objects.retrieve(page, direction)
            serializer = StudentSerializer(result['items'], many=True)
            return Response({
                'message': 'success',
                'page': result['page'],
                'total_pages': result['num_of_pages'],
                'items': serializer.data,

            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({
                'error': str(e),
            }, status=status.HTTP_404_NOT_FOUND)
