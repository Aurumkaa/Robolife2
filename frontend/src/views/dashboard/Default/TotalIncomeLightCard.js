import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import React from 'react';
import { BiCloudRain } from 'react-icons/bi';
import { RiBatteryChargeFill, RiDropLine } from 'react-icons/ri';
import { TbTemperature } from 'react-icons/tb';
import { FaWind } from 'react-icons/fa';

// styles
const CardWrapper = styled(MainCard)(({ theme, color, deviation }) => ({
    overflow: 'hidden',
    height: '100%',
    backgroundColor: deviation === true ? 'rgba(255,48,48,0.06)' : 'rgba(255,233,233,0.03)',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${color} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${color} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading, type, param, color, info, deviation = false }) => {
    const theme = useTheme();
    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper deviation={deviation} border={false} content={false} color={color}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: 'inherit',
                                            color: color
                                        }}
                                    >
                                        {type === 'sun' && <WbSunnyRoundedIcon fontSize="large" />}
                                        {type === 'prec' && <BiCloudRain size={70} />}
                                        {type === 'charge' && <RiBatteryChargeFill size={70} />}
                                        {type === 'humidity' && <RiDropLine size={70} />}
                                        {type === 'temperature' && <TbTemperature size={70} />}
                                        {type === 'wind' && <FaWind size={70} />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={<Typography variant="h4">{param}</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: theme.palette.grey[500],
                                                mt: 0.5
                                            }}
                                        >
                                            {type === 'sun' && <>Cолнечная радиация</>}
                                            {type === 'prec' && <>Осадки</>}
                                            {type === 'charge' && <>Заряд АКБ</>}
                                            {type === 'humidity' && <>Влажность воздуха</>}
                                            {type === 'temperature' && <>Температура воздуха</>}
                                            {type === 'wind' && <>Скорость ветра</>}
                                            {info && (
                                                <>
                                                    <br></br>
                                                    {info}
                                                </>
                                            )}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalIncomeLightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeLightCard;
