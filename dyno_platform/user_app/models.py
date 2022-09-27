from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
	profile_picture = models.ImageField(upload_to='profile_pictures', default='default-light.png')
	color_mode = models.BooleanField(default=True)
	verified_user = models.BooleanField(default=False)
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')

	def __repr__(self):
		return f'<{self.id}: {self.user.username} Profile>'
