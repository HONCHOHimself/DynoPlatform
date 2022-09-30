from django.shortcuts import render
from django.core import signing

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from .models import UserProfile

from .serializers import UserSerializer, UserProfileSerializer

# Create your views here.
@api_view(['GET'])
def current_user(request, user_token):
	decrypted_token = signing.loads(user_token)['token']
	token = Token.objects.filter(key=decrypted_token).first()
	if token:
		user = token.user
		user_serializer = UserSerializer(user)
		return Response(user_serializer.data)
	else:
		# User doesn't exists.
		return Response(False)


@api_view(['GET'])
def current_user_profile(request, user_token):
	decrypted_token = signing.loads(user_token)['token']
	token = Token.objects.filter(key=decrypted_token).first()
	if token:
		user = token.user
		profile = UserProfile.objects.filter(user=user).first()
		profile_serializer = UserProfileSerializer(profile)
		return Response(profile_serializer.data)
	else:
		# User doesn't exists.
		return Response(False)


@api_view(['POST', 'GET'])
def change_color_mode(request, user_token):
	decrypted_token = signing.loads(user_token)['token']
	token = Token.objects.filter(key=decrypted_token).first()
	if token:
		user = token.user
		profile = UserProfile.objects.filter(user=user).first()
		if profile.color_mode == True:
			profile.color_mode = False
			profile.save()
			# Changed color mode to dark.
			return Response(True)
		else:
			profile.color_mode = True
			profile.save()
			# Changed color mode to light.
			return Response(True)
	else:
		# User doesn't exists.
		return Response(False)


@api_view(['GET', 'POST'])
def input_results(request):
	
	letter = request.data.get('letter')

	if User.objects.filter(username__icontains=letter).exists():
		users = User.objects.filter(username__icontains=letter).all()
		serializer = UserSerializer(users, many=True)
		return Response(serializer.data)
	else:
		# No results.
		return Response(False)


@api_view(['GET', 'POST'])
def search_result_user(request, user_id):
	if User.objects.filter(id=user_id).exists():
		user = User.objects.filter(id=user_id).first()
		serializer = UserSerializer(user)
		return Response(serializer.data)
	else:
		# No results.
		return Response(False)


@api_view(['GET', 'POST'])
def user_profile(request, user_id):
	user_profile = UserProfile.objects.filter(user=user_id).first()
	serializer = UserProfileSerializer(user_profile)
	return Response(serializer.data)