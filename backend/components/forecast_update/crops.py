import enum


class SugarBeet():
    name = 'Сахарная свёкла'

    recommendations = enum.Enum(
        value='SugarBeetRecommendationsEnum', 
        names=[
            ('NOT_ENOUGH_SUNLIGHT', 'Не хватает солнечного света для роста'), 
            ('EXTREMELY_NOT_ENOUGH_SUNLIGHT', 'Крайне не хватает солнечного света для роста'), 
            ('ENOUGH_SUNLIGHT', 'Достаточное количество солнечного света для роста'), 
            ('OVERHEATING_RISK_EXCESSIVE_EVAPORATION', 'Риск перегрева и избыточное испарение влаги'), 
            ('EXTREMELY_OVERHEATING_RISK_SUNBURN', 'Крайне высокий риск перегрева и солнечного ожога'), 
            ('SEEDS_GOOD_TEMPERATURE', 'Хорошая температура для прорастания семян'), 
            ('FRUIT_GOOD_TEMPERATURE', 'Хорошая температура для прорастания плода'), 
            ('SEEDS_FRUIT_GOOD_TEMPERATURE', 'Хорошая температура для прорастания семян и плода'), 
            ('SEEDS_LOW_TEMPERATURE_FREEZING', 'Низкая температура. Риск замерзания семян'), 
            ('FRUIT_LOW_TEMPERATURE_FREEZING', 'Низкая температура. Риск замерзания плода'), 
            ('SEEDS_FRUIT_LOW_TEMPERATURE_FREEZING', 'Низкая температура. Риск замерзания семян и плода'), 
            ('SEEDS_EXTREMELY_LOW_TEMPERATURE_FREEZING_DEATH', 'Крайне низкая температура. Высокий риск замерзания и гибели семян'), 
            ('FRUIT_EXTREMELY_LOW_TEMPERATURE_FREEZING_DEATH', 'Крайне низкая температура. Высокий риск замерзания и гибели плода'), 
            ('SEEDS_FRUIT_EXTREMELY_LOW_TEMPERATURE_FREEZING_DEATH', 'Крайне низкая температура. Высокий риск замерзания и гибели семян и плода'), 
            ('SEEDS_HIGH_TEMPERATURE_DRYING_RISK', 'Высокая температура. Риск засыхания семян'), 
            ('FRUIT_HIGH_TEMPERATURE_DRYING_RISK', 'Высокая температура. Риск засыхания плода'), 
            ('SEEDS_FRUIT_HIGH_TEMPERATURE_DRYING_RISK', 'Высокая температура. Риск засыхания семян и плода'), 
            ('SEEDS_EXTREMELY_HIGH_TEMPERATURE_DRYING_DEATH_HIGH_RISK', 'Крайне высокая температура. Высокий риск засыхания и гибели семян'), 
            ('FRUIT_EXTREMELY_HIGH_TEMPERATURE_DRYING_DEATH_HIGH_RISK', 'Крайне высокая температура. Высокий риск засыхания и гибели плода'), 
            ('SEEDS_FRUIT_EXTREMELY_HIGH_TEMPERATURE_DRYING_DEATH_HIGH_RISK', 'Крайне высокая температура. Высокий риск засыхания и гибели семян и плода'), 
            ('DROUGHT_RISK_HYDRATION_NEDEED', 'Риск засухи. Необходимо увлажнение почвы'), 
            ('DROUGHT_HIGH_RISK_ABUNDANT_HYDRATION_NEDEED', 'Высокий риск засухи. Необходимо обильное увлажнение почвы'), 
            ('DROUGHT_DEATH_HIGH_RISK_URGENT_HYDRATION_NEDEED', 'Высокий риск засухи и гибели сахарной свёклы. Срочно необходимо увлажнение почвы'), 
            ('GOOD_WIND_SPEED', 'Хорошая скорость ветра'), 
            ('EXCELLENT_WIND_SPEED', 'Отличная скорость ветра'), 
            ('STRONG_WIND_MECHANICAL_DAMAGE_POSSIBLE', 'Сильный ветер. Возможны механические повреждения'), 
            ('HURRICANE_WIND_CULTURE_DAMAGE', 'Ураганный ветер. Повреждение культуры'), 
            ('NORMAL_AIR_HUMIDITY', 'Влажность воздуха в пределах нормы'), 
            ('LOW_AIR_HUMIDITY_DROUGHT', 'Низкая влажность воздуха. Засуха'), 
            ('HIGH_AIR_HUMIDITY_FUNGAL_DISEASES_RISK', 'Высокая влажность воздуха. Риск появления грибковых заболеваний'), 
        ]
    )

    recommendation_got = False
