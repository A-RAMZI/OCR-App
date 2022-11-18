from django.shortcuts import render
from .models import Facture,FactureImg
from .serializers import FactureSerializer,FactureImgSerializer
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser

class FactureViewSet(viewsets.ModelViewSet):
    queryset = Facture.objects.order_by('-creation_date')
    serializer_class = FactureSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)




class FactureImgViewSet(viewsets.ModelViewSet):
    queryset = FactureImg.objects.order_by('-creation_date')
    serializer_class = FactureImgSerializer 
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

