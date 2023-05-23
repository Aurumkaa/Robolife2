import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuList from '@mui/material/MenuList';
import * as Yup from 'yup';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Button, FormControl, InputLabel, ListItemIcon, MenuItem, OutlinedInput, Typography } from '@mui/material';
import { Formik } from 'formik';
import Activity from './user-actions/Activity';
import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdPendingActions } from 'react-icons/md';
import { TbZoomExclamation } from 'react-icons/tb';
import DeviationsSubscribe from './user-setting-deviations/DeviationsSubscribe';
import ChangePassword from './user-actions/ChangePassword';
import ChangePersonalData from './user-actions/ChangePersonalData';
// import $api from '../../../utils/token-validate';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

const User = () => {
    const theme = useTheme();
    const [activeItem, setActiveItem] = useState('profile');

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Item>
                            <div className={'card-image'}>
                                <div style={{ backgroundColor: '#e0e0e0', height: '100px', overflow: 'hidden' }}></div>
                            </div>
                            <div className={'card-body'}>
                                <div className={'user'} style={{ textAlign: 'center', marginTop: '-70px' }}>
                                    <Avatar
                                        sx={{
                                            width: 140,
                                            height: 140,
                                            margin: '0 auto',
                                            border: '5px solid',
                                            borderColor: '#eee'
                                        }}
                                    >
                                        {(localStorage.getItem('first_name')
                                            ? localStorage.getItem('first_name')[0]
                                            : localStorage.getItem('username')[0]) +
                                            (localStorage.getItem('last_name') ? localStorage.getItem('last_mame')[0] : '')}
                                    </Avatar>
                                    <h4 className="title" style={{ color: '#62d8e2' }}>
                                        {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}
                                    </h4>
                                    <p>{localStorage.getItem('username')}</p>
                                </div>
                            </div>
                            <MenuList>
                                <MenuItem onClick={() => setActiveItem('profile')}>
                                    <ListItemIcon>
                                        <CgProfile size={20} />
                                    </ListItemIcon>
                                    <ListItemText>Профиль</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => setActiveItem('activity')}>
                                    <ListItemIcon>
                                        <MdPendingActions size={20} />
                                    </ListItemIcon>
                                    <ListItemText>Активность</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => setActiveItem('deviation_subscribe')}>
                                    <ListItemIcon>
                                        <TbZoomExclamation size={20} />
                                    </ListItemIcon>
                                    <ListItemText>Погодные отклонения</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => setActiveItem('change_password')}>
                                    <ListItemIcon>
                                        <RiLockPasswordLine size={20} />
                                    </ListItemIcon>
                                    <ListItemText>Сменить пароль</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Item>
                            <Typography variant="subtitle1" gutterBottom>
                                {activeItem === 'profile' && <ChangePersonalData />}
                                {activeItem === 'activity' && <Activity />}
                                {activeItem === 'deviation_subscribe' && <DeviationsSubscribe />}
                                {activeItem === 'change_password' && <ChangePassword />}
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default User;
