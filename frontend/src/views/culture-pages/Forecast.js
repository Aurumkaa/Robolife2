import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { CardContent, CardHeader, Divider } from '@mui/material';
import openmeteoAPI from '../../clients/OpenMeteoForecastClient';
import setForecastDiagrammOptions from './options-forecast';
import { useSelector } from 'react-redux';

const Forecast = () => {
    const station = useSelector((state) => state.station);
    const [options, setOptions] = useState();
    useEffect(() => {
        openmeteoAPI.getForecastDataForChemicalTreatments(station.coordinates).then((response) => {
            setForecastDiagrammOptions(response, setOptions);
        });
    }, [station]);
    return (
        <MainCard title="Прогноз погоды" subheader="Данные получены из API open-meteo">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </MainCard>
    );
};

export default Forecast;
