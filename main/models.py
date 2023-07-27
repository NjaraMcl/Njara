from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_delete
from django.dispatch import receiver

User = get_user_model()
sex_choice = (("Male", "Male"), ("Female", "Female"))


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return self.subject


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


class Classe(models.Model):
    class_name = models.CharField(max_length=255)
    school_year = models.CharField(max_length=20)
    slug = models.SlugField(unique=True)
    teacher_responsible = models.ForeignKey(
        Teacher, on_delete=models.SET_NULL, null=True, blank=True
    )
    date_added = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "classes"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.class_name + "_" + self.school_year)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.class_name
