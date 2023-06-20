from rest_framework.serializers import ModelSerializer
from components.feedback.models.feedback_model import FeedbackModel

class FeedbackSerializer(ModelSerializer):
    """Сериализатор для обращений"""

    class Meta:
        model = FeedbackModel
        fields = '__all__'
