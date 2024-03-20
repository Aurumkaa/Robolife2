import React from 'react';
import { Button, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';

const ChangePersonalData = () => {
    const [updateProfileResult, setUpdateProfileResult] = React.useState({ status: false, message: null, type: null });
    const theme = useTheme();
    return (
        <>
            <Typography sx={{ marginTop: '10px', marginLeft: '20px' }} variant="h3" color={'#787878'} component="div">
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
    );
};

export default ChangePersonalData;
