from licpivot.serializers import UserLoginSerializer


def app_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserLoginSerializer(user, context={'request': request}).data
    }
