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
import { useDispatch, useSelector } from 'react-redux';
import { endOfDay, startOfDay } from 'date-fns';
import OtherCard from '../../views/welcome-page/OtherCard';

const buttonColor = {
    color: 'blue'
};

const MainCardChartAndTable = ({
    firstData,
    title,
    subheader,
    tableData,
    setTableData,
    chartData,
    deviation,
    editable,
    saveData,
    freq,
    columnNames,
    chartTitle,
    chartRootName,
    comments,
    cultureList,
    chartDataTemp
}) => {
    const [editMode, setEditMode] = useState(false);
    const [tableMode, setTableMode] = useState(false);
    const [culture, setCulture] = useState(null);
    const [resultPrec, setResultPrec] = useState('');
    const [resultTemp, setResultTemp] = useState('');
    const dispatch = useDispatch();
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);

    useEffect(() => {
        if (culture) {
            var min_lvl = cultureList?.find((value) => value.name === culture).min_permissible_precipitation_level;
            var max_lvl = cultureList?.find((value) => value.name === culture).max_permissible_precipitation_level;
            var fact_lvl = chartData.at(-1).increaseCountPrecipitation;
            if (fact_lvl < min_lvl) {
                setResultPrec('little');
            } else if (fact_lvl > max_lvl) {
                setResultPrec('many');
            } else {
                setResultPrec('normal');
            }

            var min_lvl_tmp = cultureList?.find((value) => value.name === culture).min_active_temperature_level;
            var max_lvl_tmp = cultureList?.find((value) => value.name === culture).max_active_temperature_level;
            var fact_lvl_tmp = chartDataTemp.at(-1).degreesDaysUsa;
            console.log(min_lvl_tmp, max_lvl_tmp, fact_lvl_tmp);
            if (fact_lvl_tmp < min_lvl_tmp) {
                setResultTemp('little');
            } else if (fact_lvl_tmp > max_lvl_tmp) {
                setResultTemp('many');
            } else {
                setResultTemp('normal');
            }
        }
        // console.log(result);
    }, [culture, chartData, date[1], date[0]]);

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
                    deviation={deviation}
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
                <>
                    {resultPrec === 'little' && <OtherCard type="prec" result={{ status: true }} color={'#5bb5bd'} />}
                    {resultPrec === 'normal' && <OtherCard type="prec_normal" result={{ status: false }} color={'#5bb5bd'} />}
                    {resultPrec === 'many' && <OtherCard type="prec_many" result={{ status: true }} color={'#5bb5bd'} />}

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
                    {resultTemp === 'little' && <OtherCard type="warm" result={{ status: true }} color={'#ff9463'} />}
                    {resultTemp === 'normal' && <OtherCard type="temp_normal" result={{ status: false }} color={'#ff9463'} />}
                    {resultTemp === 'many' && <OtherCard type="temp_many" result={{ status: false }} color={'#ff9463'} />}
                </>
            )}
        </MainCard>
    );
};

export default MainCardChartAndTable;
