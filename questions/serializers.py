from rest_framework import serializers

from questions.models import Question


class QuestionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("id", "title", "description", "forecast", "created_at")


class QuestionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("title", "description", "forecast")
