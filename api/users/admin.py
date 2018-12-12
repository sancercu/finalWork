from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('id', 'first_name', 'last_name', 'username', 'email', 'is_superuser', 'is_active', 'date_joined',)
    search_fields = ['first_name', 'last_name', 'username', 'email']