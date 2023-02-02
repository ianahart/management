from django.urls import path
from student import views
urlpatterns = [
    path('students/', views.ListCreateAPIView.as_view()),
    path('students/search/', views.ListCreateSearchAPIView.as_view()),
    path('students/search/<int:pk>/', views.SearchDetailsAPIView.as_view()),
    path('students/<int:pk>/', views.DetailsAPIView.as_view()),
]
