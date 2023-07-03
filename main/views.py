from django.shortcuts import redirect
from django.views import generic


class gHomeview(generic.TemplateView):
    template_name = "main/ghome.html"
    extra_context = {"page_title": "Home"}


class Homeview(generic.TemplateView):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("main:ghome")
        if request.user.is_overseer:
            return redirect("overseer:ohome")
