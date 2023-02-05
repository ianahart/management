from django.urls import path
from student_class import views
urlpatterns = [
    path('classes/', views.ListCreateAPIView.as_view()),
    path('classes/search/', views.SearchAPIView.as_view()),
    path('classes/charts/', views.ChartsAPIView.as_view()),
    path('classes/<int:pk>/', views.DetailsAPIView.as_view())
]
