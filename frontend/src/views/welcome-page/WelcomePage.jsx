import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { useSelector } from 'react-redux';
import { CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import '../welcome-page/welcome.scss';
import TotalIncomeLightCard from '../dashboard/Default/TotalIncomeLightCard';
import axios from 'axios';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import OtherCard from './OtherCard';
import Other from './Other';
import { client } from '../../utils/axiosClient';

const WelcomePage = () => {
    const [lastParams, setLastParams] = useState();
    const station = useSelector((state) => state.station);
    const [deviation, setDeviation] = useState({
        temperature: false,
        wind: false,
        humidity: false,
        charge: false,
        solar_radiation: false,
        prec: false
    });

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
            axios
                .get(ROBOLIFE2_BACKEND_API.base_url + '/api/accounts/settings_deviation/q/' + `?user=${localStorage.getItem('id')}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                })
                .then(({ data }) => {
                    console.log({ data });
                    SettingsParamDeviation(data, setDeviation, response);
                });
        });
    }, [station?.id]);

    const SettingsParamDeviation = (data, setDeviation, response) => {
        var temperature = data?.find(({ param_type }) => param_type === 'temperature');
        var wind = data?.find(({ param_type }) => param_type === 'wind');
        var charge = data?.find(({ param_type }) => param_type === 'charge');
        var solar_radiation = data?.find(({ param_type }) => param_type === 'solar_radiation');
        var humidity = data?.find(({ param_type }) => param_type === 'humidity');
        var precipitation = data?.find(({ param_type }) => param_type === 'precipitation');

        setDeviation({
            temperature: false,
            wind: false,
            humidity: false,
            charge: false,
            solar_radiation: false,
            prec: false
        });

        if (
            (temperature?.min && temperature?.min > response.data[5].values.avg[0]) ||
            (temperature?.max && temperature?.max < response.data[5].values.avg[0])
        ) {
            setDeviation((prevState) => {
                return {
                    ...prevState,
                    temperature: true
                };
            });
        }
        if (
            (solar_radiation?.min && solar_radiation?.min > response.data[0].values.avg[0]) ||
            (solar_radiation?.max && solar_radiation?.max < response.data[0].values.avg[0])
        ) {
            setDeviation((prevState) => {
                return {
                    ...prevState,
                    solar_radiation: true
                };
            });
        }
        if (
            (precipitation?.min && precipitation?.min > response.data[1].values.sum[0]) ||
            (precipitation?.max && precipitation?.max < response.data[1].values.sum[0])
        ) {
            setDeviation((prevState) => {
                return {
                    ...prevState,
                    precipitation: true
                };
            });
        }
        if (
            (humidity?.min && humidity?.min > response.data[6].values.avg[0]) ||
            (humidity?.max && humidity?.max < response.data[6].values.avg[0])
        ) {
            setDeviation((prevState) => {
                return {
                    ...prevState,
                    humidity: true
                };
            });
        }
        if ((wind?.min && wind?.min > response.data[2].values.avg[0]) || (wind?.max && wind?.max < response.data[2].values.avg[0])) {
            setDeviation((prevState) => {
                return {
                    ...prevState,
                    wind: true
                };
            });
        }
    };

    const theme = useTheme();

    return (
        <MainCard title={'Последние данные станции ' + station.name} subheader={'Данные обновлены ' + lastParams?.dates[0]}>
            <div>
                <Grid container alignItems="stretch" justifyContent={'space-between'} spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="sun"
                            param={`${lastParams?.data[0].values.avg[0]} W/m2`}
                            color="#ffec00"
                            deviation={deviation.solar_radiation}
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="prec"
                            param={`${lastParams?.data[1].values.sum[0]} mm`}
                            color="#00abfb"
                            deviation={deviation.prec}
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="charge"
                            param={`${lastParams?.data[3].values.last[0]} mV`}
                            color="#6f32be"
                            deviation={deviation.charge}
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="humidity"
                            param={`${lastParams?.data[6].values.avg[0]} %`}
                            color="#597e8d"
                            deviation={deviation.humidity}
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="temperature"
                            param={`${lastParams?.data[5].values.avg[0]} °C`}
                            color="#a905b6"
                            deviation={deviation.temperature}
                            info={`min - ${lastParams?.data[5].values.min[0]}/max - ${lastParams?.data[5].values.max[0]}`}
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="wind"
                            deviation={deviation.wind}
                            param={`${lastParams?.data[2].values.avg[0]} m/s`}
                            color="#9e9e9e"
                            info={`max - ${lastParams?.data[2].values.max[0]}`}
                        ></TotalIncomeLightCard>
                    </Grid>
                </Grid>
            </div>

            <Other />

            <div style={{ marginTop: '0px' }}>
                <CardHeader title="Расположение станций на карте" />
                <Divider />
                <CardContent>
                    <div className="map" style={{ height: '500px', marginTop: '30px' }}></div>
                </CardContent>
            </div>
        </MainCard>
    );
};

export default WelcomePage;
