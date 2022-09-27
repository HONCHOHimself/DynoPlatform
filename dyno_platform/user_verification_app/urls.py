from django.urls import path

from . import views

# Create your urls here.
urlpatterns = [
	path('send-verification-email/<user_token>/', views.send_verification_email),
	path('user-verification/<user_token>/', views.user_verification),
]
