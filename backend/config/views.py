from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import FileResponse

from .serializer import ContentSerializer
class downloadfile(APIView):

   def post(self, request, format=None):
        serializer = ContentSerializer(data=request.data)
        if serializer.is_valid():
            text = serializer.validated_data['text']
            # Generate file with text as its content
            file = open("file.txt", "wb")
            file.write(text.encode())
            file.close()
            file = open("file.txt", "rb")
            response = FileResponse(file)
            response['Content-Disposition'] = 'attachment; filename="file.txt"'
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)