from django.urls import path
from staff import views
urlpatterns = [
    path('staffs/', views.ListCreateAPIView.as_view()),
    path('staffs/<int:pk>/', views.DetailsAPIView.as_view()),
]
