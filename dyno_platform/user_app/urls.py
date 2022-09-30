from django.urls import path

from . import views

# Create your urls here.
urlpatterns = [
	path('current-user/<user_token>/', views.current_user),
	path('current-user/profile/<user_token>/', views.current_user_profile),
	path('input-results/', views.input_results),
	path('user-result/<user_id>/', views.search_result_user),
	path('user-result/profile/<user_id>/', views.user_profile),
]
