"""
WSGI config for icast project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os, sys

#sys.path.append('C:/iSignageNG/www/www.icast.com.hk')
#sys.path.append('/home/isignicast_gmail_com/webapp/www')

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'icast.settings')

application = get_wsgi_application()
