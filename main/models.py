from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_delete
from django.dispatch import receiver

User = get_user_model()
sex_choice = (("Male", "Male"), ("Female", "Female"))


class Teacher(models.Model):
    nom = models.CharField(max_length=250, blank=True, null=True)
    prenom = models.CharField(max_length=250, blank=True, null=True)
    slug = models.SlugField(max_length=250, null=True, blank=True)
    gender = models.CharField(max_length=50, choices=sex_choice)
    dob = models.DateField(default="1980-01-01", blank=True, null=True)
    pob = models.CharField(max_length=250, blank=True, null=True)
    t_user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    date_added = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nom + " " + self.prenom
