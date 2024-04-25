import json
from django.shortcuts import render
from django.core.serializers import serialize
from django.http import JsonResponse
from .models import Routes
from .models import User
from .models import Favorites
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt

#Kobling til database

#Henter ruter
@api_view(['GET'])
def routes(request):
    my_data = Routes.objects.all()
    serialized_data = serialize('json', my_data)
    return JsonResponse(serialized_data, safe=False)

#Henter favoritter
@api_view(['GET'])
def favorites(request):
    my_data = Favorites.objects.all()
    serialized_data = serialize('json', my_data)
    return JsonResponse(serialized_data, safe=False)

#Poster brukere
@api_view(['POST'])
@csrf_exempt  
def addUsers(request):
    print("Request received")
    if request.method == 'POST':
        data = request.data
        user = User(name=data['name'], email=data['email'], password=data['password'])
        user.save()
        return Response({'message': 'User created'}, status=201)
    else:
        return Response({'error': 'Method not allowed'}, status=405) 


#Henter brukere
@api_view(['GET','POST'])
def user(request):

    if request.method == 'GET':
        my_data = User.objects.all()
        serialized_data = serialize('json', my_data)
        return JsonResponse(serialized_data, safe=False)

    elif request.method == 'POST':

        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                return Response({"message": "Login successful"}, status=200)
            else:
                return Response({"error": "Invalid password"}, status=401)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=404)
        
#Poster favoritter
@api_view(['POST'])
@csrf_exempt  
def addFavorites(request):
    print("Request received")
    if request.method == 'POST':
        data = request.data
        favorites = Favorites(routeid=data['routeid'], usermail=data['usermail'])
        favorites.save()
        return Response({'message': 'added favorites' }, status=201)
    else:
        return Response({'error': 'Method not allowed'}, status=405)