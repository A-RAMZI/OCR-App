from django.db import models

class Facture(models.Model):
    image=models.CharField(max_length=100)
    id_facture=models.CharField(max_length=20)
    id_magasin=models.CharField(max_length=20)
    id_client=models.CharField(max_length=20)
    t_vendu=models.CharField(max_length=15)
    t_retour=models.CharField(max_length=15)
    total=models.CharField(max_length=15)
    created_at=models.DateTimeField(auto_now_add=True)
    

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

def extractData(img):
    return {"id_facture":"aaa",
    "id_magasin":"aaa",
    "id_client":"aaa",
    "t_vendu":"aaa",
    "t_retour":"aaa",
    "total":"aaa"}
class FactureImg(models.Model):
    created_at=models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    id_facture=models.CharField(max_length=20)
    id_magasin=models.CharField(max_length=20)
    id_client=models.CharField(max_length=20)
    t_vendu=models.CharField(max_length=15)
    t_retour=models.CharField(max_length=15)
    total=models.CharField(max_length=15)
    created_at=models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.id:
            print('updating')
        else:
            print('creating')
            data=extractData(self.image)
            print(data)
            self.id_facture=data["id_facture"]
            self.id_magasin=data["id_magasin"]
            self.id_client=data["id_client"]
            self.t_vendu=data["t_vendu"]
            self.t_retour=data["t_retour"]
            self.total=data["total"]
        super(FactureImg, self).save(*args, **kwargs)
        return 
    def __str__(self) :
        return {'date':self.created_at,'url':self.image_url}

