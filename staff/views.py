from django.core.exceptions import BadRequest
from django.shortcuts import render
from rest_framework.exceptions import status
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from account.models import CustomUser
from staff.models import Staff

from staff.serializers import CreateStaffSerializer, StaffSerializer, UpdateStaffSerializer
from student.models import Student


class DetailsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk: int):

        try:
            serializer = UpdateStaffSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            Staff.objects.update(pk, serializer.validated_data)

            student_email_exists = Student.objects.retrieve_student_email(
                serializer.validated_data['email'])

            admin_email_exists = CustomUser.objects.admin_by_email(
                serializer.validated_data['email'])

            if student_email_exists is not None:
                raise BadRequest('This email is taken.')

            if admin_email_exists is not None:
                raise BadRequest('This email is taken.')

            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk: int):

        try:
            staff_member = Staff.objects.retrieve(pk)

            serializer = StaffSerializer(staff_member)
            return Response({
                            'message': 'success',
                            'staff_member': serializer.data,
                            }, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            page, direction = request.query_params.values()
            result = Staff.objects.retrieve_all(page, direction)
            serializer = StaffSerializer(result['items'], many=True)

            return Response({
                'message': 'success',
                'total_pages': result['num_of_pages'],
                'page': result['page'],
                'staffs': serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = CreateStaffSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            student_email_exists = Student.objects.retrieve_student_email(
                serializer.validated_data['email'])

            admin_email_exists = CustomUser.objects.admin_by_email(
                serializer.validated_data['email'])

            if student_email_exists is not None:
                raise BadRequest('This email is taken.')

            if admin_email_exists is not None:
                raise BadRequest('This email is taken.')

            Staff.objects.create(serializer.validated_data)
            return Response({
                'message': 'success',
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)
