from rest_framework import viewsets,views
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from fpsapi.models import FloorPlan, Person, PersonAnnotation
from fpsapi.renderers import SVGRenderer
from fpsapi.serializers import PersonSerializer,FloorPlanSerializer, FloorPlanDetailSerializer
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

class FloorPlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FloorPlan.objects.all()
    serializer_class = FloorPlanSerializer
    detail_serializer_class = FloorPlanDetailSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return self.detail_serializer_class
        return super(FloorPlanViewSet, self).get_serializer_class()

    @detail_route(methods=["get"], url_path="baseMap",renderer_classes=[SVGRenderer])
    def base_map(self, request, pk=None, format="svg"):
        instance = get_object_or_404(FloorPlan,pk=pk)
        return Response(instance.serialised_plan_svg)

class PersonViewSet(viewsets.ModelViewSet):
    def list(self,request):
        return HttpResponse(status=403)
    
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
