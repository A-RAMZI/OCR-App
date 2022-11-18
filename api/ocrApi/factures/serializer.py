from rest_framework import serializers
from factures.models import Facture,FactureImg

#Facture serializer
class FactureSerializer (serializers.ModelSerializer):
    class Meta:
        model=Facture
        fields = '__all__'



#FactureImg serializer

class FactureImgSerializer (serializers.ModelSerializer):
    image = serializers.ImageField(required=True)
    class Meta:
        model = FactureImg
        fields = ['id', 'image','id_facture','id_magasin','id_client','t_vendu','t_retour','total']
        read_only_fields = ['id', 'created_at', 'image','id_facture','id_magasin','id_client','t_vendu','t_retour','total']



