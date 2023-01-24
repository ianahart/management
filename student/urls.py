from django.urls import path
from student import views
urlpatterns = [
    path('students/', views.ListCreateAPIView.as_view()),
]
