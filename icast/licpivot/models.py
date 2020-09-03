from django.db import models
from rest_framework import serializers

class Licpack(models.Model):
    name = models.CharField(max_length=128, blank=False, default='License pack name')
    desc = models.CharField(max_length=2048, blank=False, default='Serivce Package Description')
    groupid = models.IntegerField(blank=False, default=1)
    stripe_prod_id = models.CharField(max_length=128, blank=True, default="")

    class Meta:
        ordering = ('groupid', 'name')

    def __str__(self):
        return "%s : %s " % (self.name, self.desc)

class LicpackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licpack 
        fields = '__all__'
