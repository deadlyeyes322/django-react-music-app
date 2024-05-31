from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Music, TrackRating

class UserSerializer(serializers.ModelSerializer):
    votes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "votes"]
        extra_kwargs = {"password": {"write_only": True}, }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ["id", "song_title", "artist_name", "spotify_id", "image"]

    def create(self, validated_data):
        return Music.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.song_title = validated_data.get("song_title", instance.song_title)
        instance.artist_name = validated_data.get("artist_name", instance.artist_name)
        instance.spotify_id = validated_data.get("artist_name", instance.artist_name)
        instance.image = validated_data.get("image", instance.image)
        instance.save()
        return instance
    

class TrackRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackRating
        fields = ["id", "user", "track", "rating"]

    