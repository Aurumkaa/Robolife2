import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Slider,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SendIcon from '@mui/icons-material/Send';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from 'store/actions';
import { gridSpacing } from 'store/constant';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { client } from '../../utils/axiosClient';

// concat 'px'
function valueText(value) {
    return `${value}px`;
}

const Customization = () => {
    console.log();
    const formik = useFormik({
        initialValues: {
            message: '',
            email: localStorage.getItem('email')
        },
        onSubmit: (values) => {
            values.url = window.location.href;

            client.post('/api/feedback/c/', values).then((response) => {
                alert('Ваше сообщение отправлено. Спасибо за обратную связь!', 2);
                formik.resetForm();
            });
            setOpen(!open);
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Email адрес неверный').max(255),
            message: Yup.string().max(255).required('Сообщение не введено')
        })
    });

    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    // state - border radius
    const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius });
    }, [dispatch, borderRadius]);

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    // state - font family
    const [fontFamily, setFontFamily] = useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Feedback">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial
                    }}
                >
                    <AnimateButton>
                        <IconButton color="inherit" size="large" disableRipple>
                            <FeedbackIcon />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                        {/*<Grid item xs={12}>*/}
                        {/* font family */}
                        {/*<SubCard title="Font Family">*/}
                        {/*    <FormControl>*/}
                        {/*        <RadioGroup*/}
                        {/*            aria-label="font-family"*/}
                        {/*            value={fontFamily}*/}
                        {/*            onChange={(e) => setFontFamily(e.target.value)}*/}
                        {/*            name="row-radio-buttons-group"*/}
                        {/*        >*/}
                        {/*            <FormControlLabel*/}
                        {/*                value="Roboto"*/}
                        {/*                control={<Radio />}*/}
                        {/*                label="Roboto"*/}
                        {/*                sx={{*/}
                        {/*                    '& .MuiSvgIcon-root': { fontSize: 28 },*/}
                        {/*                    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }*/}
                        {/*                }}*/}
                        {/*            />*/}
                        {/*            <FormControlLabel*/}
                        {/*                value="Poppins"*/}
                        {/*                control={<Radio />}*/}
                        {/*                label="Poppins"*/}
                        {/*                sx={{*/}
                        {/*                    '& .MuiSvgIcon-root': { fontSize: 28 },*/}
                        {/*                    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }*/}
                        {/*                }}*/}
                        {/*            />*/}
                        {/*            <FormControlLabel*/}
                        {/*                value="Inter"*/}
                        {/*                control={<Radio />}*/}
                        {/*                label="Inter"*/}
                        {/*                sx={{*/}
                        {/*                    '& .MuiSvgIcon-root': { fontSize: 28 },*/}
                        {/*                    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }*/}
                        {/*                }}*/}
                        {/*            />*/}
                        {/*        </RadioGroup>*/}
                        {/*    </FormControl>*/}
                        {/*</SubCard>*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        {/*    /!* border radius *!/*/}
                        {/*    <SubCard title="Border Radius">*/}
                        {/*        <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>*/}
                        {/*            <Grid item>*/}
                        {/*                <Typography variant="h6" color="secondary">*/}
                        {/*                    0px*/}
                        {/*                </Typography>*/}
                        {/*            </Grid>*/}
                        {/*            <Grid item xs>*/}
                        {/*                <Slider*/}
                        {/*                    size="small"*/}
                        {/*                    value={borderRadius}*/}
                        {/*                    onChange={handleBorderRadius}*/}
                        {/*                    getAriaValueText={valueText}*/}
                        {/*                    valueLabelDisplay="on"*/}
                        {/*                    aria-labelledby="discrete-slider-small-steps"*/}
                        {/*                    marks*/}
                        {/*                    step={2}*/}
                        {/*                    min={0}*/}
                        {/*                    max={24}*/}
                        {/*                    color="secondary"*/}
                        {/*                    sx={{*/}
                        {/*                        '& .MuiSlider-valueLabel': {*/}
                        {/*                            color: 'secondary.light'*/}
                        {/*                        }*/}
                        {/*                    }}*/}
                        {/*                />*/}
                        {/*            </Grid>*/}
                        {/*            <Grid item>*/}
                        {/*                <Typography variant="h6" color="secondary">*/}
                        {/*                    24px*/}
                        {/*                </Typography>*/}
                        {/*            </Grid>*/}
                        {/*        </Grid>*/}
                        {/*    </SubCard>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <SubCard title="Замечания и предложения">
                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl margin="dense" fullWidth>
                                        <TextField
                                            type="email"
                                            name="email"
                                            label="E-mail"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                {formik.errors.email}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl margin="dense" fullWidth>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Сообщение"
                                            multiline
                                            name="message"
                                            type="text"
                                            rows={4}
                                            onChange={formik.handleChange}
                                            value={formik.values.message}
                                        />
                                        {formik.touched.message && formik.errors.message && (
                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                {formik.errors.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    {/*<button type="submit">Submit</button>*/}
                                    <Button
                                        startIcon={<SendIcon />}
                                        fullWidth
                                        style={{ marginTop: '10px' }}
                                        type="submit"
                                        variant="outlined"
                                    >
                                        Отправить
                                    </Button>
                                </form>
                            </SubCard>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </>
    );
};

export default Customization;
