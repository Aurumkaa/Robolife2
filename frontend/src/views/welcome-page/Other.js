import React, { useEffect, useState } from 'react';
import { CardContent, CardHeader, Divider, Typography } from '@mui/material';
import OtherCard from './OtherCard';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import { useSelector } from 'react-redux';

const Other = () => {
    const station = useSelector((state) => state.station);
    const [lastDataHumidity, setLastDataHumidity] = useState([]);
    const [resultHumidity, setResultHumidity] = useState({ status: false, fact: 0, min: 0 });

    const AddDay = (d, cnt) => {
        var dat = new Date(d);
        dat.setDate(dat.getDate() + cnt);
        return dat;
    };

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(AddDay(new Date(), -3).getTime() / 1000), Math.round(new Date().getTime() / 1000))
            .then((response) => {
                setLastDataHumidity(getChartData(response.data.length ? { humidity: response.data[4].values.time } : {}, response.dates));
            });
    }, [station.id]);

    useEffect(() => {
        calcResHumidity(lastDataHumidity);
    }, [lastDataHumidity]);

    const calcResHumidity = (lastData) => {
        console.log('last data', lastData);
        const sumHumidity = lastData?.reduce((s, o) => s + o.humidity, 0);
        const date = new Date();
        const minutes = date.getHours() * 60 + date.getMinutes() + 1440 * 2;
        if (minutes * 0.8 < sumHumidity) {
            setResultHumidity({ fact: Number(sumHumidity), status: true, min: Number(minutes) });
        } else setResultHumidity({ fact: Number(sumHumidity), status: false, min: Number(minutes) });
    };

    // lastDataHumidity.length !== 0 ? calcResHumidity(lastDataHumidity) : null;

    return (
        <div style={{ marginTop: '30px' }}>
            <CardHeader title="Другое" />
            <Divider />
            <CardContent>
                <Typography></Typography>
                <OtherCard type="humidity" result={resultHumidity} lastData={lastDataHumidity} color={'#84c184'} />
            </CardContent>
        </div>
    );
};

export default Other;
