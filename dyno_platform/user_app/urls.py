from django.urls import path

from . import views

# Create your urls here.
urlpatterns = [
	path('current-user/<user_token>/', views.current_user),
	path('input-results/', views.search_list),
	path('result/', views.search_user),
]
