from django.urls import path
from . import views

urlpatterns = [
    path("music/", views.MusicListCreate.as_view(), name="music-list"),
    path("music-by-id/", views.MusicListBySpotifyId.as_view(), name="music-by-id"),
    path("music/delete/<int:pk>/", views.MusicDelete.as_view(), name="delete-music"),
]