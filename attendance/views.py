from django.shortcuts import render
from rest_framework.exceptions import status
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated

from attendance.models import Attendance
from attendance.serializers import AllAttendanceSerializer, AttendanceSerializer, CreateAttendanceSerializer, DateAttendanceSerializer, InitialAttendanceSerializer


class AttendanceMarkAllAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):

        serializer = AllAttendanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        Attendance.objects.mark_all(serializer.validated_data)
        try:
            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)


class AttendanceDateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):

        try:
            date_serializer = DateAttendanceSerializer(data=request.data)
            date_serializer.is_valid(raise_exception=True)

            attendees = Attendance.objects.retrieve_attendees_date(
                date_serializer.validated_data)

            serializer = AttendanceSerializer(attendees, many=True)
            return Response({
                'message': 'success',
                'attendees': serializer.data,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)


class AttendanceInitialAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):

        try:
            initial_serializer = InitialAttendanceSerializer(data=request.data)
            initial_serializer.is_valid(raise_exception=True)

            print(request.data, '!!!!!!!!!!!!!!!')
            attendees = Attendance.objects.retrieve_attendees(
                initial_serializer.validated_data)
            serializer = AttendanceSerializer(attendees, many=True)

            return Response({
                'message': 'success',
                'attendees': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:

            course = request.query_params['course']
            attendees = Attendance.objects.retrieve_attendees(course)
            serializer = AttendanceSerializer(attendees, many=True)
            return Response({
                'message': 'success',
                'attendees': serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:

            create_serializer = CreateAttendanceSerializer(data=request.data)
            create_serializer.is_valid(raise_exception=True)

            Attendance.objects.handle_attendance(
                create_serializer.validated_data)

            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)
