from django.db import models
from django.contrib.auth.models import User

class Music(models.Model):
    class Ratings(models.IntegerChoices):
        ONE = 1
        TWO = 2
        THREE = 3
        FOUR = 4
        FIVE = 5
        SIX = 6
        SEVEN = 7
        EIGHT = 8
        NINE = 9
        TEN = 10

    song_title = models.CharField(max_length=75)
    artist_name = models.CharField(max_length=75)
    rating = models.IntegerField(choices=Ratings)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="music")

    def __str__(self):
        return self.artist_name + " - " + self.song_title