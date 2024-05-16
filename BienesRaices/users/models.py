from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField('email', unique=True)
    phone = models.IntegerField("phone", null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
