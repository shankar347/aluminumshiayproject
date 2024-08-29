from django.shortcuts import render
import joblib
import pandas as pd
from rest_framework.decorators import api_view
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
import numpy
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication  import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from sklearn.preprocessing import LabelEncoder
from rest_framework.permissions import IsAuthenticated

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # token, created = Token.objects.get_or_create(user=user)
            # return Response({'token': token.key}, status=status.HTTP_201_CREATED)
            refresh=RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            user_data= {
                'name': user.name,
                'email': user.email,
                'token': access_token,
                'password':user.password,
                 'phone_no':user.phone_no
            }
            return Response(user_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            user_data= {
                'name': user.name,
                'email': user.email,
                'token': access_token,
                'password':user.password,
                 'phone_no':user.phone_no
            }
            login(request, user)
            return Response(user_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        try:
           if request.auth is None or request.user is None:
                return Response({"error": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
           
           tokens = OutstandingToken.objects.filter(user=request.user)
           for token in tokens:
                BlacklistedToken.objects.get_or_create(token=token)  
           return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)  
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
model_path=settings.ML_MODELS_DIR/'aluminum_predictor.pkl'
data_path=settings.ML_MODELS_DIR/'alumdata.csv'
data=pd.read_csv(data_path)
# print(data)
modeldata=joblib.load(model_path)
model=modeldata['model']
# feature_columns=modeldata['feature_names']

# print('model path',model_path)

material_type_classes = ['Alloy', 'Pure', 'Composite']
feature_columns=[f'material_type_{mt}' for mt in material_type_classes] + ['quantity_required', 'date_range']

# def one_hot_encode_mateial_type(material_type):
#  encoding=[1 if material_type == cls else 0 for cls in material_type_classes] 
#  return encoding

def one_hot_encode_mateial_type(material_type):
    encoding = [0] * len(material_type_classes)
    if material_type in material_type_classes:
        encoding[material_type_classes.index(material_type)] = 1
    return encoding



@csrf_exempt
@api_view(['POST'])
def predict_aluminium(request):
  if request.method == 'POST':
    auth_header=get_authorization_header(request).decode('utf-8')
    if not auth_header:
            return Response({'error': 'Authorization header is missing'}, status=status.HTTP_401_UNAUTHORIZED)
    try:
     print(f"Authorization Header: {auth_header}")
    except AuthenticationFailed:
         return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    try:           
        material_type = request.data.get('material_type')
        quantity_required =float(request.data.get('quantity_required'))
        date_range =float(request.data.get('date_range'))
        
        material_type_encoded=one_hot_encode_mateial_type(material_type)
        input_data = numpy.array([material_type_encoded + [quantity_required, date_range]])

        # inpt_df=pd.DataFrame(input_data,columns=feature_columns) 
        prediction=model.predict(input_data)

        return Response({'predection':prediction[0]},status=status.HTTP_200_OK)
    except Exception as e:
         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
  else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(['POST'])
def recommend(request):
  if request.method == 'POST':
    auth_header=get_authorization_header(request).decode('utf-8')
    if not auth_header:
            return Response({'error': 'Authorization header is missing'}, status=status.HTTP_401_UNAUTHORIZED)
    try:
     print(f"Authorization Header: {auth_header}")
    except AuthenticationFailed:
         return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        exclude_material=request.data.get('material_type')
        quantity_required =float(request.data.get('quantity_required'))
        date_range =float(request.data.get('date_range')) 
        
        recommendation= recommend_aluminium(quantity_required,date_range,exclude_material)
        return Response({'recommendation':recommendation},status=status.HTTP_200_OK)  
    except Exception as e:
         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
  else:  
   return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
  
def recommend_aluminium(quantity_required,date_range,exclude_material):
    materials=[mt for mt in material_type_classes if mt != exclude_material]
    recommendations=[]

    for material in materials:
        # input_data=pd.DataFrame({
        #     'material_type':[material],
        #     'quantity_required': [quantity_required],
        #     'date_range': [date_range]
        # })
        material_type_encoded=one_hot_encode_mateial_type(material)
        input_data=pd.DataFrame([material_type_encoded+[quantity_required,date_range]]) 
        # input_data=pd.get_dummies(input_data)
        input_data=input_data.reindex(columns=model.feature_names_in_,
                                      fill_value= 0)
        prediction=model.predict(input_data)[0]
        print(prediction)
        recommendations.append({'material_type': material, 'predicted_quality': prediction})
        print('Predection',prediction)
        best_recommendations=[rec for rec in recommendations if rec['predicted_quality']>=50]
        best_recommendations.sort(key= lambda x: x['predicted_quality'],reverse=True)
        return best_recommendations


@csrf_exempt
@api_view(['GET'])
def get_material_data(request):
    auth_header = get_authorization_header(request).decode('utf-8')
    if not auth_header:
        return Response({'error': 'Authorization header is missing'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        print(f"Authorization Header: {auth_header}")
    except AuthenticationFailed:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        data_list=data.to_dict(orient='records')
        return Response({'data':data_list},status=status.HTTP_200_OK)
    except:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)