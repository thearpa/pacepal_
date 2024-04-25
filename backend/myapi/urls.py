from django.urls import path
from . import views

urlpatterns = [
        path('routes/', views.routes, name='routes'),
        path('user/', views.user, name='user'),
        path('favorites/', views.favorites, name='favorites'),
        path('add-user/', views.addUsers, name='add_user'),
        path('add-favorites/', views.addFavorites, name='add_favorites'),
       
]