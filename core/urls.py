from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/v1/', include(('authentication.urls', 'authentication'))),
    path('api/v1/', include(('account.urls', 'account'))),
    path('api/v1/', include(('department.urls', 'department'))),
    path('api/v1/', include(('course.urls', 'course'))),
    path('api/v1/', include(('student.urls', 'student'))),
    path('api/v1/', include(('student_class.urls', 'student_class'))),
]
