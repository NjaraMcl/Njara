from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.utils.text import slugify
from users.models import Profile
from main.models import Teacher

User = get_user_model()


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


@receiver(post_save, sender=Teacher)
def create_user_for_teacher(sender, instance, created, **kwargs):
    if created:
        user = User.objects.create(
            username=instance.nom + "-" + instance.prenom,
            password="",
            is_visitor=False,
            is_teacher=True,
        )
        instance.t_user = user  # Link the user to the teacher
        instance.slug = slugify(instance.nom + "-" + instance.prenom)
        instance.save()
