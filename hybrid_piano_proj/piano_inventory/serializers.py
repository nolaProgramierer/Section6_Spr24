from rest_framework import serializers
from .models import Piano, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email" ]


class PianoSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField for POST requests (creating or updating Piano)
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)

     # Return full user details for GET requests, not for creating an object
    owner_detail = UserSerializer(source='owner', read_only=True)
    
    class Meta:
        model = Piano
        fields = ["id", "brand", "price", "size", "imageUrl", "owner", "owner_detail" ]
