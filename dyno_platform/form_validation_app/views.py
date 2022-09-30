from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

# Create your views here.
@api_view(['GET', 'POST'])
def username_validation(request):

	username = request.data.get('username')

	try:
		if User.objects.filter(username=username).exists():
			return Response('Username already exists.')
		else:
			# Usernam is valid.
			return Response(True)
	except:
		return Response('An error occured, please try again later.')


@api_view(['GET', 'POST'])
def email_validation(request):

	email = request.data.get('email')

	try:
		if User.objects.filter(email=email).exists():
			return Response('Email already exists.')
		else:
			# Email is valid.
			return Response(True)
	except:
		return Response('An error occured, please try again later.')
