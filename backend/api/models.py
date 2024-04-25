from django.db import models
from django.contrib.auth.models import User
from django.core.files import File
import os

class Music(models.Model):
    song_title = models.CharField(max_length=75)
    artist_name = models.CharField(max_length=75)
    image = models.CharField(max_length=75, blank=True, null=True)

    def __str__(self):
        return self.artist_name + " - " + self.song_title