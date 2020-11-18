from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_access_policy import AccessPolicy
from .models import Licpack, LicpackSerializer
from django.conf import settings
from smtplib import SMTPException
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import get_template, render_to_string
from django.template import Context, Template
from django.utils.html import strip_tags
import json
import requests
import logging


class CoreAccessPolicy(AccessPolicy):
    statements = [
        {
            "action": ["subscribePassage", "contactrequest"],
            "principal": "*",
            "effect": "allow",
        }
    ]

class CoreViewSet(viewsets.ModelViewSet):
    queryset = Licpack.objects.all()
    serializer_class = LicpackSerializer
    permission_classes = (CoreAccessPolicy,)

    # Get an instance of a logger
    logger = logging.getLogger(__name__)

    #stripe payment subscription api proxy to licpivot.icast.com.hk server
    @action(["post"], detail=False)
    def subscribePassage(self, request):
        try:
           if "transmitCall" in request.data:
               # for inital subscription UI
               if request.data["transmitCall"] == "licpacks":
                    apiResp = self.licpivotApiProxy('licpack/', 'get', request.data)
               if request.data["transmitCall"] == "priceoption":
                    apiResp = self.licpivotApiProxy('licpack/priceoption/', 'get', request.data)
               #-- for subscription stripe payment 
               if request.data["transmitCall"] == "createOrg":
                    apiResp = self.licpivotApiProxy('subscribe/stripeCreateOrg/', 'post', request.data)
               if request.data["transmitCall"] == "stripePayment":
                    apiResp = self.licpivotApiProxy('subscribe/stripeSubscription/', 'post', request.data)
               if request.data["transmitCall"] == "stripeRetryPayment":
                    apiResp = self.licpivotApiProxy('subscribe/stripeRetryInvoice/', 'post', request.data)
               if request.data["transmitCall"] == "processSubscription":
                    apiResp = self.licpivotApiProxy('subscribe/', 'post', request.data)
           return Response(apiResp, status=status.HTTP_200_OK)
        except Exception as e:
           resp =  {"error":str(e)}
           self.logger.debug(resp)
           return Response(resp, status=status.HTTP_403_FORBIDDEN)

    def licpivotApiProxy(self, licpiovtAPI, httpMethod, payload):
        # perpar data to connect licpiovt servere
        licpiovtServerURL = f"http{ 's' if settings.HTTPS else '' }://{settings.LICPIVOT_SERVER}"
        loginData = {"username": settings.LICPIVOT_USER,
                     "password": settings.LICPIVOT_PS}
        try:
            req = requests.post(licpiovtServerURL + '/api/token-auth/', data=loginData, verify=False)
            authObject = req.json()
            # self.logger.debug(authObject)

            apiUrl = f"{licpiovtServerURL}/api/{licpiovtAPI}"

            headers = {'Authorization': 'JWT ' +
                    authObject["token"], "Content-Type": "application/json"}

            if httpMethod == "get":
                apiResponse = requests.get(apiUrl, headers=headers, verify=False)
            else:
                apiResponse = requests.post(
                    apiUrl, headers=headers, data=json.dumps(payload), verify=False)

            proServer_resp = apiResponse.json()
            # self.logger.info(proServer_resp)
            return proServer_resp
        except Exception as e:
           resp =  {"error":str(e)}
           self.logger.debug(resp)
           return resp

    @action(["post"], detail=False)
    def contactrequest(self, request):
        print(f"request {request.data}")
        sendEmailaction = { "action": self.sendContactRequestEmail(request.data)}
        return Response(sendEmailaction, status=status.HTTP_200_OK)


    def sendContactRequestEmail(self, requestData):
        # send mail
        subject = f"iCast Contact Request :  {requestData['subject']}"
        from_email = settings.DEFAULT_FROM_EMAIL
        to = [settings.DEFAULT_FROM_EMAIL, "sales@icast.com.hk", "dannymak@ppn.com.hk"]
        # to = ["wickylee@isignage.com.hk"]
        context_data = {"name": requestData['name'],
                         "email": requestData['email'],
                         'subject': requestData['subject'],
                         "message": requestData['message'],
                        }

        template = get_template(f"{settings.BASE_DIR}/frontend/templates/contact_request.html")
        # context = Context(context_data)
        body_html = template.render(context_data)
        body_text = strip_tags(body_html)

        # print(f"body_text: {body_text}")
        msg = EmailMultiAlternatives(subject, body_text, from_email, to)
        msg.attach_alternative(body_html, "text/html")

        try:
            msg.send()
        except SMTPException as err:
            self.logger.debug(
                'There was an error sending an email: {}'.format(err))
            return False

        return True