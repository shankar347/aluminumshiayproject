from django.urls import path
from .views import RegisterUserView, LoginUserView,predict_aluminium,recommend,LogoutUserView,get_material_data
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('api/register/', RegisterUserView.as_view(), name='register'),
    path('api/login/', LoginUserView.as_view(), name='login'),
    path('api/predict/',predict_aluminium,name='predict_aluminium'),
    path('api/recommend/',recommend,name='recommend'),
    path('api/token/',TokenObtainPairView.as_view() ,name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/',LogoutUserView.as_view(),name='logout'),
    path('api/data/',get_material_data,name='data')
]
