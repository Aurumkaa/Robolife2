import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import CardActivity from './CardActivity';
import CardActivityChanges from './CardActivityChanges';
import { ROBOLIFE2_BACKEND_API } from '../../../constants/Constants';

const Activity = () => {
    const [activityDataComment, setActivityDataComment] = useState([]);
    const [activityDataChange, setActivityDataChange] = useState([]);
    const [createdActivity, setCreatedActivity] = useState([]);
    useEffect(() => {
        var arr = [];

        axios
            .get(ROBOLIFE2_BACKEND_API.base_url + '/api/comments/q/' + `?user=${localStorage.getItem('id')}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then(({ data }) => {
                setActivityDataComment(data);
                data.forEach((el) => {
                    arr.push(el.created);
                });
            });
        axios
            .get(ROBOLIFE2_BACKEND_API.base_url + '/api/metric_changes/q/' + `?user=${localStorage.getItem('id')}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then(({ data }) => {
                setActivityDataChange(data);
                data.forEach((el) => {
                    arr.push(el.created);
                });
            });
        setCreatedActivity(arr.sort());
    }, []);

    return (
        <div>
            <Typography sx={{ marginTop: '10px', marginLeft: '20px' }} variant="h3" color={'#787878'} component="div">
                Последняя активность
            </Typography>

            <div style={{ marginTop: '20px' }}>
                {activityDataComment.slice(0, 10).map((item, index) => {
                    return <CardActivity key={index} data={item} />;
                })}
                {activityDataChange.slice(0, 10).map((item, index) => {
                    return <CardActivityChanges key={index} data={item} />;
                })}
            </div>
        </div>
    );
};

export default Activity;
