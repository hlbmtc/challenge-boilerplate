from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from questions.models import Question
from questions.serializers import QuestionWriteSerializer, QuestionReadSerializer
from questions.services import create_question, update_question, get_questions_feed


class QuestionsAPIView(APIView):
    @classmethod
    def get(cls, request: Request) -> Response:
        qs = get_questions_feed()

        return Response(QuestionReadSerializer(qs, many=True).data)

    @classmethod
    def post(cls, request: Request) -> Response:
        serializer = QuestionWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        question = create_question(**serializer.validated_data)

        return Response(
            QuestionReadSerializer(question).data,
            status=status.HTTP_201_CREATED,
        )


@api_view(["PATCH"])
def question_update_api_view(request: Request, pk: int) -> Response:
    question = get_object_or_404(Question, pk=pk)

    serializer = QuestionWriteSerializer(question, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)

    question = update_question(question, **serializer.validated_data)

    return Response(QuestionReadSerializer(question).data)
