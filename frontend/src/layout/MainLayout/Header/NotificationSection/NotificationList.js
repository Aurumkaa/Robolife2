// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material';

// assets
import { PARAMS_CONVERT } from '../../../../constants/Constants';
import { useDispatch } from 'react-redux';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ notifications }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const OpenModal = (value) => {
        const ModalWindowData = {
            status: true,
            date: value.comment.weather_metric.date,
            value: value.comment.weather_metric.value,
            id: value.comment.weather_metric.id,
            typeParam: PARAMS_CONVERT[value.comment.weather_metric.name]
        };

        dispatch({
            type: 'SET_STATE_MODAL',
            ...ModalWindowData
        });
    };

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipCommentSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.grey.A100,
        marginRight: '5px'
    };

    const chipChangeSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            <Divider />
            {notifications.map((value, index) => {
                if (value.notification_type === 'COMMENT_CREATED') {
                    return (
                        <div key={index}>
                            <ListItemWrapper onClick={() => OpenModal(value)}>
                                <ListItem alignItems="center">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`${value.comment.user.first_name} ${value.comment.user.last_name}`}
                                        >{`${value.comment.user.first_name[0]}${value.comment.user.last_name[0]}`}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${value.comment.user.first_name} ${value.comment.user.last_name}`} />
                                    <ListItemSecondaryAction>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item xs={12}>
                                                <Typography
                                                    style={{ marginBottom: '3.5em' }}
                                                    variant="caption"
                                                    display="block"
                                                    gutterBottom
                                                >
                                                    {new Date(Date.parse(value.comment.created)).toLocaleString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Grid container direction="column" className="list-container">
                                    <Grid item xs={12} sx={{ pb: 2 }}>
                                        <Typography variant="subtitle2">
                                            Прокомментировал параметр "{PARAMS_CONVERT[value.comment.weather_metric.name]}" от{' '}
                                            {new Date(Date.parse(value.comment.weather_metric.date)).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item>
                                                <Chip label="Комментарий" sx={chipCommentSX} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItemWrapper>
                            <Divider />
                        </div>
                    );
                } else if (value.notification_type === 'METRICS_UPDATED') {
                    return (
                        <div key={index}>
                            <ListItemWrapper>
                                <ListItem alignItems="center">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`${value.metric_change.user.first_name} ${value.metric_change.user.last_name}`}
                                        >{`${value.metric_change.user.first_name[0]}${value.metric_change.user.last_name[0]}`}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${value.metric_change.user.first_name} ${value.metric_change.user.last_name}`}
                                    />

                                    <ListItemSecondaryAction>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item xs={12}>
                                                <Typography
                                                    style={{ marginBottom: '3.5em' }}
                                                    variant="caption"
                                                    display="block"
                                                    gutterBottom
                                                >
                                                    {new Date(Date.parse(value.metric_change.created)).toLocaleString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Grid container direction="column" className="list-container">
                                    <Grid item xs={12} sx={{ pb: 2 }}>
                                        <Typography variant="subtitle2">
                                            Пользователь изменил параметр "Осадки" за{' '}
                                            {new Date(Date.parse(value.metric_change.date)).toLocaleString()} на{' '}
                                            {value.metric_change.value_after} mm
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item>
                                                <Chip label="Изменение параметра" sx={chipChangeSX} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItemWrapper>
                            <Divider />
                        </div>
                    );
                }
            })}
        </List>
    );
};
export default NotificationList;
