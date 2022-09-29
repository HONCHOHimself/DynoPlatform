from django.urls import path

from . import views

# Create your urls here.
urlpatterns = [
	path('check-username/', views.username_validation),
	path('check-email/', views.email_validation),
]
