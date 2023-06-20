import moment from 'moment/moment';

const AddDay = (d, cnt) => {
    var date = new Date(d);
    date.setDate(date.getDate() + cnt);
    return date;
};

function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

const getResultCategory = (x) => {
    if (x == 0) {
        return ' ожидаются <br> <b>неблагоприятные</b> условия';
    } else if (x == 2) {
        return ' ожидаются <br> <b>возможно благоприятные</b> условия';
    } else return ' ожидаются <br> <b>оптимальные</b> условия';
};

const setHeatMapOptions = (arr, setOptionsHeat) => {
    setOptionsHeat({
        credits: {
            enabled: false
        },
        chart: {
            scrollablePlotArea: {
                minWidth: 800
            },
            type: 'heatmap',
            marginBottom: 80,
            plotBorderWidth: 1,
            height: 260
            // marginLeft: 90
        },

        title: {
            text: ''
        },

        xAxis: {
            categories: [
                '00:00',
                '01:00',
                '02:00',
                '03:00',
                '04:00',
                '05:00',
                '06:00',
                '07:00',
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
                '23:00'
            ]
        },

        yAxis: {
            offset: 10,
            categories: [
                moment(new Date()).format('DD.MM'),
                moment(AddDay(new Date(), 1)).format('DD.MM'),
                moment(AddDay(new Date(), 2)).format('DD.MM'),
                moment(AddDay(new Date(), 3)).format('DD.MM')
            ],
            title: null,
            reversed: true
        },

        accessibility: {
            point: {
                descriptionFormatter: function (point) {
                    var ix = point.index + 1,
                        xName = getPointCategoryName(point, 'x'),
                        yName = getPointCategoryName(point, 'y'),
                        val = point.value;
                    return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
                }
            }
        },

        colorAxis: {
            dataClasses: [
                {
                    from: 0,
                    to: 0.5,
                    name: 'Неблагоприятные часы',
                    color: 'rgba(171,171,171,0.37)'
                },
                {
                    from: 0.5,
                    to: 1,
                    name: 'Благоприятные часы',
                    color: '#6cc459'
                },
                {
                    from: 1.5,
                    to: 2,
                    name: 'Возможно благоприятные часы',
                    color: '#e1e77a'
                }
            ]
        },

        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            margin: 0,
            y: 25,
            symbolHeight: 10
        },

        tooltip: {
            formatter: function () {
                return (
                    '<b>' +
                    getPointCategoryName(this.point, 'y') +
                    '</b> в <b>' +
                    getPointCategoryName(this.point, 'x') +
                    '</b>' +
                    getResultCategory(this.point.value) +
                    '<br><b>' +
                    '</b>для химических обработок'
                );
            }
        },

        series: [
            {
                borderRadius: 5,
                pointPadding: 5,
                name: 'Sales per employee',
                data: arr,
                dataLabels: {
                    // enabled: true,
                    // color: '#000000'
                }
            }
        ],

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return this.value.charAt(0);
                                }
                            }
                        }
                    }
                }
            ]
        }
    });
};

export default setHeatMapOptions;
