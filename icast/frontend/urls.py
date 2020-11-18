from django.urls import path
from . import views

urlpatterns = [
    path('', views.index ),
    path('faq', views.index ),
    path('privacy', views.index ),
    path('terms', views.index ),
    # path('signup_subscribe', views.index ),
    # path('signup_service', views.index ),
    # path('signup_account', views.index ),
    # path('signup_confirm', views.index ),
    # path('signup_process', views.index ),
    # path('signup_complete', views.index ),
    path('subscribe', views.index ),


    
]