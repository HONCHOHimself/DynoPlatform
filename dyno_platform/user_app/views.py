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
	try:
		decrypted_token = signing.loads(user_token)['token']
		token = Token.objects.filter(key=decrypted_token).first()
		if token:
			user = token.user
			user_serializer = UserSerializer(user)
			return Response(user_serializer.data)
		else:
			return Response('User Doesn\'t exist.')
	except:
		return Response('An error occured, please try again later.')


@api_view(['GET'])
def current_user_profile(request, user_token):
	try:
		decrypted_token = signing.loads(user_token)['token']
		token = Token.objects.filter(key=decrypted_token).first()
		if token:
			user = token.user
			profile = UserProfile.objects.filter(user=user).first()
			profile_serializer = UserProfileSerializer(profile)
			return Response(profile_serializer.data)
		else:
			return Response('User Doesn\'t exist.')
	except:
		return Response('An error occured, please try again later.')


@api_view(['GET', 'POST'])
def input_results(request):
	
	letter = request.data.get('letter')

	try:
		users = []
		if User.objects.filter(username__contains=letter).exists():
			match_users = User.objects.filter(username__contains=letter).all()
			for match_user in match_users:
				user = UserProfile.objects.filter(user=match_user).first()
				users.append(user)
			serializer = UserSerializer(users, many=True)
			return Response([True, serializer.data])
		else:
			return Response([False, 'No Result.'])
	except:
		return Response([False, 'An error occured, please try again later.'])


@api_view(['GET', 'POST'])
def search_result_user(request, user_id):
	try:
		if User.objects.filter(id=user_id).exists():
			user = User.objects.filter(id=user_id).first()
			serializer = UserSerializer(user)
			return Response([True, serializer.data])
		else:
			return Response([False, 'No Result.'])
	except:
		return Response([False, 'An error occured, please try again later.'])


@api_view(['GET', 'POST'])
def user_profile(request, user_id):
	try:
		user_profile = UserProfile.objects.filter(user=user_id).first()
		serializer = UserProfileSerializer(profile)
		return Response([True, serializer.data])
	except:
		return Response([False, 'An error occured, please try again later.'])
