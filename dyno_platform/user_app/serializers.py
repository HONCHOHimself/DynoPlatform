from rest_framework import serializers

from django.contrib.auth.models import User

from .models import UserProfile

# Create your serializers here.
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'first_name', 'last_name', 'username', 'email', 'date_joined']


class UserProfileSerializer(serializers.ModelSerializer):
	user = UserSerializer()
	class Meta:
		model = UserProfile
		fields = ['id', 'profile_picture', 'color_mode', 'verified_user', 'user']
