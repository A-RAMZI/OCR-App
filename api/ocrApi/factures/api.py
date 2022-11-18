from factures.models import Facture,FactureImg
from rest_framework import viewsets , permissions 
from .serializer import FactureSerializer,FactureImgSerializer

# Lead Viewset
class FactureViewSet(viewsets.ModelViewSet):
    queryset = Facture.objects.all()
    permission_classes =[
        permissions.AllowAny
    ]
    serializer_class=FactureSerializer

class FactureImgViewSet(viewsets.ModelViewSet):
    queryset = FactureImg.objects.all()
    permission_classes =[
        permissions.AllowAny
    ]
    serializer_class=FactureImgSerializer