from django.contrib import admin
from .models import FloorPlan, Person, PersonAnnotation

# Register your models here.
admin.site.register(FloorPlan)
admin.site.register(Person)
admin.site.register(PersonAnnotation)
