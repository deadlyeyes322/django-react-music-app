from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserTrackRatingList, AddTrackRating, FindUserByNickname
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/track-ratings/", UserTrackRatingList.as_view(), name='track-ratings'),
    path("api/add-track-rating/", AddTrackRating.as_view(), name='add-track-rating'),
    path('api/find-users-by-nickname/', FindUserByNickname.as_view(), name='find-users-by-nickname'),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
