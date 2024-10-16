import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import openmeteoAPI from '../../clients/OpenMeteoForecastClient';
import { Loader } from 'rsuite';
import { dictDiviation } from '../user-page/user-setting-deviations/DeviationsSubscribe';

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

    const [isParamsLoading, setIsParamsLoading] = useState(true);

    const fetchFieldClimateParams = useCallback(async () => {
        try {
            setIsParamsLoading(true);
            const response = await fieldClimateAPI.getLastParams(station.id);
            setLastParams(response);
            const { data } = await axios.get(
                ROBOLIFE2_BACKEND_API.base_url + '/api/accounts/settings_deviation/q/' + `?user=${localStorage.getItem('id')}`,
                {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                }
            );
            SettingsParamDeviation(data, setDeviation, response);
        } finally {
            setIsParamsLoading(false);
        }
    }, [station.id]);

    useEffect(() => {
        fetchFieldClimateParams();
    }, [fetchFieldClimateParams]);

    useEffect(() => {
        axios
            .delete(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.notification_url + 'c/' + localStorage.getItem('id') + '/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(() => {
                openmeteoAPI.getForecastDataForChemicalTreatments(station.coordinates).then((response) => {
                    axios.post(
                        ROBOLIFE2_BACKEND_API.base_url + '/api/forecast_update/s/',
                        {
                            station_code: station.id,
                            date: response['current_weather']['time'],
                            forecast: response['hourly']
                        },
                        {
                            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                        }
                    );
                });
            });
    }, [station.coordinates, station.id]);

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

    const mappedParams = useMemo(() => {
        if (!lastParams) return null;

        return {
            humidity: lastParams.data.find((item) => item.name_original === 'HC Relative humidity'),
            wind: lastParams.data.find((item) => item.name_original === 'Wind speed'),
            temperature: lastParams.data.find((item) => item.name_original === 'HC Air temperature'),
            solarRadiation: lastParams.data.find((item) => item.name_original === 'Solar radiation'),
            charge: lastParams.data.find((item) => item.name_original === 'Battery'),
            precipitation: lastParams.data.find((item) => item.name_original === 'Precipitation')
        };
    }, [lastParams]);

    console.log({ mappedParams });

    return (
        <MainCard
            title={'Последние данные станции ' + station.name}
            subheader={!isParamsLoading && 'Данные обновлены ' + lastParams?.dates[0]}
        >
            <div>
                {isParamsLoading ? (
                    <Loader content={'Загрузка...'}>Загрузка</Loader>
                ) : (
                    <Grid container alignItems="stretch" justifyContent={'space-between'} spacing={1}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TotalIncomeLightCard
                                type="sun"
                                param={mappedParams.temperature ? `${mappedParams.temperature.values.avg.at(-1)} W/m2` : 'Нет данных'}
                                color="#ffec00"
                                deviation={deviation.solar_radiation}
                            ></TotalIncomeLightCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TotalIncomeLightCard
                                type="prec"
                                param={mappedParams.precipitation ? `${mappedParams.precipitation.values.sum.at(-1)} mm` : 'Нет данных'}
                                color="#00abfb"
                                deviation={deviation.prec}
                            ></TotalIncomeLightCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TotalIncomeLightCard
                                type="charge"
                                param={mappedParams.charge ? `${mappedParams.charge.values.last.at(-1)} mV` : 'Нет данных'}
                                color="#6f32be"
                                deviation={deviation.charge}
                            ></TotalIncomeLightCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TotalIncomeLightCard
                                type="humidity"
                                param={mappedParams.humidity ? `${mappedParams.humidity.values.avg.at(-1)} %` : 'Нет данных'}
                                color="#597e8d"
                                deviation={deviation.humidity}
                            ></TotalIncomeLightCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TotalIncomeLightCard
                                type="temperature"
                                param={mappedParams.temperature ? `${mappedParams.temperature.values.avg.at(-1)} °C` : 'Нет данных'}
                                color="#a905b6"
                                deviation={deviation.temperature}
                                info={
                                    mappedParams.temperature
                                        ? `min - ${mappedParams.temperature.values.min.at(
                                              -1
                                          )}/max - ${mappedParams.temperature.values.max.at(-1)}`
                                        : undefined
                                }
                            ></TotalIncomeLightCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TotalIncomeLightCard
                                type="wind"
                                deviation={deviation.wind}
                                param={mappedParams.wind ? `${mappedParams.wind.values.avg.at(-1)} °C` : 'Нет данных'}
                                color="#9e9e9e"
                                info={mappedParams.wind ? `max - ${mappedParams.wind.values.max.at(-1)}` : undefined}
                            ></TotalIncomeLightCard>
                        </Grid>
                    </Grid>
                )}
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
