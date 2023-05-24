import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MainCard from '../../ui-component/cards/MainCard';
import { CardContent, CardHeader, Divider } from '@mui/material';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import setForecastDiagrammOptions from './options-forecast';
import setHeatMapOptions from './options-heatmap';
import openmeteoAPI from '../../clients/OpenMeteoForecastClient';
import { useSelector } from 'react-redux';

HighchartsHeatmap(Highcharts);

const ChemicalTreatments = () => {
    const station = useSelector((state) => state.station);
    const [forecastData, setForecastData] = useState('');
    const [chartData, setChartData] = useState([]);
    const [options, setOptions] = useState();
    const [optionsHeat, setOptionsHeat] = useState();
    const [tableData, setTableData] = useState([]);
    const [reccomendation, setReccomendation] = useState([]);
    const [arr, setArr] = useState([]);
    const [arrB, setArrB] = useState([]);

    useEffect(() => {
        openmeteoAPI.getForecastDataForChemicalTreatments(station.coordinates).then((response) => {
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
            setArr(a);
            setArrB(b);

            setForecastDiagrammOptions(response, setOptions);
            setHeatMapOptions(b, setOptionsHeat);
        });
    }, [station.id]);

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
