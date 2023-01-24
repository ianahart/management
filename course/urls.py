from django.urls import path
from course import views
urlpatterns = [
    path('courses/', views.ListCreateAPIView.as_view()),
    path('courses/search/', views.SearchAPIView.as_view()),
    path('courses/<int:pk>/', views.DetailsAPIView.as_view()),
]
