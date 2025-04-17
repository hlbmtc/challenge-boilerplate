from django.urls import path

from . import views

urlpatterns = [
    path("questions/", views.QuestionsAPIView.as_view(), name="questions-list"),
    path("posts/<int:pk>/", views.question_update_api_view, name="question-update"),
]
