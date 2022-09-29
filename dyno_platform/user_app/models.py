from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
	profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)
	color_mode = models.BooleanField(default=True)
	verified_user = models.BooleanField(default=False)
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')

	def __str__(self):
		return f'<{self.user.username} Profile>'
