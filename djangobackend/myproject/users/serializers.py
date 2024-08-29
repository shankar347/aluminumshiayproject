from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User=get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['name','email','password','phone_no']
        extra_kwargs={'password':{'write_only':True}}
    




    def validate_phone_no(self,value):
        if not value:
            raise serializers.ValidationError('Phone number is required')
        elif User.objects.filter(phone_no=value).exists():
            raise serializers.ValidationError('Phone number already exists')
        return value

   
    def validate_email(self,value):
        if not value:
            raise serializers.ValidationError('Email is required')
        elif User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists')
        return value
    

    def validate_password(self,value):
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

    # def create(self,validated_data):
    #     user=User.objects.create_user(
    #         name=validated_data['name'],
    #         email=validated_data.get('email',''),
    #         password=validated_data['password'],
    #         phone_no=validated_data.get('phone_no','')
    #     )
    #     return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=data.get('email'))
        except UserModel.DoesNotExist:
            raise serializers.ValidationError({"email": "This email is not registered."})


        user = authenticate(username=data.get('email'), password=data.get('password'))
            
        if user is None:

            raise serializers.ValidationError({"password": "Incorrect password."})

        if not user.is_active:
            raise serializers.ValidationError({"email": "This account is deactivated."})

        return user