let Highcharts = require('highcharts');
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

class GaugesController implements ng.IController {
    options: any;
    dashboard: any;
    constructor() {

    }

    $onInit() {
        this.options = {
            gridType: 'fit',
            itemChangeCallback: function() {},
            margin: 10,
            outerMargin: true,
            draggable: {
                enabled: true,
                stop: function() {}
            },
            resizable: {
                enabled: true,
                stop: function() {}
            }
        };

        this.dashboard = [
            {cols: 2, rows: 1, y: 0, x: 0},
            {cols: 2, rows: 1, y: 0, x: 2},
            {cols: 2, rows: 1, y: 0, x: 4},
            {cols: 2, rows: 1, y: 1, x: 0}
        ];


    }

    chargeGraphics () {
        this.setData();
        this.solidGauge();
        this.thermomether();
    }

    setData (): void {

        Highcharts.chart('gauge-1', {

                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: 'Speedometer'
                },

                pane: {
                    startAngle: -180,
                    endAngle: 180,
                    background: [{
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: 200,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: 'km/h'
                    },
                    plotBands: [{
                        from: 0,
                        to: 120,
                        color: '#55BF3B' // green
                    }, {
                        from: 120,
                        to: 160,
                        color: '#DDDF0D' // yellow
                    }, {
                        from: 160,
                        to: 200,
                        color: '#DF5353' // red
                    }]
                },

                series: [{
                    name: 'Speed',
                    data: [80],
                    tooltip: {
                        valueSuffix: ' km/h'
                    }
                }]

            },
// Add some life
            function (chart: any) {
                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0],
                            newVal: any,
                            inc = Math.round((Math.random() - 0.5) * 20);

                        newVal = point.y + inc;
                        if (newVal < 0 || newVal > 200) {
                            newVal = point.y - inc;
                        }

                        point.update(newVal);

                    }, 3000);
                }
            });
    }

    solidGauge() {
        var gaugeOptions: any = {

            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };

// The speed gauge
        var chartSpeed: any = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 200,
                title: {
                    text: 'Speed'
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Speed',
                data: [80],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">km/h</span></div>'
                },
                tooltip: {
                    valueSuffix: ' km/h'
                }
            }]

        }));

// The RPM gauge
        var chartRpm: any = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 5,
                title: {
                    text: 'RPM'
                }
            },

            series: [{
                name: 'RPM',
                data: [1],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                    '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
                },
                tooltip: {
                    valueSuffix: ' revolutions/min'
                }
            }]

        }));

// Bring life to the dials
        setInterval(function () {
            // Speed
            var point: any,
                newVal: any,
                inc: any;

            if (chartSpeed) {
                point = chartSpeed.series[0].points[0];
                inc = Math.round((Math.random() - 0.5) * 100);
                newVal = point.y + inc;

                if (newVal < 0 || newVal > 200) {
                    newVal = point.y - inc;
                }

                point.update(newVal);
            }

            // RPM
            if (chartRpm) {
                point = chartRpm.series[0].points[0];
                inc = Math.random() - 0.5;
                newVal = point.y + inc;

                if (newVal < 0 || newVal > 5) {
                    newVal = point.y - inc;
                }

                point.update(newVal);
            }
        }, 2000);
    }

    thermomether (): void {
        (function (H) {
            var defaultOptions = H.getOptions(),
                extendClass = H.extendClass,
                merge = H.merge,
                seriesTypes = H.seriesTypes;
            /**
             * The series type factory. This will be included in HC5.
             */
            H.seriesType = function (type: any, parent: any, options: any, props: any) {

                // Merge the options
                defaultOptions.plotOptions[type] = merge(
                    defaultOptions.plotOptions[parent],
                    options
                );

                // Create the class
                seriesTypes[type] = extendClass(seriesTypes[parent], props);
            };

            H.seriesType('marker', 'scatter', null, {
                drawPoints: function () {
                    var series = this,
                        chart = this.chart,
                        renderer = chart.renderer,
                        method: any;

                    H.each(this.points, function (point: any) {

                        if (!point.graphic) {
                            point.graphic = renderer.g()
                                .attr({
                                    zIndex: 9
                                })
                                .add();
                            point.line = renderer.path([
                                'M', 0, 0,
                                'L', chart.plotWidth - 2, 0,
                                'z'
                            ]).attr({
                                'stroke-width': 1,
                                'stroke': 'red'
                            }).add(point.graphic);
                            point.wings = renderer.rect(-10, -10, chart.plotWidth + 20, 20, 5)
                                .attr({
                                    fill: 'none',
                                    'stroke': 'gray',
                                    'stroke-width': 2
                                })
                                .add(point.graphic)
                            method = 'attr';
                        } else {
                            method = 'animate';
                        }

                        point.graphic[method]({
                            translateX: chart.plotLeft,
                            translateY: chart.plotTop + point.plotY
                        });

                    });
                }
            })
        }(Highcharts));

        let ther = Highcharts.chart('thermometer',{

            chart: {
                marginLeft: 70,
                marginRight: 70,
                marginTop: 40,
                plotBorderWidth: 1,
                plotBackgroundColor: '#EEEEEE',
                type: 'marker'
            },

            title: {
                text: 'Marker gauge',
                align: 'left'
            },
            credits: {
                enabled: false
            },

            yAxis: {
                min: 0,
                max: 100,
                opposite: true,
                tickInterval: 10,
                tickWidth: 1,
                tickLength: 10,
                gridLineWidth: 0,
                minorTickWidth: 1,
                minorTickLength: 5,
                minorTickInterval: 2,
                minorGridLineWidth: 0,
                offset: 3,
                title: {
                    text: null
                },
                left: 72,
                width: 10,
                top: 50,
                height: 220,
                plotBands: [{
                    from: 0,
                    to: 50,
                    color: '#55BF3B' // green
                }, {
                    from: 50,
                    to: 80,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 80,
                    to: 100,
                    color: '#DF5353' // red
                }]
            },

            xAxis: {
                labels: {
                    enabled: false
                },
                tickLength: 0,
                min: 0,
                max: 1,
                left: 72,
                width: 10
            },

            series: [{
                data: [50],
                animation: false,
                showInLegend: false
            }]

        });

        setInterval(function () {
            // Speed
            var point: any,
                newVal: any,
                inc: any;

            // RPM
                point = ther.series[0].points[0];
                newVal = Math.floor(Math.random() * (100 - 0)) + 0;
                /*newVal = point.y + inc;

                if (newVal < 0 || newVal > 5) {
                    newVal = point.y - inc;
                }
*/
                point.update(newVal);

        }, 2000);

    }
}

const GaugesComponent = {
    template: require('./gauges.html'),
    controller: GaugesController
};

export default GaugesComponent;
