from django.db.models import QuerySet

from utils.models import model_update
from .models import Question


def get_questions_feed() -> QuerySet:
    return Question.objects.order_by("created_at").all()


def create_question(*, title: str = None, **kwargs) -> Question:
    obj = Question(title=title, **kwargs)
    obj.full_clean()
    obj.save()

    return obj


def update_question(question: Question, **kwargs) -> Question:
    question, _ = model_update(
        instance=question,
        data=kwargs,
    )

    return question
