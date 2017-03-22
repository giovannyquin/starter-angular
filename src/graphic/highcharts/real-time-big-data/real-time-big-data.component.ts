let Highcharts = require('highcharts/highstock');
class RealTimeBigDataController implements ng.IController {
    chart: any;
    intervalTime: number;
    dataInitial: number;
    constructor (public $scope:any, public $compile:any) {
        this.intervalTime = 1000;
        this.dataInitial = 1000;
    }

    $onInit() {
        this.init(this);
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    reDraw () {
        this.init(this);
        /*this.chart.series[0].setData(this.chargeData(), true);
        this.chart.series[1].setData(this.chargeData(), true);
        this.chart.series[2].setData(this.chargeData(), true);
        this.chart.series[3].setData(this.chargeData(), true);
        this.chart.series[4].setData(this.chargeData(), true);
        this.chart.series[5].setData(this.chargeData(), true);
        this.chart.series[6].setData(this.chargeData(), true);
        this.chart.series[7].setData(this.chargeData(), true);
        this.chart.series[8].setData(this.chargeData(), true);
        this.chart.series[9].setData(this.chargeData(), true);
        this.chart.redraw();*/
    }

    chargeData () {
            // generate an array of random data
        var data: any = [],
            time = (new Date()).getTime(),
            i: any;

        for (i = (this.dataInitial * -1); i <= 0; i += 1) {
            data.push([
                time + i * 1000,
                this.getRandomInt(0, 2000)
            ]);
        }
        return data;
    }

    init(parent: RealTimeBigDataController) {
        this.chart = new Highcharts.stockChart({
            chart: {
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var series2 = this.series[1];
                        var series3 = this.series[2];
                        var series4 = this.series[3];
                        var series5 = this.series[4];
                        var series6 = this.series[5];
                        var series7 = this.series[6];
                        var series8 = this.series[7];
                        var series9 = this.series[8];
                        var series10 = this.series[9];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = parent.getRandomInt(0, 2000);
                            series.addPoint([x, y], true, true);
                            let y2 = parent.getRandomInt(0, 2000);
                            let y3 = parent.getRandomInt(0, 2000);
                            let y4 = parent.getRandomInt(0, 2000);
                            let y5 = parent.getRandomInt(0, 2000);
                            let y6 = parent.getRandomInt(0, 2000);
                            let y7 = parent.getRandomInt(0, 2000);
                            let y8 = parent.getRandomInt(0, 2000);
                            let y9 = parent.getRandomInt(0, 2000);
                            let y10 = parent.getRandomInt(0, 2000);
                            series2.addPoint([x, y2], true, true);
                            series3.addPoint([x, y3], true, true);
                            series4.addPoint([x, y4], true, true);
                            series5.addPoint([x, y5], true, true);
                            series6.addPoint([x, y6], true, true);
                            series7.addPoint([x, y7], true, true);
                            series8.addPoint([x, y8], true, true);
                            series9.addPoint([x, y9], true, true);
                            series10.addPoint([x, y10], true, true);
                        }, parent.intervalTime);
                    }
                },
                zoomType: 'x',
                renderTo: 'containerHours',
                inverted: true
            },

            plotOptions: {
                series: {
                    cursor: 'pointer',
                    turboThreshold: 0,
                    marker: {
                        lineWidth: 1
                    }
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },

            rangeSelector: {
                buttons: [{
                    count: 1,
                    type: 'hour',
                    text: '1H'
                }, {
                    count: 4,
                    type: 'hour',
                    text: '4H'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0
            },

            navigator: {
                enabled: true
            },

            title: {
                text: 'Live random big data'
            },

            xAxis: {
                type: 'datetime',
                tickPixelInterval: 10,
                minorTickWidth: 1,
                gridLineWidth: 2,
                plotBands: [{
                    color: '#FCFFC5',
                    from: (new Date()).getTime(),
                    to: (new Date()).getTime()+ 1000 ,
                    id: 'plotband-1'
                }]
            },

            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },

            exporting: {
                enabled: true
            },

            legend: {
                enabled: true
            },

            series: [
                {
                    name: 'Serie 1',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 2',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 3',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 4',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 5',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 6',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 7',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 8',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 9',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                },
                {
                    name: 'Serie 10',
                    data: (function () {
                        // generate an array of random data
                        var data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = (parent.dataInitial * -1); i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                parent.getRandomInt(0, 2000)
                            ]);
                        }
                        return data;
                    }())
                }
            ]
        });
    }

}

const RealTimeBigDataComponent = {
    template: require('./real-time-big-data.html'),
    controller: RealTimeBigDataController
};

export default RealTimeBigDataComponent;