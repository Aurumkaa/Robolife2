import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MainCard from '../../ui-component/cards/MainCard';
import { CardContent, CardHeader, Divider } from '@mui/material';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import moment from 'moment';

HighchartsHeatmap(Highcharts);

async function getData() {
    let urll =
        'https://api.open-meteo.com/v1/forecast?latitude=45.27&longitude=39.79&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation_probability,precipitation,weathercode,windspeed_10m,windgusts_10m&models=best_match&current_weather=true&windspeed_unit=ms&forecast_days=4';
    return await fetch(urll)
        .then((data) => {
            return data.json();
        })
        .then((resp) => {
            return resp;
        })
        .catch((error) => console.log(error));
}

const ChemicalTreatments = () => {
    const [forecastData, setForecastData] = useState('');
    const [chartData, setChartData] = useState([]);
    const [options, setOptions] = useState();
    const [optionsHeat, setOptionsHeat] = useState();
    const [tableData, setTableData] = useState([]);
    const [reccomendation, setReccomendation] = useState([]);
    const [arr, setArr] = useState([]);
    const [arrB, setArrB] = useState([]);

    const setForecastDiagrammOptions = (response) => {
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
                tickInterval: 24
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

    const AddDay = (d, cnt) => {
        var date = new Date(d);
        date.setDate(date.getDate() + cnt);
        return date;
    };

    function getPointCategoryName(point, dimension) {
        var series = point.series,
            isY = dimension === 'y',
            axis = series[isY ? 'yAxis' : 'xAxis'];
        return axis.categories[point[isY ? 'y' : 'x']];
    }

    const getResultCategory = (x) => {
        if (x == 0) {
            return ' ожидаются <br> <b>неблагоприятные</b> условия';
        }
        return ' ожидаются <br> <b>оптимальные</b> условия';
    };

    const setHeatMapOptions = (arr) => {
        setOptionsHeat({
            credits: {
                enabled: false
            },
            chart: {
                scrollablePlotArea: {
                    minWidth: 800
                },
                type: 'heatmap',
                marginBottom: 80,
                plotBorderWidth: 1,
                height: 260
                // marginLeft: 90
            },

            title: {
                text: ''
            },

            xAxis: {
                categories: [
                    '00:00',
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00',
                    '22:00',
                    '23:00'
                ]
            },

            yAxis: {
                offset: 10,
                categories: [
                    moment(new Date()).format('DD.MM'),
                    moment(AddDay(new Date(), 1)).format('DD.MM'),
                    moment(AddDay(new Date(), 2)).format('DD.MM'),
                    moment(AddDay(new Date(), 3)).format('DD.MM')
                ],
                title: null,
                reversed: true
            },

            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            xName = getPointCategoryName(point, 'x'),
                            yName = getPointCategoryName(point, 'y'),
                            val = point.value;
                        return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
                    }
                }
            },

            colorAxis: {
                dataClasses: [
                    {
                        from: 0,
                        to: 0.5,
                        name: 'Неблагоприятные часы',
                        color: 'rgba(171,171,171,0.37)'
                    },
                    {
                        from: 0.5,
                        to: 1,
                        name: 'Благоприятные часы',
                        color: '#6cc459'
                    }
                ]
            },

            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
                margin: 0,
                y: 25,
                symbolHeight: 10
            },

            tooltip: {
                formatter: function () {
                    return (
                        '<b>' +
                        getPointCategoryName(this.point, 'y') +
                        '</b> в <b>' +
                        getPointCategoryName(this.point, 'x') +
                        '</b>' +
                        getResultCategory(this.point.value) +
                        '<br><b>' +
                        '</b>для химических обработок'
                    );
                }
            },

            series: [
                {
                    borderRadius: 5,
                    pointPadding: 5,
                    name: 'Sales per employee',
                    data: arr,
                    dataLabels: {
                        // enabled: true,
                        // color: '#000000'
                    }
                }
            ],

            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            yAxis: {
                                labels: {
                                    formatter: function () {
                                        return this.value.charAt(0);
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        });
    };

    useEffect(() => {
        getData().then((response) => {
            var a = [];
            var b = [];
            response.hourly.time.forEach((date, i) => {
                if (
                    response.hourly.temperature_2m[i] >= 10 &&
                    response.hourly.temperature_2m[i] <= 25 &&
                    response.hourly.windgusts_10m[i] < 5 &&
                    response.hourly.precipitation[i] === 0 &&
                    response.hourly.relativehumidity_2m[i] >= 70 &&
                    response.hourly.relativehumidity_2m[i] <= 80
                ) {
                    a.push({
                        date: new Date(response.hourly.time[i]),
                        temperature: response.hourly.temperature_2m[i],
                        windgusts: response.hourly.windgusts_10m[i],
                        precipitation: response.hourly.precipitation[i],
                        relativehumidity_2m: response.hourly.relativehumidity_2m[i]
                    });
                    b.push([
                        new Date(response.hourly.time[i]).getHours(),
                        new Date(response.hourly.time[i]).getDate() - new Date().getDate(),
                        1
                    ]);
                } else {
                    b.push([
                        new Date(response.hourly.time[i]).getHours(),
                        new Date(response.hourly.time[i]).getDate() - new Date().getDate(),
                        0
                    ]);
                }
            });
            console.log(b);
            setArr(a);
            setArrB(b);
            setForecastDiagrammOptions(response);
            setHeatMapOptions(b);
        });
    }, []);

    const listItems = arr.map((el, i) => <li key={i}>{el.toLocaleString()}</li>);
    return (
        <MainCard title="Прогноз погоды" subheader="Данные получены из API open-meteo">
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div>
                <div style={{ marginTop: '30px' }}>
                    <CardHeader title="Рекоммендации по обработке растений" subheader="Данные на основе прогноза погоды  open-meteo" />
                    <Divider />
                    <CardContent>
                        <HighchartsReact highcharts={Highcharts} options={optionsHeat} />
                    </CardContent>
                </div>
            </div>
        </MainCard>
    );
};

export default ChemicalTreatments;
