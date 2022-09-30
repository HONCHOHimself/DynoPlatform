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
def send_verification_email(request, user_token):
	decrypted_token = signing.loads(user_token)['token']
	token = Token.objects.filter(key=decrypted_token).first()
	if token:
		user = token.user
		user_profile = UserProfile.objects.filter(user=user).first()
		if user_profile.verified_user:
			# User already verified.
			return Response(True)
		else:
			verification_code = signing.dumps({ 'id': user.id })
			user_verification_letters = verification_code[19:25]
			send_mail(
				'Your Verification Token',
				f'{user_verification_letters}',
				'Dyno Platform',
				[user.email],
			)
			# Code has been sent.
			return Response(True)
	else:
		# User doesn't exists.
		return Response(False)


@api_view(['GET', 'POST'])
def user_verification(request, user_token):
	
	verification_code = request.data.get('verification_code')

	decrypted_token = signing.loads(user_token)['token']
	token = Token.objects.filter(key=decrypted_token).first()
	user = token.user
	user_profile = UserProfile.objects.filter(user=user).first()
	if user_profile.verified_user:
		# User already verified.
		return Response(True)
	else:
		verification_code_2 = signing.dumps({ 'id': user.id })
		user_verification_letters = verification_token[19:25]
		if verification_code == user_verification_letters:
			user_profile.verified_user = True
			user_profile.save()
			# User has been verified.
			return Response(True)
		else:
			# Code doesn't match.
			return Response(False)