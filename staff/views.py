from django.shortcuts import render
from rest_framework.exceptions import status
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            return Response({
                'message': 'success',
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):

        try:
            return Response({
                'message': 'success',
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'error': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)
