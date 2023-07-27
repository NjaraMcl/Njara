# Generated by Django 4.2.2 on 2023-07-26 14:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0007_classe"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContactMessage",
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
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("subject", models.CharField(max_length=200)),
                ("message", models.TextField()),
            ],
        ),
    ]