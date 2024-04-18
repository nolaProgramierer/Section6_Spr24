from rest_framework import serializers
from .models import Piano

class PianoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Piano
        fields = ["brand", "price", "size", "imageUrl", "vote" ] 