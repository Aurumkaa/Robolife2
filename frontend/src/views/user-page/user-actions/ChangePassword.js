import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

const ChangePassword = () => {
    const [changePasswordResult, setChangePasswordResult] = React.useState({ status: false, message: null, type: null });
    const theme = useTheme();

    return (
        <>
            <Typography sx={{ marginTop: '10px', marginLeft: '20px' }} variant="h3" color={'#787878'} component="div">
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
                                    <Alert severity={changePasswordResult.type}>{changePasswordResult.message}</Alert>
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
    );
};

export default ChangePassword;
