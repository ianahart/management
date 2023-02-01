from typing import Dict, List, Union
from django.db import models
from django.utils import timezone
from datetime import datetime, timedelta
import pytz


from student_class.models import StudentClass


class AttendanceManager(models.Manager):

    def mark_all(self, data: Dict):
        student_classes = StudentClass.objects.all().filter(
            course_id=data['course'])

        for student_class in student_classes:
            attendee = Attendance.objects.all().filter(
                student_id=student_class.student.id).filter(
                course_id=student_class.course.id).filter(date=data['date']).first()
            status = True if data['type'] == 'present' else False
            if attendee is None:
                new_attendee = self.model(
                    status=status,
                    date=data['date'],
                    course=data['course'],
                    student=student_class.student

                )
                new_attendee.save()
            else:
                attendee.status = status
                attendee.save()

    def retrieve_attendees_date(self, data: Dict):
        student_classes = StudentClass.objects.all().filter(
            course_id=data['course'])
        attendees: List[Dict[str, Union[str, int]]] = []

        for student_class in student_classes:
            attendee = Attendance.objects.all().filter(
                student_id=student_class.student.id).filter(
                course_id=student_class.course.id).filter(date=data['date']).first()
            attendees.append({
                'student': student_class.student,
                'status': False if attendee is None or attendee.status == False else True

            })
        return attendees

    def handle_attendance(self, data: Dict):
        student, course, status, date = data.values()
        exists = Attendance.objects.filter(student__id=student.id).filter(
            course__id=course.id).filter(date=date).first()

        if exists is None:
            attendance = self.model(
                student=student,
                course=course,
                status=status,
                date=date
            )
            attendance.save()

        else:
            exists.status = status
            exists.save()

    def retrieve_attendees(self, data):
        student_classes = StudentClass.objects.all().filter(
            course_id=data['course'].id)
        attendees: List[Dict[str, Union[str, int]]] = []

        date = datetime.now(tz=pytz.timezone(
            'US/Eastern')).strftime('%Y-%m-%d')
        print('FOOOOO', date)
        for student_class in student_classes:
            attendee = Attendance.objects.all().filter(
                student_id=student_class.student.id).filter(
                course_id=student_class.course.id).filter(date=date).first()
            attendees.append({
                'student': student_class.student,
                'status': False if attendee is None or attendee.status == False else True

            })

        return attendees


class Attendance(models.Model):

    objects: AttendanceManager = AttendanceManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    date = models.DateField()
    status = models.BooleanField(default=False)
    student = models.ForeignKey(
        'student.Student',
        on_delete=models.CASCADE,
        related_name="attendance_students"
    )
    course = models.ForeignKey(
        'course.Course',
        on_delete=models.CASCADE,
        related_name="attendance_courses"
    )
