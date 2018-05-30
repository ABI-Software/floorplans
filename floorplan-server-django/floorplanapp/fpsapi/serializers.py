from .models import Person, FloorPlan, PersonAnnotation
from rest_framework import serializers
from django.db import transaction

class PersonAnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonAnnotation
        fields = ("x","y","label")


class PersonSerializer(serializers.ModelSerializer):
    profileUrl = serializers.CharField(source="url")
    annotations = PersonAnnotationSerializer(many=True)
    url = serializers.HyperlinkedIdentityField(view_name="person-detail")
    floor = serializers.HyperlinkedRelatedField(queryset=FloorPlan.objects.all(),view_name="floorplan-detail")

    class Meta:
        model = Person
        fields = ("id","url","floor","username","profileUrl","annotations")

    # Custom create and update methods so we can create annotations as part of creating/editing a person
    @transaction.atomic
    def create(self, validated_data):
        print("Validated data is ",validated_data)
        annotations_data = validated_data.pop('annotations')
        person = Person.objects.create(**validated_data)
        for index,annotation_data in enumerate(annotations_data):
            PersonAnnotation.objects.create(person=person, order_num=index, **annotation_data)
        return person

    @transaction.atomic
    def update(self,instance, validated_data):
        # update will replace all information in db with submitted data
        annotations_data = validated_data.pop('annotations')
        annotations = instance.annotations
        # we update username, url, and annotations only. Floor change not supported
        instance.username = validated_data.get('username')
        instance.url = validated_data.get('url')
        # Delete current annotations and recreate new ones
        annotations.all().delete()
        for index, annotation_data in enumerate(annotations_data):
            PersonAnnotation.objects.create(person=instance,order_num=index, **annotation_data)
        instance.save()
        return instance

class FloorPlanSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="floorplan-detail")
    name = serializers.CharField(source="floor_name")
                                               
    class Meta:
        model = FloorPlan
        fields = ["name","url","id"]

class FloorPlanDetailSerializer(serializers.ModelSerializer):
    people = PersonSerializer(many=True,read_only=True)
    baseMap = serializers.HyperlinkedIdentityField(view_name="floorplan-baseMap",format="svg")
    name = serializers.CharField(source="floor_name")
    
    class Meta:
        model = FloorPlan
        fields = ("id","name","baseMap","people")
