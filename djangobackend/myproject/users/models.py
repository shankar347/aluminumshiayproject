from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

# Create your models here.


class Customusermanager(BaseUserManager):
     def create_user(self,phone_no,password=None,**extra_fields):
          if not phone_no:
               raise ValueError('The phone number must be set')
          user=self.model(phone_no=phone_no,**extra_fields)
          user.set_password(password)
          user.save(using=self._db)
          return user
    
     def create_superuser(self, phone_no, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(phone_no, password, **extra_fields)



class CustomUser(AbstractBaseUser):
    phone_no=models.CharField(max_length=15,unique=True,null=True,blank=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects=Customusermanager()

    USERNAME_FIELD = 'phone_no'
    REQUIRED_FIELDS = ['name', 'email']
    
    def __str__(self):
        return self.phone_no
