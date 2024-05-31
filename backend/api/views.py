from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, MusicSerializer, TrackRatingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Music, TrackRating
from rest_framework.response import Response


class CreateUserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return super().get_queryset()
    

class FindUserByNickname(generics.ListAPIView):
    def get_queryset(self):
        nickname = self.request.query_params.get('username')
        if nickname is not None:
            return User.objects.filter(username__icontains=nickname)
        return User.objects.none()
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if queryset.count() == 0:
            return Response({'error': 'No users found with this nickname.'}, status=404)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class MusicListCreate(generics.ListCreateAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id = self.request.query_params.get("id")
        if id is not None:
            return Music.objects.filter(id__icontains=id)
        return Music.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class MusicListBySpotifyId(generics.ListAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        spotify_id = self.request.query_params.get("spotify_id")
        print(spotify_id)
        if spotify_id is not None:
            return Music.objects.filter(spotify_id__icontains=spotify_id)
        return Music.objects.none()
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if queryset.count() == 0:
            return Response({'error': 'No found music with this id.'}, status=404)
        serializer = MusicSerializer(queryset, many=True)
        return Response(serializer.data)

class MusicDelete(generics.DestroyAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset()
    

class UserTrackRatingList(generics.ListAPIView):
    queryset = TrackRating.objects.all()
    serializer_class = TrackRatingSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        if user is not None:
            return TrackRating.objects.filter(user__username=user)
        return TrackRating.objects.all() 


class AddTrackRating(generics.CreateAPIView):
    queryset = TrackRating.objects.all()
    serializer_class = TrackRatingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TrackRatingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrackRating.objects.all()
    serializer_class = TrackRatingSerializer
    permission_classes = [IsAuthenticated]


class TrackRatingByTrackAndUserAPIList(generics.ListAPIView):
    queryset = TrackRating.objects.all()
    serializer_class = TrackRatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        track = self.request.query_params.get('track', None)
        print(user, track)
        if user is not None:
            return TrackRating.objects.filter(user__username=user, track__id=track)
        return TrackRating.objects.all() 