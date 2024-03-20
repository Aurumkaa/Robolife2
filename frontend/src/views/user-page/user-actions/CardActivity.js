import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Icon, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { PARAMS_CONVERT } from '../../../constants/Constants';
import CommentIcon from '@mui/icons-material/Comment';

const CardActivity = (data) => {
    const dispatch = useDispatch();

    const OpenModal = (value) => {
        const ModalWindowData = {
            status: true,
            date: data.data.weather_metric.date,
            value: data.data.weather_metric.value,
            id: data.data.weather_metric.id,
            typeParam: PARAMS_CONVERT[data.data.weather_metric.name]
        };

        dispatch({
            type: 'SET_STATE_MODAL',
            ...ModalWindowData
        });
    };
    return (
        <div>
            <Card
                onClick={() => OpenModal(data)}
                sx={{
                    ':hover': {
                        backgroundColor: 'rgba(205,219,227,0.18)' // theme.shadows[20]
                    }
                }}
                style={{ padding: 15 }}
            >
                <Grid container>
                    <Grid item sx={{ marginTop: '5px' }}>
                        <CommentIcon />
                    </Grid>
                    <Grid item>
                        <CardHeader style={{ padding: 5 }} subheader={new Date(Date.parse(data.data.created)).toLocaleString()} />
                        <CardContent style={{ padding: 5 }}>
                            <Typography variant="body2" component="p">
                                Оставлен комментарий "{data.data.message}" к Сумме осадков от {data.data.weather_metric.date} (
                                {data.data.weather_metric.value} мм)
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
            <Divider variant="middle" />
        </div>
    );
};

export default CardActivity;
