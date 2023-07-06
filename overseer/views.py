from django.views import generic
from django.views.generic.edit import FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from main.models import Teacher
from django.shortcuts import render
from .forms import addTeacherForm


class RedirectToPreviousMixin:
    default_redirect = "/"

    def get(self, request, *args, **kwargs):
        request.session["previous_page"] = request.META.get(
            "HTTP_REFERER", self.default_redirect
        )
        return super().get(request, *args, **kwargs)

    def get_success_url(self):
        return self.request.session["previous_page"]


# OHome views here.
class oHomeview(LoginRequiredMixin, generic.TemplateView):
    template_name = "overseer/ohome.html"
    extra_context = {"page_title": "Home"}


# Create teacher
class AddTeacher(LoginRequiredMixin, FormView):
    form_class = addTeacherForm
    template_name = "overseer/CRUD/teacher/addTeacher.html"
    page_title = "Add Teacher"
    success_url = "/Teacher/list/"

    def form_valid(self, form):
        form.save()  # Save the form to create a new Teacher instance
        return super().form_valid(form)


# Retrive teacher
class o_listTeacher(LoginRequiredMixin, generic.TemplateView):
    template_name = "overseer/CRUD/teacher/o_listTeacher.html"
    form_class = addTeacherForm

    def get(self, request, *args, **kwargs):
        listTeacher = Teacher.objects.all()
        form = self.form_class()
        context = {
            "listTeacher": listTeacher,
            "Addform": form,
            "page_title": "List Teacher",
        }
        return render(request, self.template_name, context)
