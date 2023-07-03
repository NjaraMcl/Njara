# Generated by Django 4.2.2 on 2023-07-03 12:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("main", "0003_alter_teacher_t_user"),
    ]

    operations = [
        migrations.CreateModel(
            name="Teachers",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nom", models.CharField(blank=True, max_length=250, null=True)),
                ("prenom", models.CharField(blank=True, max_length=250, null=True)),
                ("slug", models.SlugField(blank=True, max_length=250, null=True)),
                (
                    "gender",
                    models.CharField(
                        choices=[("Male", "Male"), ("Female", "Female")], max_length=50
                    ),
                ),
                ("dob", models.DateField(blank=True, default="1980-01-01", null=True)),
                ("pob", models.CharField(blank=True, max_length=250, null=True)),
                ("date_added", models.DateTimeField(default=django.utils.timezone.now)),
                ("date_updated", models.DateTimeField(auto_now=True)),
                (
                    "t_user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="Teacher",
        ),
    ]
