from django.urls import path
from . import views

urlpatterns = [
    path('', views.FrontendAppView.as_view(), name="home")
]
