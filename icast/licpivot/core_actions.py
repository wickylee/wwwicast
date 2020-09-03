from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_access_policy import AccessPolicy
from .models import Licpack, LicpackSerializer
from django.conf import settings
import json
import requests
import logging


class CoreAccessPolicy(AccessPolicy):
    statements = [
        {
            "action": ["subscribePassage"],
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