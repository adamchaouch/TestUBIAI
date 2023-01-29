from rest_framework import serializers

class ContentSerializer(serializers.Serializer):
    text = serializers.CharField()