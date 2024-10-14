from components.forecast_update.crops import SugarBeet
from datetime import datetime


# https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
weathercodes = [
	0,  # Sunny (day), Clear (night)
	1,  # Mainly Sunny, Mainly Clear
	2,  # Partly Cloudy (day and night)
	3,  # Cloudy
	45,  # Foggy
	51,  # Light Drizzle
	53,  # Drizzle
	55,  # Heavy Drizzle
	61,  # Light Rain
	63,  # Rain
	65,  # Heavy Rain
	71,  # Light Snow
	73,  # Snow
	75,  # Heavy Snow
]

weekdays_names = [
	'в Понедельник', 
	'во Вторник', 
	'в Среду', 
	'в Четверг',
	'в Пятницу', 
	'в Субботу', 
	'в Воскресенье'
]

next_weekdays_names_from_current = None

forecast_data = None
crops_recommendations = []


def get_next_weekdays_names_from_current():
	current_weekday_index = datetime.now().weekday()
	next_weekday_index = 0
	
	if current_weekday_index < 6:
		next_weekday_index = current_weekday_index + 1

	next_weekdays_names_from_current = []
	next_weekdays_names_from_current.append(weekdays_names[current_weekday_index])
	
	while next_weekday_index != 7 and len(next_weekdays_names_from_current) < 7:
		next_weekdays_names_from_current.append(weekdays_names[next_weekday_index])

		if next_weekday_index >= 6:
			next_weekday_index = 0
		else:
			next_weekday_index += 1

	return next_weekdays_names_from_current


def weather_predict():
	global forecast_data
	weathercode_weekly = []

	SugarBeet.recommendation_got = False

	sunny_days_streak = 0
	cold_days_streak = 0

	for day in range(1, 8):
		weathercode_daily = forecast_data['weathercode'][(day * 24) - 24:day * 24]  # Отсекаем предыдущий день и получаем текущий
		weathercode_daily_count = []
		
		for code in weathercodes:
			# Считаем количество вхождений каждого погодного кода за текущий день
			weathercode_daily_count.append(weathercode_daily.count(code))

		# Получаем наиболее часто встречающийся из них и формируем недельную сводку
		most_frequent_weathercode_daily = weathercodes[weathercode_daily_count.index(max(weathercode_daily_count))]
		weathercode_weekly.append(most_frequent_weathercode_daily)

	# Формируем рекомендации, исходя из соответствующих строк базы знаний в виде Excel-таблицы
	for day_index, code_daily in enumerate(weathercode_weekly):
		day_name = next_weekdays_names_from_current[day_index]

		if code_daily in [45, 51, 53, 55, 61, 63, 65, 71, 73, 75]:
			cold_days_streak += 1

			if sunny_days_streak == 5:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.OVERHEATING_RISK_EXCESSIVE_EVAPORATION.value, day_name)
			sunny_days_streak = 0

			if day_index == 6 and cold_days_streak == 3:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.NOT_ENOUGH_SUNLIGHT.value, day_name, continue_recommendations=False)
			elif cold_days_streak == 5:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.EXTREMELY_NOT_ENOUGH_SUNLIGHT.value, day_name)
		elif code_daily in [0, 1, 2, 3]:
			if cold_days_streak == 3:
				previous_day_name = next_weekdays_names_from_current[day_index - 1]
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.NOT_ENOUGH_SUNLIGHT.value, previous_day_name)
			cold_days_streak = 0

			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.ENOUGH_SUNLIGHT.value, day_name)

			if code_daily in [0, 1]:
				sunny_days_streak += 1

				if day_index == 6 and sunny_days_streak == 5:
					add_crop_recommendation(SugarBeet, SugarBeet.recommendations.OVERHEATING_RISK_EXCESSIVE_EVAPORATION.value, day_name, continue_recommendations=False)
				elif sunny_days_streak == 7:
					add_crop_recommendation(SugarBeet, SugarBeet.recommendations.EXTREMELY_OVERHEATING_RISK_SUNBURN.value, day_name, continue_recommendations=False)
			elif code_daily in [2, 3]:
				if sunny_days_streak == 5:
					add_crop_recommendation(SugarBeet, SugarBeet.recommendations.OVERHEATING_RISK_EXCESSIVE_EVAPORATION.value, day_name)
				sunny_days_streak = 0


def temperature_predict():
	global forecast_data
	temperature_weekly = []

	SugarBeet.recommendation_got = False

	for day in range(1, 8):
		temperature_daily = forecast_data['temperature_2m'][(day * 24) - 24:day * 24]
		temperature_daily_average = 0.0
		
		for value in temperature_daily:
			temperature_daily_average += value
		temperature_daily_average /= 24

		temperature_weekly.append(temperature_daily_average)

	for day_index, temp_daily_avg in enumerate(temperature_weekly):
		day_name = next_weekdays_names_from_current[day_index]

		if 10 <= temp_daily_avg <= 20:
			if 15 <= temp_daily_avg <= 25:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_FRUIT_GOOD_TEMPERATURE.value, day_name)
			else:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_GOOD_TEMPERATURE.value, day_name)
		else:
			if 15 <= temp_daily_avg <= 25:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.FRUIT_GOOD_TEMPERATURE.value, day_name)

		if 5 <= temp_daily_avg < 10:
			if 10 <= temp_daily_avg < 15:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_FRUIT_LOW_TEMPERATURE_FREEZING.value, day_name)
			else:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_LOW_TEMPERATURE_FREEZING.value, day_name)
		else:
			if 10 <= temp_daily_avg < 15:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.FRUIT_LOW_TEMPERATURE_FREEZING.value, day_name)

		if temp_daily_avg < 5:
			if temp_daily_avg < 10:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_FRUIT_EXTREMELY_LOW_TEMPERATURE_FREEZING_DEATH.value, day_name)
			else:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_EXTREMELY_LOW_TEMPERATURE_FREEZING_DEATH.value, day_name)
		else:
			if temp_daily_avg < 10:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.FRUIT_EXTREMELY_LOW_TEMPERATURE_FREEZING_DEATH.value, day_name)

		if 20 < temp_daily_avg < 25:
			if 25 < temp_daily_avg < 30:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_FRUIT_HIGH_TEMPERATURE_DRYING_RISK.value, day_name)
			else:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_HIGH_TEMPERATURE_DRYING_RISK.value, day_name)
		else:
			if 25 < temp_daily_avg < 30:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.FRUIT_HIGH_TEMPERATURE_DRYING_RISK.value, day_name)

		if temp_daily_avg >= 25:
			if temp_daily_avg >= 30:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_FRUIT_EXTREMELY_HIGH_TEMPERATURE_DRYING_DEATH_HIGH_RISK.value, day_name)
			else:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.SEEDS_EXTREMELY_HIGH_TEMPERATURE_DRYING_DEATH_HIGH_RISK.value, day_name)
		else:
			if temp_daily_avg >= 30:
				add_crop_recommendation(SugarBeet, SugarBeet.recommendations.FRUIT_EXTREMELY_HIGH_TEMPERATURE_DRYING_DEATH_HIGH_RISK.value, day_name)


def precipitation_predict():
	global forecast_data

	precipitation_weekly = []
	precipitation_weekly_total = 0.0

	SugarBeet.recommendation_got = False

	for day in range(1, 8):
		precipitation_daily = forecast_data['precipitation'][(day * 24) - 24:day * 24]
		precipitation_daily_total = 0.0
		
		for value in precipitation_daily:
			precipitation_daily_total += value

		precipitation_weekly.append(precipitation_daily_total)

	for day_index, prec_daily_total in enumerate(precipitation_weekly):
		day_name = next_weekdays_names_from_current[day_index]
		precipitation_weekly_total += prec_daily_total

		if day_index == 6 and precipitation_weekly_total == 0:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.DROUGHT_RISK_HYDRATION_NEDEED.value, day_name)


def windspeed_predict():
	global forecast_data
	windspeed_weekly = []

	SugarBeet.recommendation_got = False

	for day in range(1, 8):
		windspeed_daily = forecast_data['windspeed_10m'][(day * 24) - 24:day * 24]
		windspeed_daily_average = 0.0
		
		for value in windspeed_daily:
			windspeed_daily_average += value
		windspeed_daily_average /= 24

		windspeed_weekly.append(windspeed_daily_average)

	for day_index, wind_daily_avg in enumerate(windspeed_weekly):
		day_name = next_weekdays_names_from_current[day_index]

		if 0 <= wind_daily_avg < 2:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.GOOD_WIND_SPEED.value, day_name)
		if 2 <= wind_daily_avg < 6:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.EXCELLENT_WIND_SPEED.value, day_name)
		if 6 <= wind_daily_avg <= 10:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.STRONG_WIND_MECHANICAL_DAMAGE_POSSIBLE.value, day_name)
		if wind_daily_avg > 10:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.HURRICANE_WIND_CULTURE_DAMAGE.value, day_name)


def air_humidity_predict():
	global forecast_data
	relative_humidity_weekly = []

	SugarBeet.recommendation_got = False

	for day in range(1, 8):
		relative_humidity_daily = forecast_data['relativehumidity_2m'][(day * 24) - 24:day * 24]
		relative_humidity_daily_average = 0.0
		
		for value in relative_humidity_daily:
			relative_humidity_daily_average += value
		relative_humidity_daily_average /= 24

		relative_humidity_weekly.append(relative_humidity_daily_average)

	for day_index, humidity_daily_avg in enumerate(relative_humidity_weekly):
		day_name = next_weekdays_names_from_current[day_index]

		if 60 <= humidity_daily_avg <= 80:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.NORMAL_AIR_HUMIDITY.value, day_name)
		if humidity_daily_avg < 60:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.LOW_AIR_HUMIDITY_DROUGHT.value, day_name)
		if humidity_daily_avg > 80:
			add_crop_recommendation(SugarBeet, SugarBeet.recommendations.HIGH_AIR_HUMIDITY_FUNGAL_DISEASES_RISK.value, day_name)


def add_crop_recommendation(crop_class, recommendation_text, recommendation_day, continue_recommendations=True):
	if not crop_class.recommendation_got:
		crop_class.recommendation_got = False if continue_recommendations else True

		global crops_recommendations
		return crops_recommendations.append(
			{
				'crop_name': crop_class.name, 
				'receipt_date': f'{datetime.now().strftime("%d/%m/%Y, %I:%M:%S %p")}', 
				'text': recommendation_text, 
				'day': recommendation_day, 
			}, 
		)


def get_crops_recommendations(forecast):
	global next_weekdays_names_from_current, crops_recommendations, forecast_data
	crops_recommendations.clear()

	forecast_data = forecast
	next_weekdays_names_from_current = get_next_weekdays_names_from_current()

	weather_predict()
	temperature_predict()
	precipitation_predict()
	windspeed_predict()
	air_humidity_predict()

	return crops_recommendations
