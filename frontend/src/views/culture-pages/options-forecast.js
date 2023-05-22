const setForecastDiagrammOptions = (response, setOptions) => {
    setOptions({
        chart: {
            scrollablePlotArea: {
                minWidth: 900
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            categories: response.hourly.time.map((val) => new Date(val).toLocaleString()),
            tickInterval: 24,
            plotLines: [
                {
                    color: '#FF0000',
                    width: 2,
                    value: (new Date().getTime() - new Date(response.hourly.time[0]).getTime()) / 60000 / 60
                }
            ]
        },
        tooltip: {
            shared: true,
            crosshairs: true
        },
        yAxis: [
            {
                gridLineWidth: 1,
                title: {
                    text: 'mm'
                }
            },
            {
                title: {
                    text: 'C'
                }
            },
            {
                title: {
                    text: 'm/s'
                }
            },
            {
                title: {
                    text: '%'
                }
            }
        ],
        series: [
            {
                name: 'Температура',
                data: response.hourly.temperature_2m,
                yAxis: 1,
                tooltip: {
                    valueSuffix: ' C'
                }
            },
            {
                name: 'Cкорость ветра',
                data: response.hourly.windspeed_10m,
                yAxis: 2,
                tooltip: {
                    valueSuffix: ' m/s'
                }
            },
            {
                name: 'Порывы ветра',
                data: response.hourly.windgusts_10m,
                yAxis: 2,
                tooltip: {
                    valueSuffix: ' m/s'
                }
            },
            {
                name: 'Относительная влажность',
                yAxis: 3,
                data: response.hourly.relativehumidity_2m,
                tooltip: {
                    valueSuffix: ' %'
                }
            },
            {
                name: 'Вероятность осадков',
                yAxis: 3,
                data: response.hourly.precipitation_probability,
                tooltip: {
                    valueSuffix: ' %'
                }
            },
            {
                name: 'Точка росы',
                yAxis: 1,
                data: response.hourly.dewpoint_2m,
                tooltip: {
                    valueSuffix: ' С'
                }
            },

            {
                name: 'Осадки',
                yAxis: 0,
                type: 'column',
                data: response.hourly.precipitation,
                tooltip: {
                    valueSuffix: ' mm'
                }
            }
        ]
    });
};

export default setForecastDiagrammOptions;
