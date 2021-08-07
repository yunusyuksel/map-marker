import uuid
from django.db import models

# Create your models here.

class Place(models.Model):
    uuid = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    latitude = models.DecimalField(max_digits=10, decimal_places=4, blank=False, null=False)
    longitude = models.DecimalField(max_digits=10, decimal_places=4, blank=False, null=False)
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="places")






