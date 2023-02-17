import os.path
import pathlib
from typing import Mapping

from fastai.learner import load_learner
from fastai.vision.core import PILImage

from components.neural_network.constants import PLANTS_PATH, tensors_name
from components.neural_network.enums import AgricultureDatasetEnum


class PlantDiseasesService:
    """Сервис для работы с болезнями растений"""

    def __init__(self):
        pathlib.PosixPath = pathlib.WindowsPath

    def calculate_diseases_probability(self,
                                       file: bytes,
                                       agriculture: AgricultureDatasetEnum) -> list[Mapping[str, float]]:
        img = PILImage.create(file)

        path = self.get_plant_dataset_path(agriculture)
        learn_inf = load_learner(path)

        learn_result = learn_inf.predict(img)
        result = []
        for index, tensor in enumerate(learn_result[2]):
            coincidence = float(tensor)
            tensor_name = tensors_name[agriculture][index]
            result.append({tensor_name: coincidence})

        return result

    @staticmethod
    def get_plant_dataset_path(plant_dataset_name: AgricultureDatasetEnum) -> str:
        return os.path.join(PLANTS_PATH, plant_dataset_name.value)
