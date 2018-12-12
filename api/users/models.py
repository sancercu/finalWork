from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse

# Definimos el modelo User de nuestra aplicacion que extiend el AbstractUser definido por Django
class User(AbstractUser):
    pass