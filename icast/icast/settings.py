"""
Django settings for icast project.

Generated by 'django-admin startproject' using Django 3.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import os
from datetime import timedelta
from pathlib import Path
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
#enviroment setting
env = environ.Env(DEBUG=(bool, False))
# reading .env file
env_setting = os.path.join(BASE_DIR,'.env.development')
# env_setting = os.path.join(BASE_DIR,'.env.production')
environ.Env.read_env(env_setting)

SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG')
ALLOWED_HOSTS = ['*']

# Application definition
HTTPS= env.bool('HTTPS')
LICPIVOT_SERVER=env('LICPIVOT_SERVER') # licpivot.icast.com.hk
LICPIVOT_USER=env('LICPIVOT_USER')
LICPIVOT_PS=env('LICPIVOT_PS')
STRIPE_SECRET_KEY=env('STRIPE_SECRET_KEY')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #rest_framework 
    'rest_framework', # enable rest framework
    'corsheaders',  # for cors policies
     #apps
    'licpivot',
    'frontend'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 3rd party
    'corsheaders.middleware.CorsMiddleware',  
]

ROOT_URLCONF = 'icast.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'icast.wsgi.application'


# Database
DATABASES = {'default': env.db()}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR,'frontend/static')

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

#REST framework JWT Auth API setting
#https://github.com/jpadilla/django-rest-framework-jwt
JWT_AUTH = {
    # DEFAULTS test -----------------------------------
    # 'JWT_ENCODE_HANDLER':
    # 'rest_framework_jwt.utils.jwt_encode_handler',

    # 'JWT_DECODE_HANDLER':
    # 'rest_framework_jwt.utils.jwt_decode_handler',

    # 'JWT_PAYLOAD_HANDLER':
    # 'rest_framework_jwt.utils.jwt_payload_handler',

    # 'JWT_PAYLOAD_GET_USER_ID_HANDLER':
    # 'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

    # 'JWT_PRIVATE_KEY':
    # None,

    # 'JWT_PUBLIC_KEY':
    # None,

    # 'JWT_PAYLOAD_GET_USERNAME_HANDLER':
    # 'rest_framework_jwt.utils.jwt_get_username_from_payload_handler',

    #'JWT_RESPONSE_PAYLOAD_HANDLER':'rest_framework_jwt.utils.jwt_response_payload_handler',
    'JWT_RESPONSE_PAYLOAD_HANDLER':'icast.utils.app_jwt_response_handler',

    'JWT_SECRET_KEY': SECRET_KEY,
    # 'JWT_GET_USER_SECRET_KEY': None,
    # 'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    # 'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': timedelta(seconds=14400),
    # 'JWT_AUDIENCE': None,
    # 'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=1),

    # 'JWT_AUTH_HEADER_PREFIX': 'JWT',
    # 'JWT_AUTH_COOKIE': None,
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {  
            'format': '[%(levelname)s] %(asctime)s %(module)s %(message)s'
        },
        'error': {
            'format': '[%(levelname)s] %(asctime)s %(pathname)s %(module)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
        },
        'debug_file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR,'logs/debug.log'),
            'maxBytes': 1024 * 1024 * 50,  #50M
            'backupCount': 5,  
            'formatter': 'standard', 
            'encoding': 'utf-8',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console', 'debug_file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}