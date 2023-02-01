from rest_framework import serializers

from attendance.models import Attendance
from course.serializers import CourseSerializer
from student.serializers import StudentSerializer


class InitialAttendanceSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', '%Y-%m-%d'])

    class Meta:
        model = Attendance
        fields = ('course', 'date', )


class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = Attendance
        fields = ('status', 'student', )


class AllAttendanceSerializer(serializers.ModelSerializer):
    type = serializers.CharField()
    date = serializers.DateField(
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', '%Y-%m-%d'])

    class Meta:
        model = Attendance
        fields = ('course', 'date', 'type', )


class DateAttendanceSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', '%Y-%m-%d'])

    class Meta:
        model = Attendance
        fields = ('course', 'date', )


class CreateAttendanceSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', '%Y-%m-%d'])

    class Meta:
        model = Attendance
        fields = ('student', 'course', 'status', 'date', )
