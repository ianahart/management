from datetime import timezone
from re import search
from django.utils.timezone import datetime, now, utc
from rest_framework.exceptions import NotFound, ParseError, ValidationError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from attendance.models import Attendance
from student_class.models import StudentClass

from student_class.serializers import ClassSerializer, CreateClassSerializer, SearchClassSerializer


class DetailsAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def delete(self, request, pk: int):
        try:
            student_class = StudentClass.objects.get(pk=pk)

            student_class.delete()
            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk: int):

        try:

            student_class = StudentClass.objects.get_student_class(pk)
            serializer = ClassSerializer(student_class)

            return Response({
                'message': 'success',
                'student_class': serializer.data,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)


class SearchAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            page, direction = request.query_params.values()
            search_serializer = SearchClassSerializer(data=request.data)
            search_serializer.is_valid(raise_exception=True)

            result = StudentClass.objects.search(
                page, direction, search_serializer.validated_data['value'])

            serializer = ClassSerializer(result['items'], many=True)

            return Response({
                'message': 'success',
                'total_pages': result['num_of_pages'],
                'page': result['page'],
                'items': serializer.data,

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

            result = StudentClass.objects.retrieve(page, direction)
            serializer = ClassSerializer(result['items'], many=True)

            return Response({
                'message': 'success',
                'total_pages': result['num_of_pages'],
                'page': result['page'],
                'items': serializer.data,

            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            serializer = CreateClassSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            StudentClass.objects.create(serializer.validated_data)
            Attendance.objects.create(
                serializer.validated_data['student'],
                serializer.validated_data['course'],
                False,
                datetime.now(tz=timezone.utc)
            )

            print(serializer.validated_data)
            return Response({
                'message': 'success',
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
