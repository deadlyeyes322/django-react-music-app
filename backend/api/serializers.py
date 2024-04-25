from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Music

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ["id", "song_title", "artist_name", "image"]

    def create(self, validated_data):
        music = Music(
            song_title=validated_data['song_title'],
            artist_name=validated_data['artist_name'],
            image=validated_data['image']
        )
        music.save()
        return music