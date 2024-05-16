from django.contrib import admin
from .models import User

# Register your models here.


# Decoradores para manejar mejor la UI del Admin en la web
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # List of fields to display in the admin change list
    list_display = [
        "username",
        "email",
        "phone",
        "first_name",
        "last_name",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
        "last_login",
    ]

    # List of fields to filter the admin change list
    list_filter = ["username", "email"]

    class Meta:
        model = User
