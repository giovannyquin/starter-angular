/**
 * Created by GQuinteroO on 2/16/2017.
 */
import './real-time.less';
let Highcharts = require('highcharts/highstock');
/**
 * Highcharts pattern fill plugin
 *
 * Author:         Torstein Honsi
 * Last revision:  2014-04-29
 * License:        MIT License
 *
 * Options:
 * - pattern:      The URL for a pattern image file
 * - width:        The width of the image file
 * - height:       The height of the image file
 * - color1:       In oldIE, bright colors in the pattern image are replaced by this color.
 *                 Not yet implemented in SVG.
 * - color2:       In oldIE, dark colors are replaced by this.
 */

/*global Highcharts */
(function() {

    'use strict';

    var idCounter = 0;
    var markup: any,
        id: any,
        pattern: any,
        image: any;
    Highcharts.wrap(Highcharts.SVGElement.prototype, 'fillSetter', function (proceed: any, color: any, prop: any, elem: any) {

        if (color && color.pattern && prop === 'fill') {
            id = 'highcharts-pattern-' + idCounter++;
            pattern = this.renderer.createElement('pattern')
                .attr({
                    id: id,
                    patternUnits: 'userSpaceOnUse',
                    width: color.width,
                    height: color.height
                })
                .add(this.renderer.defs);
            image = this.renderer.image(
                color.pattern, 0, 0, color.width, color.height
            ).add(pattern);
            elem.setAttribute(prop, 'url(' + this.renderer.url + '#' + id + ')');
        } else {
            return proceed.call(this, color, prop, elem);
        }
    });

    if (Highcharts.VMLElement) {
        Highcharts.wrap(Highcharts.Renderer.prototype.Element.prototype, 'fillSetter', function (proceed:any, color:any, prop:any, elem:any) {

            if (color && color.pattern && prop === 'fill') {
                // Remove previous fills
                if (elem.getElementsByTagName('fill').length) {
                    elem.removeChild(elem.getElementsByTagName('fill')[0]);
                }

                // If colors are given, use those, else use the original colors
                // of the pattern tile
                if (color.color1 && color.color2) {
                    markup = ['<hcv:', prop, ' color="', color.color1, '" color2="',
                        color.color2, '" type="pattern" src="', color.pattern, '" />'].join('');
                } else {
                    markup = this.renderer.prepVML(['<', prop, ' type="tile" src="', color.pattern, '" />']);
                }

                elem.appendChild(
                    document.createElement(markup)
                );

                // Work around display bug on updating attached nodes
                if (elem.parentNode.nodeType === 1) {
                    elem.outerHTML = elem.outerHTML
                }

            } else {
                return proceed.call(this, color, prop, elem);
            }
        });
    }
})();
class RealTimeHighController implements ng.IController {
    public pause:boolean = false;
    chart:any;
    constructor (public $scope:any, public $compile:any, public $uibModal: ng.ui.bootstrap.IModalService) {
        this.pause = false;
    }

    $onInit() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        Highcharts.pause = this.pause;
        Highcharts.$scope = this.$scope;
        Highcharts.$compile = this.$compile;
       this.highChart2(this);

        /*let gfxPath = 'https://raw.githubusercontent.com/highslide-software/pattern-fill/master/graphics/';

        let chart = new Highcharts.Chart({

            chart: {
                renderTo: 'container'
            },

            title: {
                text: 'Pattern fill plugin demo'
            },

            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            yAxis: {
                plotBands: [{
                    from: 100,
                    to: 200,
                    color: {
                        pattern: gfxPath + 'pattern3.png',
                        width: 6,
                        height: 6
                    }
                }]
            },

            series: [{
                type: 'area',
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                fillColor: {
                    pattern: gfxPath + 'pattern1.png',
                    width: 6,
                    height: 6
                }
            }, {
                type: 'column',
                data: [148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6],
                color: {
                    pattern: gfxPath + 'pattern2.png',
                    width: 6,
                    height: 6,
                    // VML only:
                    color1: 'red',
                    color2: 'yellow'
                }
            }]

        });*/


    }

    findData (dataFind: any, series: any) {
        angular.forEach(series, (data, value) => {
            if(value === dataFind) return data;
        })
    }
    // flags only work on highstock, not on highchart
    highChart (parent: any) {
        this.chart = new Highcharts.stockChart({
            chart: {
                renderTo: 'container',
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                inverted: true,
                zoomType: 'x',
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        let series = this.series[0];
                        let seriesColumn = this.series[2];
                        this.myTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
                        setInterval( function () {
                            if ( parent.pause) return;
                            let x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                            seriesColumn.addPoint([x, 0], true, true);
                           /* parent.chart.addSeries({
                                type: 'flags',
                                data: [{
                                    x: x,
                                    title: 'I2',
                                    text: 'Gio'
                                }],
                                onSeries: 'dataseries',
                                shape: 'circlepin',
                                width: 16,
                                showInLegend: false
                            }, true);*/
                        }, 1000);
                        /*for(var a = 0; a <15; a++ ){
                         let x = (new Date()).getTime(), // current time
                         y = Math.random();
                         series.addPoint([x, y], true, true);
                         }*/
                    },
                    selection: function(event: any) {
                        console.log('selection ', event);
                        let a = parent.findData(event.xAxis[0].min, parent.chart.series[0].options.data)
                        parent.displayIssuesModal(this.x, this.y, parent);
                    }
                    /*,
                     click: function (e: any) {
                     console.log(
                     Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
                     e.yAxis[0].value
                     );
                     this.chart.myTooltip.useHTML = true;
                     this.chart.myTooltip.formatter = () => {
                     return Highcharts.$compile("<message-comment></message-comment>")(Highcharts.$scope).html();
                     };
                     this.chart.myTooltip.refresh(e.point, e);
                     }*/
                }
            },
            /*plotOptions: {
             series: {
             stickyTracking: false,
             events: {
             click: function(e) {
             /!*this.chart.myTooltip.useHTML = true;
             this.chart.myTooltip.refresh(evt.point, evt);*!/
             hs.htmlExpand(null, {
             pageOrigin: {
             x: e.pageX || e.clientX,
             y: e.pageY || e.clientY
             },
             headingText: this.series.name,
             maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
             this.y + ' visits',
             width: 200
             });
             }
             }

             }
             },*/
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    turboThreshold: 0,
                    point: {
                        events: {
                            click: function (e:any)  {
                                console.log('event ',e);
                                /*hs.htmlExpand(null, {
                                 pageOrigin: {
                                 x: e.pageX || e.clientX,
                                 y: e.pageY || e.clientY
                                 },
                                 headingText: this.series.name,
                                 maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                 this.y + ' visits',
                                 width: 200
                                 });*/
                                /*let a: any= new RealTimeHighController(RealTimeHighController.prototype.$scope,
                                 RealTimeHighController.prototype.$compile, RealTimeHighController.prototype.$uibModal).displayIssuesModal(this.x, this.y);*/
                                parent.displayIssuesModal(this.x, this.y, parent);
                            }
                        }
                    },
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
            navigator: {
                enabled: true
            },
            rangeSelector: {
                buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1M'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5M'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: true,
                selected: 0
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
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
            tooltip: {
                /* headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                 /!*pointFormat: function() { return '<b>' + this.series.name + '</b><br/>' +
                 Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                 Highcharts.numberFormat(this.y, 2)+ '<br/>'
                 },*!/
                 footerFormat: '</table>',
                 shared: true,*/
               /* useHTML: true,
                formatter:  () => {
                    return this.$compile("<message-comment></message-comment>")(this.$scope).html();
                },*/
                enabled: false

                /*formatter: function () {
                 return '<b>' + this.series.name + '</b><br/>' +
                 Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                 Highcharts.numberFormat(this.y, 2)+ '<br/>' +
                 '<div message></div> <message></message> <message-comment></message-comment>';
                 }*/
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                id: 'dataseries',
                data: (function () {
                    // generate an array of random data
                    let data: any = [],
                        time = (new Date()).getTime(),
                        i: any;

                    for (i = -10000; i <= 0; i += 1) {
                        /*data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });*/
                        data.push([
                            time + i * 1000,
                            Math.random()
                        ]);
                    }
                    return data;
                }())
            }, /*{
                type: 'flags',
                onSeries: 'dataseries',
                shape: 'circlepin',
                width: 16,
                showInLegend: false,
                animationLimit: 10,
                cropThreshold: 100,
                tooltip: {
                    enabled: true
                }
            },*/
                {
                    name: 'Lito1',
                    type: 'column',
                    data: (function () {
                        // generate an array of random data
                        let data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = -10000; i <= 0; i += 1) {
                            data.push({
                                y: 0
                            });
                        }
                        return data;
                    }()),
                    tooltip: {
                        valueSuffix: ' mm'
                    },
                    color: {
                        pattern: '../../../assets/images/lito1.png',
                        width: 6,
                        height: 6,
                        // VML only:
                        color1: 'red',
                        color2: 'yellow'
                    }

                },
                {
                    name: 'Lito2',
                    type: 'column',
                    data: (function () {
                        // generate an array of random data
                        let data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = -10000; i <= 0; i += 1) {
                            data.push({
                                y: 0
                            });
                        }
                        return data;
                    }()),
                    tooltip: {
                        valueSuffix: ' mm'
                    },
                    color: {
                        pattern: 'https://raw.githubusercontent.com/highslide-software/pattern-fill/master/graphics/pattern3.png',
                        width: 6,
                        height: 6
                    }

                }]
        });
    }

    highChart2 (parent: any) {
        this.chart = new Highcharts.stockChart({
            chart: {
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var series2 = this.series[1];
                        var series3 = this.series[2];
                        var series4 = this.series[3];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.round(Math.random() * 100);
                            series.addPoint([x, y], true, true);
                            series2.addPoint([x, 0], true, true);
                            series3.addPoint([x, 0], true, true);
                        }, 1000);
                    },
                    selection: function(event: any) {
                        console.log('selection ', event);
                        let a = parent.findData(event.xAxis[0].min, parent.chart.series[0].options.data);
                        parent.displayIssuesModal(this.x, this.y, parent);
                    }
                },
                zoomType: 'x',
                renderTo: 'container',
                inverted: true
            },

            plotOptions: {
                series: {
                    cursor: 'pointer',
                    turboThreshold: 0,
                    point: {
                        events: {
                            click: function (e:any)  {
                                console.log('event ',e);
                                /*hs.htmlExpand(null, {
                                 pageOrigin: {
                                 x: e.pageX || e.clientX,
                                 y: e.pageY || e.clientY
                                 },
                                 headingText: this.series.name,
                                 maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                 this.y + ' visits',
                                 width: 200
                                 });*/
                                /*let a: any= new RealTimeHighController(RealTimeHighController.prototype.$scope,
                                 RealTimeHighController.prototype.$compile, RealTimeHighController.prototype.$uibModal).displayIssuesModal(this.x, this.y);*/
                                parent.displayIssuesModal(this.x, this.y, parent);
                            }
                        }
                    },
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
                    type: 'minute',
                    text: '1M'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5M'
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
                text: 'Live random data'
            },

            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
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
                enabled: false
            },

            legend: {
                enabled: true
            },

            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data: any = [],
                        time = (new Date()).getTime(),
                        i: any;

                    for (i = -10000; i <= 0; i += 1) {
                        data.push([
                            time + i * 1000,
                            Math.round(Math.random() * 100)
                        ]);
                    }
                    return data;
                }())
            },

                {
                    name: 'Lito1',
                    type: 'column',
                    data: (function () {
                        // generate an array of random data
                        let data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = -10000; i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                0
                            ]);
                        }
                        return data;
                    }()),
                    tooltip: {
                        valueSuffix: ' mm'
                    },
                    color: {
                        pattern: '../../../assets/images/lito1.png',
                        width: 6,
                        height: 6,
                        // VML only:
                        color1: 'red',
                        color2: 'yellow'
                    }

                },
                {
                    name: 'Lito2',
                    type: 'column',
                    data: (function () {
                        // generate an array of random data
                        let data: any = [],
                            time = (new Date()).getTime(),
                            i: any;

                        for (i = -10000; i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                0
                            ]);
                        }
                        return data;
                    }()),
                    tooltip: {
                        valueSuffix: ' mm'
                    },
                    color: {
                        pattern: 'https://raw.githubusercontent.com/highslide-software/pattern-fill/master/graphics/pattern3.png',
                        width: 6,
                        height: 6
                    }

                }
                ]
        });
    }

    addSeries(x: any, comment: any, parent: any, y:any, multipleSelect: any, percent: any, from:any, to:any): void {
        console.log('addseries', x, comment, multipleSelect);
        /*parent.chart.addSeries({
            type: 'flags',
            data: [{
                x: x,
                title: 'I2',
                text: comment
            }],
            onSeries: 'dataseries',
            shape: 'circlepin',
            width: 16,
            showInLegend: false
        }, false);*/
        // do some stuff

        parent.chart.renderer.rect(x, y, 100, 100, 0)
            .attr({
                'stroke-width': 0,
                stroke: '#888888',
                fill: '#888888',
                zIndex: 3
            })
            .add();

        parent.chart.xAxis[0].addPlotBand(
            {color: '#FCFFC5',
                from: x,
                to: x+1000,
                label: {
                    text: comment,
                    align: 'left'
                },
                zones: [{
                    value: 0.25,
                    className: 'zone-0'
                }, {
                    value: 1,
                    className: 'zone-1'
                }]
            });

        let fromFind = parent.findData(from, parent.chart.series[0].options.data);
        let toFind = parent.findData(from, parent.chart.series[0].options.data);
        console.log('from and to', fromFind, toFind);
        if(multipleSelect){
            let calc = (percent*y)/100;
            parent.chart.series[multipleSelect].addPoint([x, calc], true, true);
        }


        /*parent.chart.xAxis[0].plotLinesAndBands[parent.chart.xAxis[0].plotLinesAndBands.length -1 ].svgElem.attr({})
            .css({
                'color': '#8A4B08',
                'height': '80vh',
                'width': '20'
            });*/

        parent.chart.redraw();

        /*let flagSeries = this.chart.get("dataseries");
        flagSeries.addPoint({
            title: "FLAGHERE!",
            x: x
        });*/
    }

    changeGraphic (typeG: any) {
        if(typeG === 'point'){
            this.chart.series[0].update({
                type: 'spline',
                lineWidth: 0,
                marker: {
                    enabled: true,
                    radius: 2
                }
            });
        }
        else{

        }
        this.chart.series[0].update({
                type: typeG
        });
        //this.chart.redraw();
    }

    changeColor (colorT: any) {
        this.chart.series[0].update({

            color: colorT

        });
        //this.chart.redraw();
    }

    changeLineWidth (line:any) {
        this.chart.series[0].update({

            lineWidth: line

        });
        //this.chart.redraw();
    }

     displayIssuesModal (x?: any, y?:any, parent?: any) {
        console.log('x: ', x, 'y: ', y);
        this.$uibModal.open({
            animation: true,
            component: 'messageComment',
            resolve: {
                status: () => {
                    return 'Gio';
                },
                x: () => {
                    return x;
                },
                y: () => {
                    return y;
                },
                callback: () => {
                    return this.addSeries;
                },
                parent: () => {
                    return parent;
                }
            },
            windowTopClass: 'size-modal'
        });
    }
}

const RealTimeHighComponent = {
    template: require('./real-time.html'),
    controller: RealTimeHighController
};

export default RealTimeHighComponent;