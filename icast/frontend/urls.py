from django.urls import path
from . import views

urlpatterns = [
    path('', views.index ),
    path('home', views.index ),
    path('features', views.index ),
    path('subscribe', views.index ),
]