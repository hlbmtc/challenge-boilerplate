import pytest
from django.urls import reverse
from rest_framework import status

from questions.services import create_question


@pytest.fixture()
def question_1():
    return create_question(
        title="Question 1", description="Question 1 Description", forecast=0.15
    )


@pytest.fixture()
def question_2():
    return create_question(title="Question 2", description="Question 2 Description")


def test_questions_list(client, question_1, question_2):
    url = reverse("questions-list")
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2

    assert response.data[0]["id"] == question_1.id
    assert response.data[0]["title"] == "Question 1"
    assert response.data[0]["description"] == "Question 1 Description"
    assert response.data[0]["forecast"] == 0.15

    assert response.data[1]["id"] == question_2.id
    assert response.data[1]["title"] == "Question 2"
    assert response.data[1]["description"] == "Question 2 Description"
    assert response.data[1]["forecast"] is None


@pytest.mark.django_db
def test_questions_create(client):
    url = reverse("questions-list")
    data = {
        "title": "Question title",
        "description": "Question Description",
    }
    response = client.post(url, data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["id"]
    assert response.data["title"] == "Question title"
    assert response.data["description"] == "Question Description"
    assert response.data["forecast"] is None


@pytest.mark.django_db
def test_questions_detail(client, question_2):
    url = reverse("question-update", args=[question_2.id])

    response = client.patch(url, {"forecast": 0.66})
    assert response.status_code == status.HTTP_200_OK

    assert response.data["title"] == "Question 2"
    assert response.data["description"] == "Question 2 Description"
    assert response.data["forecast"] == 0.66
