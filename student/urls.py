from django.urls import path
from student import views
urlpatterns = [
    path('students/', views.ListCreateAPIView.as_view()),
    path('students/<int:pk>/', views.DetailsAPIView.as_view()),
]
