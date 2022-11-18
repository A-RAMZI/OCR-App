from rest_framework import routers
from .api import FactureViewSet,FactureImgViewSet

router = routers.DefaultRouter()
router.register('api/factures',FactureViewSet,'factures')
router.register('api/captures',FactureImgViewSet,'factureImgs')


urlpatterns = router.urls