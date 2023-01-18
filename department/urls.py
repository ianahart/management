from django.urls import path
from department import views
urlpatterns = [
    path('departments/', views.ListCreateAPIView.as_view()),
    path('departments/<int:pk>/', views.DetailsAPIView.as_view()),
]
