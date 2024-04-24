from django.urls import path
from django.views.generic import TemplateView
from .import views
from .views import IndexWebpack
from rest_framework import routers


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("add_piano", views.add_piano, name="add_piano"),
    
    # Django REST Framework routes
    path("api/pianos/", views.piano_list),
    path("api/pianos/<int:pk>/", views.piano_detail),

    # Webpack/React views
    path("index_inventory", IndexWebpack.as_view(), name="index_inventory"),
    
    # path("index_inventory", TemplateView.as_view(template_name="piano_inventory/index_inventory.html")),
]

# Django Rest Framework routing
# router = routers.DefaultRouter()
# router.register('api/pianos', views.piano_list)

# urlpatterns += router.urls