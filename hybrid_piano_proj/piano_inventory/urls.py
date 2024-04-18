from django.urls import path
# from django.views.generic import TemplateView
from .import views
from .views import IndexWebpack
from rest_framework import routers


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    
    # Django REST Framework routes
    path("api/pianos/", views.piano_list),
    path("api/pianos/<int:pk>/", views.piano_detail),

    # Webpack views
    path("index_webpack", IndexWebpack.as_view()),
    # path("index_webpack", TemplateView.as_view(template_name="piano_inventory/index_webpack.html")),
]

# router = routers.DefaultRouter()
# router.register('api/pianos', views.piano_list)

# urlpatterns += router.urls