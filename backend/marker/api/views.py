from rest_framework import generics,viewsets
from .serializers import PlaceSerializer
from marker.models import Place

class PlaceView(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer


   