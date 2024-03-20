const FIELD_CLIMATE_API = {
    // Urls
    fieldClimateUrl: 'https://api.fieldclimate.com/v2',
    calculationUrl: '/calculation/',
    forecastUrl: '/forecast/',
    // Api tokens
    publicKey: 'ba9c8f7415885c20da4ab8e7cd46bf2de6a49b8c1e320dea',
    privateKey: '9e9f3139bbe88c1a47475225b5991713bb1c4e8fc7a49c8f'
};

const ROBOLIFE2_BACKEND_API = {
    base_url: 'http://localhost:8000', // При локальном запуске - http://localhost:8000/, docker - http://localhost
    weather_metrics_url: '/api/metrics/q/',
    soil_moisture_url: '/api/metrics/q/soil-moisture/',
    comments_url: '/api/comments/',
    notification_url: '/api/notifications/',
    authorization_url: '/api/accounts/authorization/',
    registration_url: '/api/accounts/register/',
    agriculture_url: '/api/agriculture/',
    neural_network_url: '/api/neural-network/check-plant-diseases/c/',
    admin_panel_url: '/admin',
    harvest_recommendation: '/api/agriculture/harvest_recommendations/'
};

const CHART_PARAMETERS_ENUM = {
    countPrecipitation: 'Количество осадков',
    averageTemperature: 'Средняя температура воздуха',
    maxTemperature: 'Максимальная температура воздуха',
    minTemperature: 'Минимальная температура воздуха',
    averageWindSpeed: 'Средння скорость ветра',
    maxWindSpeed: 'Максимальная скорость ветра',
    increaseCountPrecipitation: 'Нарастающее количество осадков',
    degreesHours: 'Градусо-часы',
    degreesDays: 'Градусо-дни',
    degreesDaysUsa: 'Градусо-дни (мин+макс)/2',
    battery: 'Заряд АКБ',
    solarRadiation: 'Солнечная радиация',
    humidity: 'Влажность листа',

    historyTemperatureMax: 'Максимальная температура воздуха',
    historyTemperatureMin: 'Минимальная температура воздуха',
    historyTemperatureMaxNormal: 'Норма максимальной температуры',
    historyTemperatureMinNormal: 'Норма минимальной температуры',
    precipitationSum: 'Сумма осадков',
    precipitationSumNormal: 'Норма суммы осадков',
    windRose: 'Роза ветров',
    soilMoisture10cm: 'Влажность почвы(h=10сm)',
    soilMoisture20cm: 'Влажность почвы(h=20сm)',
    soilMoisture100cm: 'Влажность почвы(h=100сm)'
};

const PARAMS_CONVERT = {
    'Precipitation Sum': 'Сумма осадков'
};

const DATA_FREQUENCY_CONVERT = {
    hourly: 'hour',
    daily: 'day',
    monthly: 'month'
};

const CULTURE_NAME = {
    Corn: 'Кукуруза',
    Soy: 'Соя',
    Wheat: 'Пшеница',
    Sunflower: 'Подсолнечник'
};

const DISEASES_NAME = {
    healthy: 'Здоровый',
    cercospora: 'Церкоспора',
    common_rust: 'Обыкновенная ржавчина',
    northern_leaf_blight: 'Северная пятнистость листьев',
    downy_mildew: 'Ложная мучнистая роса',
    gray_mold: 'Серая плесень',
    leaf_scars: 'Листовые шрамы',
    septoria: 'септориоз',
    stripe_rust: 'полоса ржавчины'
};

const ACCEPTABLE_CHEMICAL_TREATMENT_DEVIATIONS = {
    temperature: 2,
    wingusts: 0.1
};
const IDEAL_CONDITIONS_CHEMICAL_TREATMENT = {
    temperature_min: 10,
    temperature_max: 25,
    humidity_min: 70,
    humidity_max: 80,
    wingusts_max: 5,
    precipitation_max: 0
};

export {
    FIELD_CLIMATE_API,
    ROBOLIFE2_BACKEND_API,
    CHART_PARAMETERS_ENUM,
    DATA_FREQUENCY_CONVERT,
    PARAMS_CONVERT,
    CULTURE_NAME,
    DISEASES_NAME,
    ACCEPTABLE_CHEMICAL_TREATMENT_DEVIATIONS,
    IDEAL_CONDITIONS_CHEMICAL_TREATMENT
};
