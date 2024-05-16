from django.urls import path  # path nos permite crear las urls que necesitemos
from . import views  # me traigo todas las vistas

app_name = "namespaceblog"

urlpatterns = [
    path("", views.viewBlog, name="blog_list"),
    path("<int:id>/", views.viewBlogDetail, name="blog_details"),  # <int:id> una url dinámica con el ID de cada BLOG
    path("blog-register/", views.viewCreateBlog, name="blog-register"),
]