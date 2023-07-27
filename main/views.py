from django.views import generic
from django.shortcuts import render, redirect
from django.views import View
from .forms import ContactForm


class ContactView(View):
    def get(self, request):
        form = ContactForm()
        return render(request, "contact.html", {"form": form})

    def post(self, request):
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return render(
                request, "contact.html", {"form": ContactForm(), "message_sent": True}
            )
        return render(request, "contact.html", {"form": form})


class gHomeview(generic.TemplateView):
    template_name = "main/ghome.html"
    extra_context = {"page_title": "Home"}


class Homeview(generic.TemplateView):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("main:ghome")
        if request.user.is_overseer:
            return redirect("overseer:ohome")
