import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MainCard from '../../ui-component/cards/MainCard';
import { CardContent, CardHeader, Divider } from '@mui/material';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import setForecastDiagrammOptions from './options-forecast';
import setHeatMapOptions from './options-heatmap';
import openmeteoAPI from '../../clients/OpenMeteoForecastClient';

HighchartsHeatmap(Highcharts);

async function getData() {
    let urll =
        'https://api.open-meteo.com/v1/forecast?latitude=45.27&longitude=39.79&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation_probability,precipitation,weathercode,windspeed_10m,windgusts_10m&models=best_match&current_weather=true&windspeed_unit=ms&forecast_days=4&timezone=auto';
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

    useEffect(() => {
        openmeteoAPI.getForecastDataForChemicalTreatments().then((response) => {
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
                } else if (
                    response.hourly.temperature_2m[i] >= 10 &&
                    response.hourly.temperature_2m[i] <= 25 &&
                    response.hourly.windgusts_10m[i] - 0.5 < 5 &&
                    response.hourly.precipitation[i] === 0
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
                        2
                    ]);
                } else if (
                    response.hourly.temperature_2m[i] + 2 >= 10 &&
                    response.hourly.temperature_2m[i] - 2 <= 25 &&
                    response.hourly.windgusts_10m[i] < 5 &&
                    response.hourly.precipitation[i] === 0
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
                        2
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
            setForecastDiagrammOptions(response, setOptions);
            setHeatMapOptions(b, setOptionsHeat);
        });
    }, []);

    const listItems = arr.map((el, i) => <li key={i}>{el.toLocaleString()}</li>);
    return (
        <MainCard title="Прогноз погоды" subheader="Данные получены из API open-meteo">
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div>
                <div style={{ marginTop: '30px' }}>
                    <CardHeader
                        title="Рекоммендации по обработке растений химическими препаратами"
                        subheader="Данные на основе прогноза погоды  open-meteo"
                    />
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
