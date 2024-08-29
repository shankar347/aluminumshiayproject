# yourapp/backends.py

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
import logging
logger = logging.getLogger(__name__)

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        logger.info(f"Authenticating user with email: {username}")
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            logger.error(f"No user found with email: {username}")
            return None
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                logger.info(f"User {username} authenticated successfully")
                return user
            else:
                logger.error(f"Failed password check for user: {username}")
        return None

    