import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ButtonGroup, IconButton, Message, SelectPicker } from 'rsuite';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import CheckIcon from '@rsuite/icons/Check';
import TableIcon from '@rsuite/icons/Table';
import CalendarIcon from '@rsuite/icons/Calendar';
import LineChartIcon from '@rsuite/icons/LineChart';
import LineChart from '../LineChart';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import DataTable from '../DataTable';
import MainCard from './MainCard';
import { useDispatch } from 'react-redux';
import { endOfDay, startOfDay } from 'date-fns';

const buttonColor = {
    color: 'blue'
};

const MainCardChartAndTable = ({
    firstData,
    setFirstData,
    title,
    subheader,
    tableData,
    setTableData,
    chartData,
    editable,
    saveData,
    freq,
    columnNames,
    chartTitle,
    chartRootName,
    comments,
    cultureList,
    tableDataTemp,
    setTableDataTemp,
    chartDataTemp
}) => {
    const [editMode, setEditMode] = useState(false);
    const [tableMode, setTableMode] = useState(false);
    const [culture, setCulture] = useState(null);
    const [result, setResult] = useState({ type_msg: null, msg: null });
    const [resultTemp, setResultTemp] = useState({ type_msg: null, msg: null });
    const dispatch = useDispatch();

    useEffect(() => {
        if (culture) {
            var min_lvl = cultureList?.find((value) => value.name === culture).min_permissible_precipitation_level;
            var max_lvl = cultureList?.find((value) => value.name === culture).max_permissible_precipitation_level;
            var fact_lvl = chartData.at(-1).increaseCountPrecipitation;
            if (fact_lvl < min_lvl) {
                setResult({
                    msg: `Для выбранной вами культуры (${culture.toLowerCase()}) за выбранный период времени выпало недостаточное количество осадков`,
                    type_msg: 'warning'
                });
            } else if (fact_lvl > max_lvl) {
                setResult({
                    msg: `Для выбранной вами культуры (${culture.toLowerCase()}) за выбранный период времени переизбыток осадков`,
                    type_msg: 'warning'
                });
            } else {
                setResult({
                    msg: `Для выбранной вами культуры (${culture.toLowerCase()}) за выбранный период времени выпало достаточное количество осадков`,
                    type_msg: 'success'
                });
            }

            var min_lvl_tmp = cultureList?.find((value) => value.name === culture).min_active_temperature_level;
            var max_lvl_tmp = cultureList?.find((value) => value.name === culture).max_active_temperature_level;
            var fact_lvl_tmp = chartData.at(-1).degreesDays;
            if (fact_lvl < min_lvl) {
                setResultTemp({
                    msg: `Для выбранной вами культуры (${culture.toLowerCase()}) за выбранный период времени недостаточное количество тепла`,
                    type_msg: 'warning'
                });
            } else if (fact_lvl > max_lvl) {
                setResultTemp({
                    msg: `Для выбранной вами культуры (${culture.toLowerCase()}) за выбранный период времени переизбыток тепла`,
                    type_msg: 'warning'
                });
            } else {
                setResultTemp({
                    msg: `Для выбранной вами культуры (${culture.toLowerCase()}) за выбранный период времени достаточное количество тепла`,
                    type_msg: 'success'
                });
            }
        }
    }, [culture, chartData]);

    const handleVegetationPeriod = () => {
        if (culture)
            dispatch({
                type: 'SET_DATE',
                date: [
                    startOfDay(new Date(cultureList?.find((value) => value.name === culture).vegetation_season_start)),
                    endOfDay(new Date(cultureList?.find((value) => value.name === culture).vegetation_season_end))
                ]
            });
    };

    return (
        <MainCard title={title} subheader={subheader}>
            <Grid container spacing={2} justifyContent="flex-end">
                {cultureList ? (
                    <>
                        <Grid item>
                            <SelectPicker
                                locale={{ searchPlaceholder: 'Поиск', placeholder: 'Выберите культуру' }}
                                value={culture}
                                onChange={setCulture}
                                data={cultureList.map((val) => ({ label: val.name, value: val.name }))}
                                style={{ width: 224 }}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton icon={<CalendarIcon />} onClick={handleVegetationPeriod} />
                        </Grid>
                    </>
                ) : null}
                {editable ? (
                    <Grid item>
                        {!editMode ? (
                            <IconButton
                                icon={<EditIcon />}
                                onClick={() => {
                                    setEditMode(true);
                                }}
                            >
                                Редактировать данные
                            </IconButton>
                        ) : (
                            <div>
                                <IconButton
                                    appearance="primary"
                                    color="cyan"
                                    style={{ marginRight: '10px' }}
                                    icon={<CloseIcon />}
                                    onClick={() => {
                                        setEditMode(false);
                                    }}
                                >
                                    Отменить
                                </IconButton>
                                <IconButton
                                    icon={<CheckIcon />}
                                    appearance="primary"
                                    color="green"
                                    onClick={() => {
                                        setEditMode(false);
                                        saveData(tableData);
                                    }}
                                >
                                    Применить
                                </IconButton>
                            </div>
                        )}
                    </Grid>
                ) : null}
                <Grid item>
                    {!editMode ? (
                        <ButtonGroup>
                            <IconButton
                                style={tableMode ? buttonColor : null}
                                icon={<TableIcon />}
                                onClick={() => {
                                    setTableMode(true);
                                }}
                            />
                            <IconButton
                                style={!tableMode ? buttonColor : null}
                                icon={<LineChartIcon />}
                                onClick={() => setTableMode(false)}
                            />
                        </ButtonGroup>
                    ) : (
                        <div />
                    )}
                </Grid>

                {cultureList && (
                    <Grid item>
                        <IconButton circle size="md" icon={<InfoOutlineIcon />} />
                    </Grid>
                )}
            </Grid>
            {!editMode && !tableMode ? (
                <LineChart
                    titleChart={chartTitle}
                    chartRootName={chartRootName}
                    data={chartData}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                    comments={comments}
                    range={cultureList?.find((value) => value.name === culture)}
                />
            ) : (
                <DataTable
                    firstData={firstData}
                    tableData={tableData}
                    setTableData={setTableData}
                    editMode={editMode}
                    columnNames={columnNames}
                />
            )}
            {cultureList && (
                <LineChart
                    titleChart="Сумма активных температур, С"
                    chartRootName="crt1"
                    data={chartDataTemp}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                    comments={comments}
                    range={cultureList?.find((value) => value.name === culture)}
                    type={'temp'}
                />
            )}
            {cultureList?.find((value) => value.name === culture) ? (
                <>
                    <Grid container spacing={2} alignItems="stretch" direction="row" justifyContent="space-between">
                        <Grid item xs={4}>
                            <Message type={result.type_msg}>{result.msg}</Message>
                        </Grid>
                        <Grid item xs={4}>
                            <Message type={resultTemp.type_msg}>{resultTemp.msg}</Message>
                        </Grid>
                        <Grid item xs={4}>
                            <Message style={{ backgroundColor: 'rgba(234,197,232,0.58)' }}>Реккомендуемые мероприятия:</Message>
                        </Grid>
                    </Grid>
                </>
            ) : null}
        </MainCard>
    );
};

export default MainCardChartAndTable;
