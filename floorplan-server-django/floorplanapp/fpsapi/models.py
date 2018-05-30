from django.db import models
import uuid

class FloorPlan(models.Model):
    id = models.AutoField(primary_key=True)
    floor_name = models.CharField(max_length=150)
    serialised_plan_svg = models.TextField()

class Person(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=20, null=True, blank=True)
    floor = models.ForeignKey(FloorPlan, on_delete=models.CASCADE, related_name="people")
    url = models.TextField(blank=True, null=True)

class PersonAnnotation(models.Model):
    id = models.AutoField(primary_key=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="annotations")
    x = models.FloatField()
    y = models.FloatField()
    label = models.CharField(max_length=200)
    order_num = models.DecimalField(decimal_places=0,max_digits=3)

    class Meta:
        ordering = ["order_num"]
