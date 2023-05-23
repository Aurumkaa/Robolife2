import React, { useEffect, useState } from 'react';
import {
    Backdrop,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Fade,
    FormControl,
    Grid,
    InputLabel,
    Modal,
    OutlinedInput,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import axios from 'axios';
import { ROBOLIFE2_BACKEND_API } from '../../../constants/Constants';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import ModalDelete from './ModalDelete';
import ModalCreate from './ModalCreate';
import ModalUpdate from './ModalUpdate';

const dictDiviation = [
    { type: 'humidity', value: 'Влажность воздуха', unit: '%' },
    { type: 'wind', value: 'Скорость ветра', unit: 'м/с' },
    { type: 'solar radiation', value: 'Солнечная радиация', unit: 'В/м2' },
    { type: 'temperature', value: 'Температура', unit: 'C' },
    { type: 'charge', value: 'Заряд АКБ', unit: 'мВ' },
    { type: 'precipitation', value: 'Осадки', unit: 'мм' }
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    padding: '20px'
};

const DeviationsSubscribe = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const [openUpdate, setOpenUpdate] = React.useState({ status: false, id: null });
    const handleOpenUpdate = (id) => setOpenUpdate({ status: true, id: id });
    const handleCloseUpdate = () => {
        setOpenUpdate({ status: false, id: null });
    };

    const [open, setOpen] = React.useState({ status: false, id: null });
    const handleOpen = (id) => setOpen({ status: true, id: id });
    const handleClose = (ev) => {
        if (Boolean(ev.target.value)) {
            handleDelete(open.id);
        }
        setOpen({ status: false, id: null });
    };

    function handleDelete(id) {
        axios
            .delete(ROBOLIFE2_BACKEND_API.base_url + '/api/accounts/settings_deviation/c/' + id + '/', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then(({}) => {
                refreshData();
            });
    }

    const [data, setData] = useState([]);

    const refreshData = () => {
        axios
            .get(ROBOLIFE2_BACKEND_API.base_url + '/api/accounts/settings_deviation/q/' + `?user=${localStorage.getItem('id')}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then(({ data }) => {
                setData(data);
            });
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div>
            <Typography sx={{ marginTop: '10px', marginLeft: '20px' }} variant="h3" color={'#787878'} component="div">
                Предупреждать о погодных отклонениях
            </Typography>

            <Container sx={{ p: 5 }}>
                <TableContainer>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow style={{ height: '10px' }}>
                                <TableCell align="left">Параметр</TableCell>
                                <TableCell align="center">Минимум</TableCell>
                                <TableCell align="center">Максимум</TableCell>
                                <TableCell align="center">Удалить</TableCell>
                                <TableCell align="center">Редактировать</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow sx={{ 'td, th': { p: '5px' } }} key={row.id}>
                                    <TableCell align="left">{dictDiviation?.find((el) => row.param_type === el.type)?.value}</TableCell>
                                    <TableCell align="center">{row.min !== null ? row.min : '-'}</TableCell>
                                    <TableCell align="center">{row.max}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpen(row.id)} aria-label="delete" color="primary">
                                            <DeleteIcon style={{ color: 'rgba(222,0,25,0.62)' }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenUpdate(row.id)} aria-label="delete" color="primary">
                                            <EditIcon color="primary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container justifyContent="flex-end">
                    <Button onClick={handleOpenCreate} sx={{ m: 2 }} variant="outlined" startIcon={<AddIcon />}>
                        Добавить
                    </Button>
                </Grid>
            </Container>

            <ModalDelete data={data} open={open} handleClose={handleClose} dictDeviation={dictDiviation} />
            <ModalUpdate
                data={data}
                refreshData={refreshData}
                dictDiviation={dictDiviation}
                open={openUpdate}
                handleClose={handleCloseUpdate}
            />
            <ModalCreate
                data={data}
                open={openCreate}
                handleClose={handleCloseCreate}
                refreshData={refreshData}
                dictDiviation={dictDiviation}
            />
        </div>
    );
};

export default DeviationsSubscribe;
