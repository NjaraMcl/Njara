from django.urls import path
from . import views

app_name = "overseer"

urlpatterns = [
    path("ohome/", views.oHomeview.as_view(), name="ohome"),
    # Teacher views
    path("Teacher/list/", views.o_listTeacher.as_view(), name="o_listTeacher"),
    # CRUD Teacher views
    path("Teacher/add/", views.AddTeacher.as_view(), name="AddTeacher"),
]
