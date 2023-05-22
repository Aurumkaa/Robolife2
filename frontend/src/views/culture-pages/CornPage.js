import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addHours } from 'date-fns';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import axios from 'axios';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';
import ColumnChart from '../../ui-component/ColumnChart';
import MainCard from '../../ui-component/cards/MainCard';

const CornPage = () => {
    const [cultureList, setCultureList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartDataIncPrec, setChartDataIncPrec] = useState([]);
    const [tableDataIncPrec, setTableDataIncPrec] = useState([]);

    const [chartDataIncTemp, setChartDataIncTemp] = useState([]);
    const [tableDataIncTemp, setTableDataIncTemp] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const station = useSelector((state) => state.station);

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), 'monthly')
            .then((response) => {
                setChartData(getChartData(response.data.length ? { countPrecipitation: response.data[1].values.sum } : {}, response.dates));
            });
        fieldClimateAPI
            .getCalculationRain(station.id, 5, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000))
            .then((response) => {
                setChartDataIncPrec(
                    getChartData(
                        Object.values(response.chart).length
                            ? { increaseCountPrecipitation: Object.values(response.chart).map((value) => Number(value)) }
                            : {},
                        Object.keys(response.chart)
                    )
                );
                let tableData = [];
                Object.keys(response.chart).forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value),
                        increasePrecipitation: Object.values(response.chart).map((value) => Number(value))[index]
                    });
                });
                setTableDataIncPrec(tableData);
            });
        axios
            .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.agriculture_url + 'q/', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then(({ data }) => {
                setCultureList(data);
            });
        fieldClimateAPI
            .getCalculationTemperature(
                station.id,
                'temp',
                22,
                Math.round(addHours(date[0], 3) / 1000),
                Math.round(addHours(date[1], 3) / 1000),
                10,
                24
            )
            .then(({ chart }) => {
                setChartDataIncTemp(
                    getChartData(
                        Object.values(chart).length
                            ? {
                                  degreesDays: Object.values(chart).map(({ degree_days }) => Number(degree_days)),
                                  degreesDaysUsa: Object.values(chart).map(({ degree_days_usa }) => Number(degree_days_usa))
                              }
                            : {},
                        Object.keys(chart)
                    )
                );
                let tableData = [];
                Object.keys(chart).forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value),
                        degreesDays: Object.values(chart).map(({ degree_days }) => Number(degree_days))[index],
                        degreesDaysUsa: Object.values(chart).map(({ degree_days_usa }) => Number(degree_days_usa))[index]
                    });
                });
                setTableDataIncTemp(tableData);
            });
    }, [date[0], date[1], station.id]);

    return (
        <div>
            <ChartMainCard title="Потребность растений во влаге и тепле" settings />
            <MainCardChartAndTable
                title="Нарастающее количество осадков и сумма активных температур"
                subheader="Данные получены из API Fieldclimate"
                tableData={tableDataIncPrec}
                setTableData={setTableDataIncPrec}
                chartTitle="Нарастающее количество осадков, mm"
                chartRootName="chart2"
                freq="hourly"
                chartData={chartDataIncPrec}
                columnNames={[{ key: 'increasePrecipitation', name: 'Нарастающее количество осадков' }]}
                cultureList={cultureList}
                chartDataTemp={chartDataIncTemp}
                tableDataTemp={tableDataIncTemp}
                setTableDataTemp={setTableDataIncTemp}
            />

            <MainCard>
                <ColumnChart
                    titleChart="Количество осадков по месяцам"
                    chartRootName="prec"
                    data={chartData}
                    intervalTimeUnit="month"
                    intervalCount={1}
                />
            </MainCard>
        </div>
    );
};

export default CornPage;
