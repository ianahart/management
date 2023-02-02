from django.urls import path
from staff import views
urlpatterns = [
    path('staffs/', views.ListCreateAPIView.as_view()),
]
