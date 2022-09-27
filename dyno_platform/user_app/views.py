from django.shortcuts import render
from django.core import signing

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from user_app.models import UserProfile

from .serializers import UserProfileSerializer

# Create your views here.
@api_view(['GET'])
def current_user(request, user_token):
	try:
		decrypted_token = signing.loads(user_token)['token']
		token = Token.objects.filter(key=decrypted_token).first()
		if token:
			user = token.user
			user_profile = UserProfile.objects.filter(user=user).first()
			serializer = UserProfileSerializer(user_profile)
			return Response(serializer.data)
		else:
			return Response('User Doesn\'t exist.')
	except:
		return Response('An error occured, please try again later.')


@api_view(['GET', 'POST'])
def search_list(request):
	
	letter = request.data.get('letter')

	try:
		profiles = []
		if User.objects.filter(username__contains=letter).exists():
			users = User.objects.filter(username__contains=letter).all()
			for user in users:
				user_profile = UserProfile.objects.filter(user=user).first()
				profiles.append(user_profile)
			serializer = UserProfileSerializer(profiles, many=True)
			return Response(serializer.data)
		else:
			return Response('No Result.')
	except:
		return Response('An error occured, please try again later.')


@api_view(['GET', 'POST'])
def search_user(request):
	
	username = request.data.get('username')

	try:
		if User.objects.filter(username=username).exists():
			user = User.objects.filter(username=username).first()
			user_profile = UserProfile.objects.filter(user=user).first()
			serializer = UserProfileSerializer(user_profile)
			return Response(serializer.data)
		else:
			return Response('No Result.')
	except:
		return Response('An error occured, please try again later.')
