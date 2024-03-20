import React from 'react';
import {
    Backdrop,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';
import { Formik } from 'formik';
import { ROBOLIFE2_BACKEND_API } from '../../../constants/Constants';
import * as Yup from 'yup';
import axios from 'axios';

const ModalCreate = ({ open, handleClose, data, dictDiviation, refreshData }) => {
    return (
        <Dialog open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}>
            <DialogTitle sx={{ fontSize: '18px' }}>Создать информирование об отклонении параметра</DialogTitle>
            <Divider />

            <DialogContent>
                <Formik
                    initialValues={{
                        param_type: '',
                        min: '',
                        max: ''
                    }}
                    validationSchema={Yup.object().shape(
                        {
                            param_type: Yup.string().max(255).required('Обязательное поле'),
                            min: Yup.number()
                                .nullable(true)
                                .when('max', {
                                    is: (max) => !max || max.length === 0,
                                    then: () => Yup.number().required('Одно из полей должно быть заполнено')
                                }),
                            max: Yup.number()
                                .nullable(true)
                                .when('min', (min) => {
                                    if (min) {
                                        return Yup.number().min(min, 'Значение максимума далжно быть меньше минимума');
                                    }
                                })
                                .when('min', {
                                    is: (min) => !min || min.length === 0,
                                    then: () => Yup.number().required('Одно из полей должно быть заполнено')
                                })
                        },
                        [['min', 'max']]
                    )}
                    onSubmit={(values) => {
                        values.user = Number(localStorage.getItem('id'));
                        values.min = values.min === '' ? null : values.min;
                        values.max = values.max === '' ? null : values.max;
                        axios
                            .post(ROBOLIFE2_BACKEND_API.base_url + '/api/accounts/settings_deviation/c/', values, {
                                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                            })
                            .then(({ data }) => {
                                refreshData();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }}
                >
                    {({ handleSubmit, errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
                        <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
                            <Grid container direction="row" spacing={2} sx={{ marginTop: '0' }}>
                                <Grid item xs={12}>
                                    <FormControl margin="dense" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Параметр</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.param_type}
                                            label="Параметр"
                                            name="param_type"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {/*<MenuItem value={''}>Нет</MenuItem>*/}
                                            {dictDiviation?.map(
                                                (val) =>
                                                    !data.find((el) => el.param_type === val.type) && (
                                                        <MenuItem key={val.type} value={val.type}>
                                                            {val.value}
                                                        </MenuItem>
                                                    )
                                            )}
                                        </Select>
                                        {touched.param_type && errors.param_type && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.param_type}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <Grid spacing={2} direction="row" container>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl margin="dense" fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-email-login">Минимум</InputLabel>
                                                <OutlinedInput
                                                    type="number"
                                                    value={values.min}
                                                    name="min"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Минимум"
                                                    inputProps={{}}
                                                />
                                                {touched.min && errors.min && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.min}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl margin="dense" fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-email-login">Максимум</InputLabel>
                                                <OutlinedInput
                                                    type="number"
                                                    value={values.max}
                                                    name="max"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Максимум"
                                                    inputProps={{}}
                                                />
                                                {touched.max && errors.max && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.max}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid sx={{ m: 1 }} container spacing={2} justifyContent="flex-end">
                                    <Grid item>
                                        <Button onClick={handleClose} type="submit" value="true" variant="contained">
                                            Да
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="error" onClick={handleClose}>
                                            Отмена
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default ModalCreate;
