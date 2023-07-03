from django.urls import path
from . import views


urlpatterns = [
    # List & CRUD Teacher views
    path("Teacher-list/", views.TeacherList, name="Teacher-list"),
    path("Teacher-detail/<str:pk>/", views.TeacherDetail, name="Teacher-detail"),
    path("Teacher-create/", views.TeacherCreate, name="Teacher-create"),
    path("Teacher-update/<str:pk>/", views.TeacherUpdate, name="Teacher-update"),
    path("Teacher-delete/<str:pk>/", views.TeacherDelete, name="Teacher-delete"),
]
