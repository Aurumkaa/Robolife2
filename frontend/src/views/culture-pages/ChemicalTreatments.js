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
import { ACCEPTABLE_CHEMICAL_TREATMENT_DEVIATIONS, IDEAL_CONDITIONS_CHEMICAL_TREATMENT } from '../../constants/Constants';

HighchartsHeatmap(Highcharts);
function datediff(first, second) {
    first.setHours(0, 0, 0);
    second.setHours(0, 0, 0);
    return Math.ceil((Date.parse(first) - Date.parse(second)) / (1000 * 60 * 60 * 24));
}

function IsNormal(temperature_2m, windgusts_10m, precipitation, relativehumidity_2m = IDEAL_CONDITIONS_CHEMICAL_TREATMENT.humidity_min) {
    if (
        temperature_2m >= IDEAL_CONDITIONS_CHEMICAL_TREATMENT.temperature_min &&
        temperature_2m <= IDEAL_CONDITIONS_CHEMICAL_TREATMENT.temperature_max &&
        windgusts_10m < IDEAL_CONDITIONS_CHEMICAL_TREATMENT.wingusts_max &&
        precipitation <= IDEAL_CONDITIONS_CHEMICAL_TREATMENT.precipitation_max &&
        relativehumidity_2m >= IDEAL_CONDITIONS_CHEMICAL_TREATMENT.humidity_min &&
        relativehumidity_2m <= IDEAL_CONDITIONS_CHEMICAL_TREATMENT.humidity_max
    ) {
        return true;
    }
    return false;
}

function pushArrAB(a, b, response, i, date, status) {
    a.push({
        date: new Date(response.hourly.time[i]),
        temperature: response.hourly.temperature_2m[i],
        windgusts: response.hourly.windgusts_10m[i],
        precipitation: response.hourly.precipitation[i],
        relativehumidity_2m: response.hourly.relativehumidity_2m[i]
    });
    b.push([new Date(date).getHours(), datediff(new Date(response.hourly.time[i]), new Date()), status]);
}

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
                    IsNormal(
                        response.hourly.temperature_2m[i],
                        response.hourly.windgusts_10m[i],
                        response.hourly.precipitation[i],
                        response.hourly.relativehumidity_2m[i]
                    )
                ) {
                    pushArrAB(a, b, response, i, date, 1);
                } else if (
                    IsNormal(response.hourly.temperature_2m[i], response.hourly.windgusts_10m[i], response.hourly.precipitation[i]) ||
                    IsNormal(
                        response.hourly.temperature_2m[i] + ACCEPTABLE_CHEMICAL_TREATMENT_DEVIATIONS.temperature,
                        response.hourly.windgusts_10m[i],
                        response.hourly.precipitation[i],
                        response.hourly.relativehumidity_2m[i]
                    ) ||
                    IsNormal(
                        response.hourly.temperature_2m[i] - ACCEPTABLE_CHEMICAL_TREATMENT_DEVIATIONS.temperature,
                        response.hourly.windgusts_10m[i],
                        response.hourly.precipitation[i],
                        response.hourly.relativehumidity_2m[i]
                    ) ||
                    IsNormal(
                        response.hourly.temperature_2m[i],
                        response.hourly.windgusts_10m[i] - ACCEPTABLE_CHEMICAL_TREATMENT_DEVIATIONS.wingusts,
                        response.hourly.precipitation[i],
                        response.hourly.relativehumidity_2m[i]
                    )
                ) {
                    pushArrAB(a, b, response, i, date, 2);
                } else {
                    b.push([new Date(response.hourly.time[i]).getHours(), datediff(new Date(response.hourly.time[i]), new Date()), 0]);
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
                        title="Рекоммендации по времени проведения обработки растений химическими препаратами"
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
