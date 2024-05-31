from django.db import models
from django.contrib.auth.models import User
from django.core.files import File
import os

class Music(models.Model):
    song_title = models.CharField(max_length=75)
    artist_name = models.CharField(max_length=75)
    spotify_id = models.CharField(max_length=100, null=True, unique=True)
    image = models.CharField(max_length=75, blank=True, null=True)
    sum_of_votes = models.FloatField(null=True)


    def __str__(self):
        return self.artist_name + " - " + self.song_title
    

class TrackRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track = models.ForeignKey('Music', on_delete=models.CASCADE)
    rating = models.FloatField()

    class Meta:
        unique_together = ('user', 'track')

    def __str__(self) -> str:
        return self.user.username + " " + self.track.artist_name + " - " + self.track.song_title