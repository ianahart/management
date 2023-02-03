from django.core.exceptions import BadRequest
from django.shortcuts import render
from rest_framework.exceptions import status
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from account.models import CustomUser
from staff.models import Staff

from staff.serializers import CreateStaffSerializer
from student.models import Student


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            return Response({
                'message': 'success',
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

            print(student_email_exists, admin_email_exists)
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
