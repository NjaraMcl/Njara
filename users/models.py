from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from PIL import Image


class siteUser(AbstractUser):
    is_visitor = models.BooleanField(default=True)
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_overseer = models.BooleanField(default=False)


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    image = models.ImageField(default="default.png", upload_to="profile_pics")

    def __str__(self):
        return f"Profile de {self.user.username}"

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 200 or img.width > 200:
            output_size = (200, 200)
            img.thumbnail(output_size)
            img.save(self.image.path)
