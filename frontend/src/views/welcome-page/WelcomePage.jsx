import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { useSelector } from 'react-redux';
import { Card, Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import '../welcome-page/welcome.scss';

const WelcomePage = () => {
    const [lastParams, setLastParams] = useState();
    const station = useSelector((state) => state.station);

    useEffect(() => {
        if (window && document) {
            const script = document.createElement('script');
            const body = document.getElementsByClassName('map')[0];
            script.src =
                'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ab16bc1584a6b3b53cd98d6970e1f39fb575b9334ce21f2f7bad60a8a749fc7c5&amp;width=100%25&amp;height=500&amp;lang=ru_RU&amp;scroll=true';
            body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        fieldClimateAPI.getLastParams(station.id).then((response) => {
            setLastParams(response);
        });
    }, [station.id]);
    const theme = useTheme();

    return (
        <MainCard title={'Последние данные станции ' + station.name} subheader={'Данные обновлены ' + lastParams?.dates[0]}>
            <div>
                <Grid width="100%" container justifyContent={'space-between'} spacing={0.2}>
                    <Grid item>
                        <Card sx={{ width: 300 }}>
                            <div id="sas">
                                <Grid container direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                                    <Grid item>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-sun"
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="#ffec00"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="12" cy="12" r="4" />
                                            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                                        </svg>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item style={{ color: '#9d9d9d' }}>
                                                CОЛНЕЧНАЯ РАДИАЦИЯ
                                            </Grid>
                                            <Grid item fontSize="25px">
                                                {lastParams?.data[0].values.avg[0]} W/m2
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>
                    <Divider flexItem orientation="vertical" />
                    <Grid item>
                        <Card sx={{ width: 300 }}>
                            <div id="sas">
                                <Grid container direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                                    <Grid item>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-cloud-rain"
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#00abfb"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
                                            <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
                                        </svg>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item style={{ color: '#9d9d9d' }}>
                                                Осадки
                                            </Grid>
                                            <Grid item fontSize="25px">
                                                {lastParams?.data[1].values.sum[0]} mm
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>
                    <Divider flexItem orientation="vertical" />
                    <Grid item>
                        <Card sx={{ width: 300 }}>
                            <div id="sas">
                                <Grid container direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                                    <Grid item>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-battery-3"
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#6f32be"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M6 7h11a2 2 0 0 1 2 2v.5a0.5 .5 0 0 0 .5 .5a0.5 .5 0 0 1 .5 .5v3a0.5 .5 0 0 1 -.5 .5a0.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
                                            <line x1="7" y1="10" x2="7" y2="14" />
                                            <line x1="10" y1="10" x2="10" y2="14" />
                                            <line x1="13" y1="10" x2="13" y2="14" />
                                        </svg>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item style={{ color: '#9d9d9d' }}>
                                                Заряд АКБ
                                            </Grid>
                                            <Grid item fontSize="25px">
                                                {lastParams?.data[3].values.last[0]} mV
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>

                    <Grid item>
                        <Card sx={{ width: 300 }}>
                            <div id="sas">
                                <Grid container direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                                    <Grid item>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-droplet"
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#597e8d"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z" />
                                        </svg>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item style={{ color: '#9d9d9d' }}>
                                                Влажность воздуха
                                            </Grid>
                                            <Grid item fontSize="25px">
                                                {lastParams?.data[6].values.avg[0]} %
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>
                    <Divider flexItem orientation="vertical" />
                    <Grid item>
                        <Card sx={{ width: 300 }}>
                            <div id="sas">
                                <Grid container direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                                    <Grid item>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-temperature"
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#a905b6"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
                                            <line x1="10" y1="9" x2="14" y2="9" />
                                        </svg>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item style={{ color: '#9d9d9d' }}>
                                                Температура воздуха
                                            </Grid>
                                            <Grid item fontSize="25px">
                                                {lastParams?.data[5].values.avg[0]} °C
                                            </Grid>
                                            <Grid item>
                                                min - {lastParams?.data[5].values.min[0]}/max - {lastParams?.data[5].values.max[0]}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>
                    <Divider flexItem orientation="vertical" />
                    <Grid item>
                        <Card sx={{ width: 300 }}>
                            <div id="sas">
                                <Grid container direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                                    <Grid item>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-wind"
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#9e9e9e"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
                                            <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
                                            <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                                        </svg>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item style={{ color: '#9d9d9d' }}>
                                                Скорость ветра
                                            </Grid>
                                            <Grid item fontSize="25px">
                                                {lastParams?.data[2].values.avg[0]} m/s
                                            </Grid>
                                            <Grid item>max - {lastParams?.data[2].values.max[0]}</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <div className="map" style={{ height: '500px', marginTop: '30px' }}></div>
        </MainCard>
    );
};

export default WelcomePage;
