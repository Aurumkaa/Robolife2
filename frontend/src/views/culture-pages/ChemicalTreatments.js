import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MainCard from '../../ui-component/cards/MainCard';
import { CardContent, CardHeader, Divider, Typography } from '@mui/material';

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
    const [tableData, setTableData] = useState([]);
    const [reccomendation, setReccomendation] = useState([]);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        getData().then((response) => {
            var a = [];
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
                        relativehumidity_2m: response.hourly.relativehumidity_[i]
                    });
                }
            });
            console.log(a);
            setArr(a);
            setOptions({
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
        });
    }, []);

    const listItems = arr.map((el) => <li>{el.toLocaleString()}</li>);
    return (
        <MainCard title="Прогноз погоды" subheader="Данные получены из API open-meteo">
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div>
                <div style={{ marginTop: '30px' }}>
                    <CardHeader title="Рекоммендации по обработке растений" />
                    <Divider />
                    <CardContent>
                        <ul>{listItems}</ul>;
                    </CardContent>
                </div>
            </div>
        </MainCard>
    );
};

export default ChemicalTreatments;
