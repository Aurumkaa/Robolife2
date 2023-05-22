import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuList from '@mui/material/MenuList';
import * as Yup from 'yup';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Button, FormControl, InputLabel, ListItemIcon, MenuItem, OutlinedInput, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { ContentCopy, ContentCut, ContentPaste } from '@mui/icons-material';
import Activity from './Activity';
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
    const [changePasswordResult, setChangePasswordResult] = React.useState({ status: false, message: null, type: null });
    const [updateProfileResult, setUpdateProfileResult] = React.useState({ status: false, message: null, type: null });
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
                                        <ContentCut fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Профиль</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => setActiveItem('activity')}>
                                    <ListItemIcon>
                                        <ContentCopy fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Активность</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => setActiveItem('change_password')}>
                                    <ListItemIcon>
                                        <ContentPaste fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Сменить пароль</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Item>
                            <Typography variant="subtitle1" gutterBottom>
                                {activeItem === 'profile' && (
                                    <>
                                        <Typography
                                            sx={{ marginTop: '10px', marginLeft: '20px' }}
                                            variant="h3"
                                            color={'#787878'}
                                            component="div"
                                        >
                                            Данные профиля
                                        </Typography>
                                        <Formik
                                            initialValues={{
                                                email: localStorage.getItem('email') || '',
                                                first_name: localStorage.getItem('firstName') || '',
                                                last_name: localStorage.getItem('lastName') || '',
                                                patronymic: localStorage.getItem('patronymic') || ''
                                            }}
                                            validationSchema={Yup.object().shape({
                                                email: Yup.string().email('Email адрес неверный').max(255)
                                            })}
                                            onSubmit={(values) => {
                                                // $api.put('api/accounts/update_profile/' + localStorage.getItem('id') + '/', values)
                                                //     .then(({ data }) => {
                                                //         console.log(data);
                                                //         localStorage.setItem('email', data.email);
                                                //         localStorage.setItem('firstName', data.first_name);
                                                //         localStorage.setItem('lastName', data.last_name);
                                                //         localStorage.setItem('patronymic', data.patronymic);
                                                //         window.location.reload();
                                                //     })
                                                //     .catch((error) => {
                                                //         console.log(error);
                                                //     });
                                            }}
                                        >
                                            {({ handleSubmit, errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
                                                <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
                                                    <Grid container spacing={2} sx={{ marginTop: '0' }}>
                                                        <Grid item item xs={12} sm={6}>
                                                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel>Фамилия</InputLabel>
                                                                <OutlinedInput
                                                                    fullWidth
                                                                    required
                                                                    id="outlined-required"
                                                                    label="Фамилия"
                                                                    value={values.last_name}
                                                                    name="last_name"
                                                                    type="text"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    inputProps={{}}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item item xs={12} sm={6}>
                                                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel>Имя</InputLabel>
                                                                <OutlinedInput
                                                                    fullWidth
                                                                    required
                                                                    id="outlined-required"
                                                                    label="Имя"
                                                                    value={values.first_name}
                                                                    name="first_name"
                                                                    type="text"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    inputProps={{}}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item item xs={12} sm={6}>
                                                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                                <InputLabel>Отчество</InputLabel>
                                                                <OutlinedInput
                                                                    fullWidth
                                                                    id="outlined-required"
                                                                    label="Отчество"
                                                                    value={values.patronymic}
                                                                    name="patronymic"
                                                                    type="text"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    inputProps={{}}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item item xs={12} sm={6}>
                                                            <FormControl
                                                                fullWidth
                                                                error={Boolean(touched.email && errors.email)}
                                                                sx={{ ...theme.typography.customInput }}
                                                            >
                                                                <InputLabel>Email</InputLabel>
                                                                <OutlinedInput
                                                                    id="outlined-adornment-email-register"
                                                                    type="email"
                                                                    value={values.email}
                                                                    name="email"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    inputProps={{}}
                                                                />
                                                                {touched.email && errors.email && (
                                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                                        {errors.email}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Button type="submit" fullWidth variant="outlined">
                                                                Поменять данные
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            )}
                                        </Formik>
                                    </>
                                )}
                                {activeItem === 'activity' && <Activity />}
                                {activeItem === 'change_password' && (
                                    <>
                                        <Typography
                                            sx={{ marginTop: '10px', marginLeft: '20px' }}
                                            variant="h3"
                                            color={'#787878'}
                                            component="div"
                                        >
                                            Поменять пароль
                                        </Typography>
                                        <Formik
                                            initialValues={{ password: '', password2: '', old_password: '' }}
                                            onSubmit={(values) => {
                                                $api.patch('api/accounts/change_password/' + localStorage.getItem('id') + '/', values)
                                                    .then(({ data }) => {
                                                        console.log(data);
                                                        setChangePasswordResult({
                                                            status: true,
                                                            message: data.password,
                                                            type: 'success'
                                                        });
                                                    })
                                                    .catch((error) => {
                                                        console.log(error.response.data.password[0]);
                                                        setChangePasswordResult({
                                                            status: true,
                                                            message: error.response.data.password[0],
                                                            type: 'error'
                                                        });
                                                    });
                                            }}
                                        >
                                            {({ handleSubmit, handleChange, handleBlur, values }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <Grid container spacing={2} sx={{ marginTop: '0' }}>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                                name="password"
                                                                required
                                                                id="outlined-required"
                                                                label="Новый пароль"
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password2}
                                                                name="password2"
                                                                required
                                                                id="outlined-required"
                                                                label="Повторите новый пароль"
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.old_password}
                                                                name="old_password"
                                                                required
                                                                id="outlined-required"
                                                                label="Старый пароль"
                                                                fullWidth
                                                            />
                                                        </Grid>

                                                        {changePasswordResult.status && (
                                                            <Grid item xs={12}>
                                                                <Alert severity={changePasswordResult.type}>
                                                                    {changePasswordResult.message}
                                                                </Alert>
                                                            </Grid>
                                                        )}
                                                        <Grid item xs={12}>
                                                            <Button type="submit" fullWidth variant="contained">
                                                                Поменять пароль
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            )}
                                        </Formik>
                                    </>
                                )}
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default User;
