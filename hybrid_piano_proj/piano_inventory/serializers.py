from rest_framework import serializers
from .models import Piano, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email" ] 

        
class PianoSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    class Meta:
        model = Piano
        fields = ["id", "brand", "price", "size", "imageUrl", "vote", "owner" ]



