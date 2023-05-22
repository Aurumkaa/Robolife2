import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import '../welcome-page/welcome.scss';
import TotalIncomeLightCard from '../dashboard/Default/TotalIncomeLightCard';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

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
                <Grid container alignItems="stretch" justifyContent={'space-between'} spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="sun"
                            param={`${lastParams?.data[0].values.avg[0]} W/m2`}
                            color="#ffec00"
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="prec"
                            param={`${lastParams?.data[1].values.sum[0]} mm`}
                            color="#00abfb"
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="charge"
                            param={`${lastParams?.data[3].values.last[0]} mV`}
                            color="#6f32be"
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="humidity"
                            param={`${lastParams?.data[6].values.avg[0]} %`}
                            color="#597e8d"
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="temperature"
                            param={`${lastParams?.data[5].values.avg[0]} °C`}
                            color="#a905b6"
                            info={`min - ${lastParams?.data[5].values.min[0]}/max - ${lastParams?.data[5].values.max[0]}`}
                        ></TotalIncomeLightCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TotalIncomeLightCard
                            type="wind"
                            param={`${lastParams?.data[2].values.avg[0]} m/s`}
                            color="#9e9e9e"
                            info={`max - ${lastParams?.data[2].values.max[0]}`}
                        ></TotalIncomeLightCard>
                    </Grid>
                </Grid>
            </div>

            <div style={{ marginTop: '30px' }}>
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
