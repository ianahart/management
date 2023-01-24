from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from course.serializers import CourseSerializer, CreateCourseSerializer, SearchCourseSerializer, UpdateCourseSerializer
from course.models import Course
import logging


logger = logging.getLogger('django')


class DetailsAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request, pk: int):
        try:
            course = Course.objects.get(pk=pk)

            serializer = CourseSerializer(course)
            return Response({
                'message': 'success',
                'course': serializer.data,
            }, status=status.HTTP_200_OK)

        except Exception:
            return Response({
                'error': 'Course not found.',
            }, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk: int):
        try:
            course = Course.objects.get(pk=pk)

            course.delete()
            if Course is None:
                raise NotFound
            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except Exception:
            return Response({
                'error': 'Course to delete does not exist.',
            }, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk: int):

        try:
            serializer = UpdateCourseSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            Course.objects.update(pk, serializer.validated_data)

            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)


class SearchAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            page, direction = request.query_params.values()
            search_serializer = SearchCourseSerializer(data=request.data)
            search_serializer.is_valid(raise_exception=True)

            result = Course.objects.search(
                search_serializer.validated_data['value'],
                page,
                direction
            )

            serializer = CourseSerializer(result['items'], many=True)
            return Response({
                'message': 'success',
                'items': serializer.data,
                'page': result['page'],
                'total_pages': result['num_of_pages']
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)


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
            page, direction = request.query_params.values()
            result = Course.objects.retrieve(page, direction)

            serializer = CourseSerializer(result['items'], many=True)
            return Response({
                'message': 'success',
                'items': serializer.data,
                'page': result['page'],
                'total_pages': result['num_of_pages']
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)
