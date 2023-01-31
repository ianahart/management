from django.urls import path
from attendance import views
urlpatterns = [
    path('attendances/', views.ListCreateAPIView.as_view()),
    path('attendances/date/', views.AttendanceDateAPIView.as_view()),
    path('attendances/all/', views.AttendanceMarkAllAPIView.as_view()),
]
