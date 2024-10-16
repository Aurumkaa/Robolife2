from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from shared.api.views import QueryModelViewSet
import pickle
import numpy as np


def get_prediction(params):
    model_path = './components/harvest_recomendation/models/RF_crop_recommendation.pkl'
    with open(model_path, 'rb') as file:
        Pickled_LR_Model = pickle.load(file)

    # data = np.array([[32,57,22,28.6899851,87.50436797,6.769415887999999,44.56598352]])
    prediction = Pickled_LR_Model.predict_proba(params)
    return prediction
    # print(prediction[0])
    # prediction = Pickled_LR_Model.predict(params)
    # print(prediction)


cropsDict = [
    {'crop': 'apple', 'label': 'яблоки'},
    {'crop': 'banana', 'label': 'пшеница'},
    {'crop': 'blackgram', 'label': 'овес'},
    {'crop': 'chickpea', 'label': 'гречиха'},
    {'crop': 'coconut', 'label': 'ячмень'},
    {'crop': 'coffee', 'label': 'просо'},
    {'crop': 'cotton', 'label': 'лён-долгунец'},
    {'crop': 'grapes', 'label': 'кукуруза'},
    {'crop': 'jute', 'label': 'сахарная свёкла'},
    {'crop': 'kidneybeans', 'label': 'подсолнечник'},
    {'crop': 'lentil', 'label': 'соя'},
    {'crop': 'maize', 'label': 'картофель'},
    {'crop': 'mango', 'label': 'рапс'},
    {'crop': 'mothbeans', 'label': 'чечевица'},
    {'crop': 'mungbean', 'label': 'фасоль'},
    {'crop': 'muskmelon', 'label': 'горох'},
    {'crop': 'orange', 'label': 'рожь озимая'},
    {'crop': 'papaya', 'label': 'рожь яровая'},
    {'crop': 'pigeonpeas', 'label': 'дыни'},
    {'crop': 'pomegranate', 'label': 'клевер'},
    {'crop': 'rice', 'label': 'рис'},
    {'crop': 'watermelon', 'label': 'арбузы'}]


class HarvestRecomendationViewSet(viewsets.ViewSet):

    def create(self, request):
        data = request.data
        data = np.array([[data['N'], data['P'], data['K'],
                         data['temperature'], data['humidity'],
                         data['ph'], data['rainfall']]])
        prediction = get_prediction(data)
        response = []
        for i in range(prediction[0].size):
            response.append({'name': cropsDict[i]['label'], 'weight': prediction[0][i]})
        return Response(response, status=status.HTTP_200_OK)
