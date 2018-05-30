from django.urls import include, path
from . import views
from rest_framework import routers
#from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'floors', views.FloorPlanViewSet)
router.register(r'person', views.PersonViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

