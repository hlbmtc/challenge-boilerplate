from django.db import models
from django.utils import timezone


class Question(models.Model):
    title = models.CharField(null=False, blank=True, default="")
    description = models.TextField(null=False, blank=True, default="")
    forecast = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(default=timezone.now, editable=False)
