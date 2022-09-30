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
	profile_picture = request.data.get('profile_picture')
	color_mode = request.data.get('color_mode')
	
	user = authenticate(request, username=username, password=password)
	if user:
		# User already exists.
		return Response(False)
	else:
		if User.objects.filter(email=email).exists():
			# Email already exists.
			return Response(False)
		else:
			user = User.objects.create_user(username=username, email=email, password=password)
			user_profile = UserProfile(user=user)
			user_profile.save()
			if profile_picture:
				user_profile.profile_picture = profile_picture
				user_profile.save()
			if color_mode:
				if color_mode == 'light':
					user_profile.color_mode = True
					user_profile.save()
				elif color_mode == 'dark':
					user_profile.color_mode = False
					user_profile.save()
			user_token = Token(user=user)
			user_token.save()
			verification_token = signing.dumps({ 'id': user.id })
			user_verification_letters = verification_token[19:25]
			token = user_token.key
			encrypted_token = signing.dumps({ 'token': token })
			send_mail(
				'Your Verification Token',
				f'{user_verification_letters}',
				'Dyno Platform',
				[user.email],
			)
			return Response(encrypted_token)


@api_view(['GET', 'POST'])
def login_view(request):
	
	username = request.data.get('username')
	password = request.data.get('password')

	user = authenticate(request, username=username, password=password)
	if user:
		user_token = Token.objects.filter(user=user).first()
		token = user_token.key
		encrypted_token = signing.dumps({ 'token': token })
		return Response(encrypted_token)
	else:
		# User doesn't exists.
		return Response(False)