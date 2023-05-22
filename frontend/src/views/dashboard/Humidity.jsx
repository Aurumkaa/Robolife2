import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';

const Humidity = () => {
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [lastData, setLastData] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);
    const station = useSelector((state) => state.station);
    const AddDay = (d, cnt) => {
        var dat = new Date(d);
        dat.setDate(dat.getDate() + cnt);
        return dat;
    };
    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
            .then((response) => {
                setChartData(getChartData(response.data.length ? { humidity: response.data[4].values.time } : {}, response.dates));
                let tableData = [];
                response.dates.forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value),
                        humidity: response.data[4].values.time[index]
                    });
                });
                setTableData(tableData);
            });
        fieldClimateAPI
            .getForecast(station.id, Math.round(AddDay(new Date(), -3).getTime() / 1000), Math.round(new Date().getTime() / 1000))
            .then((response) => {
                setLastData(getChartData(response.data.length ? { humidity: response.data[4].values.time } : {}, response.dates));
                console.log('last data', lastData);
            });
    }, [date[0], date[1], freq, station.id]);

    return (
        <div>
            <ChartMainCard title="Влажность" />
            <MainCardChartAndTable
                title="Влажность листа"
                subheader="Данные получены из API Fieldclimate"
                tableData={tableData}
                setTableData={setTableData}
                chartData={chartData}
                freq={freq}
                chartTitle="Влажность листа"
                chartRootName="chart1"
                columnNames={[{ key: 'humidity', name: 'Влажность листа' }]}
            />
        </div>
    );
};

export default Humidity;
