import MainCard from '../../../ui-component/cards/MainCard';
import { Box, Button, FormHelperText, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState, useCallback } from 'react';
import Loader from 'ui-component/Loader';
import { red, green, amber } from '@mui/material/colors';
import axios from 'axios';
import { ROBOLIFE2_BACKEND_API } from '../../../constants/Constants';
import fieldClimateAPI from '../../../clients/FieldClimateClient';
import { useSelector } from 'react-redux';

const bestCultureFormSchema = yup.object().shape({
    temperature: yup.number().required(),
    humidity: yup.number().required().min(0).max(100),
    rainfall: yup.number().required().min(0),
    ph: yup.number().required(),
    N: yup.number().required().min(0).max(100),
    P: yup.number().required().min(0).max(100),
    K: yup.number().required().min(0).max(100)
});

const bestCultureFormOptions = [
    {
        key: 'climate',
        group: 'Климатические условия',
        inputs: [
            { id: 'temperature', label: 'Средняя температура, °C', type: 'number', xs: 12, md: 4 },
            { id: 'humidity', label: 'Относительная влажность, %', type: 'number', xs: 12, md: 4 },
            { id: 'rainfall', label: 'Количество осадков, мм', type: 'number', xs: 12, md: 4 }
        ]
    },
    {
        key: 'soil',
        group: 'Параметры почвы',
        inputs: [
            { id: 'ph', label: 'Кислотность почвы, Ph', type: 'number', xs: 12, md: 6 },
            { id: 'N', label: 'Соотношение содержания азота в почве, %', type: 'number', xs: 12, md: 6 },
            { id: 'P', label: 'Соотношение содержания фосфора в почве, %', type: 'number', xs: 12, md: 6 },
            { id: 'K', label: 'Соотношение содержания калия в почве, %', type: 'number', xs: 12, md: 6 }
        ]
    }
];

const bestCultureFormInitialValues = Object.keys(bestCultureFormSchema.fields).reduce((acc, field) => {
    return { ...acc, [field]: '' };
}, {});

const getMockCultureStatistics = () => {
    return ['Овес', 'Пшеница', 'Кукуруза', 'Помидор', 'Рис', 'Подсолнух', 'Гречка']
        .map((name) => {
            return {
                name,
                weight: Number(Math.random().toFixed(2))
            };
        })
        .sort((a, b) => b.weight - a.weight);
};

const cultureStatisticsConfig = {
    optimal: { min: 0.45, color: green['500'] },
    average: { min: 0.15, color: amber['500'] },
    bad: { min: -1, color: red['500'] }
};

const BestCulturePage = () => {
    const [isCalculationLoading, setIsCalculationLoading] = useState(false);
    const [cultureStatistics, setCultureStatistics] = useState(null);
    const station = useSelector((state) => state.station);

    const formik = useFormik({
        validationSchema: bestCultureFormSchema,
        initialValues: bestCultureFormInitialValues,
        validateOnChange: true,
        onSubmit: async (values, formikHelpers) => {
            try {
                setCultureStatistics(null);
                setIsCalculationLoading(true);

                const res = await axios.post(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.harvest_recommendation, values);
                res.data.sort((a, b) => b.weight - a.weight);
                setCultureStatistics(res.data);
            } catch (err) {
                console.error(err);
                formikHelpers.setErrors({ submit: 'Не удалось провести расчет!' });
            } finally {
                setIsCalculationLoading(false);
            }
        }
    });

    const handleClear = useCallback(() => {
        formik.resetForm();
        setCultureStatistics(null);
    }, [formik]);

    const setClimateDataByMeteo = useCallback(
        async (event) => {
            event?.preventDefault();
            const meteoData = await fieldClimateAPI.getLastParamsMonthly(station.id);
            const temperature = meteoData.data.find((v) => v.name_original === 'HC Air temperature')?.values?.avg?.[0] ?? 0;
            const humidity = meteoData.data.find((v) => v.name_original === 'HC Relative humidity')?.values?.avg?.[0] ?? 0;
            const rainfall = meteoData.data.find((v) => v.name_original === 'Precipitation')?.values?.avg?.[0] ?? 0;

            formik.setFieldValue('temperature', temperature);
            formik.setFieldValue('humidity', humidity);
            formik.setFieldValue('rainfall', rainfall);
        },
        [formik, station.id]
    );

    return (
        <MainCard title={'Прогноз оптимальности сева'}>
            {isCalculationLoading && <Loader />}
            <Box>
                <Typography paragraph>
                    С помощью данного инструмента вы можете определить наиболее подходящую культуру для сева на основании данных о климате и
                    почве.
                </Typography>
            </Box>
            <Box component={'form'} noValidate onSubmit={formik.handleSubmit} px={2}>
                {bestCultureFormOptions.map((opt) => {
                    return (
                        <Grid container spacing={2} marginTop={2} key={opt.key}>
                            <Grid container item xs={12} spacing={2}>
                                <Box display="flex" gap={2} alignItems="center">
                                    <Typography variant={'h5'}>{opt.group}</Typography>
                                    {opt.key === 'climate' && (
                                        <Button
                                            size="small"
                                            type="button"
                                            variant="text"
                                            style={{ textTransform: 'none' }}
                                            onClick={setClimateDataByMeteo}
                                        >
                                            За последний месяц
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                            {opt.inputs.map((inputOpt) => {
                                const id = inputOpt.id;
                                return (
                                    <Grid item xs={inputOpt.xs} md={inputOpt.md} key={id} marginTop={2}>
                                        <TextField
                                            fullWidth
                                            id={id}
                                            disabled={isCalculationLoading}
                                            type={inputOpt.type}
                                            name={inputOpt.name}
                                            label={inputOpt.label}
                                            value={formik.values[id]}
                                            onChange={formik.handleChange}
                                            error={Boolean(formik.touched[id] && formik.errors[id])}
                                            helperText={formik.touched[id] && formik.errors[id]}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    );
                })}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end" marginTop={4}>
                    <Button type={'button'} variant={'text'} color={'error'} onClick={handleClear} disabled={isCalculationLoading}>
                        Очистить
                    </Button>
                    <Button type={'submit'} variant={'outlined'} color={'primary'} disabled={isCalculationLoading}>
                        {isCalculationLoading ? 'Загрузка' : 'Расчитать'}
                    </Button>
                </Stack>
                {formik.errors.submit && (
                    <Stack direction={'row'} justifyContent="flex-end" marginTop={2}>
                        <FormHelperText error={true}>{formik.errors.submit}</FormHelperText>
                    </Stack>
                )}
            </Box>
            {cultureStatistics && (
                <Box marginTop={4}>
                    <Typography variant={'h5'}>Результаты прогноза</Typography>
                    <Typography paragraph marginTop={3}>
                        В списке представлены культуры с факторным весом. Значение факторного веса находится в пределах от 0 до 1. Чем
                        больше вес, тем больше заданные параметры климата и почвы являются оптимальными для той или иной культуры.
                    </Typography>
                    <Stack direction={'column'} spacing={2} marginTop={3}>
                        {cultureStatistics.map((item) => (
                            <Stack direction={'row'} spacing={2} justifyContent={'space-between'} key={item.name} sx={{ maxWidth: 320 }}>
                                <Typography paragraph>{item.name[0].toUpperCase() + item.name.slice(1)}</Typography>
                                <Typography paragraph color={Object.values(cultureStatisticsConfig).find((o) => item.weight > o.min).color}>
                                    {item.weight}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            )}
        </MainCard>
    );
};

export default BestCulturePage;
