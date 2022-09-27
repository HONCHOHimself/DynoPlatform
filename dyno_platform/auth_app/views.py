from django.shortcuts import render
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.core import signing

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from user_app.models import UserProfile

# Create your views here.
@api_view(['GET', 'POST'])
def register_view(request):

	username = request.data.get('username')
	email = request.data.get('email')
	password = request.data.get('password')
	# profile_picture = request.data.get('profile_picture')
	try:
		if User.objects.filter(username=username).exists():
			return Response('Username already exists.')
		if User.objects.filter(email=email).exists():
			return Response('Email already exists.')
		user = User.objects.create_user(username=username, email=email, password=password)
		user_profile = UserProfile(user=user)
		user_profile.save()
		user_token = Token(user=user)
		user_token.save()
		verification_token = signing.dumps({ 'id': user.id })
		user_verification_letters = verification_token[19:25]
		send_mail(
			'Your Verification Token',
			f'{user_verification_letters}',
			'Dyno Platform',
			[user.email],
		)
		return Response(True)
	except:
		return Response('An error occured, please try again later.')


@api_view(['GET', 'POST'])
def login_view(request):
	
	username = request.data.get('username')
	password = request.data.get('password')

	try:
		user = authenticate(request, username=username, password=password)
		if user:
			user_token = Token.objects.filter(user=user).first()
			if user_token:
				token = user_token.key
				encrypted_token = signing.dumps({ 'token': token })
				return Response(encrypted_token)
			else:
				return Response('User\'s token doesn\'t. exist.')
		else:
			return Response('Invalid Credentials.')
	except:
		return Response('An error occured, please try again later.')
