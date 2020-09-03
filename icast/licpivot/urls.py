from django.urls import path
from rest_framework.routers import DefaultRouter
from .core_actions import CoreViewSet

urlpatterns = []

router = DefaultRouter()
router.register("", CoreViewSet, basename='Core')

urlpatterns += router.urls
