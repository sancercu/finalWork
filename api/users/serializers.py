from rest_framework import serializers
from .models import User

# Serializador de User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')