from abc import ABC
from typing import Final
from rest_framework.mixins import (
    CreateModelMixin,
)
from rest_framework.viewsets import GenericViewSet
from components.feedback.serializers.feedback_serializer import FeedbackSerializer


class FeedbackModelViewSet(GenericViewSet,
                           CreateModelMixin,
                           ABC):
    http_method_names: Final = ['post']
    serializer_class = FeedbackSerializer
