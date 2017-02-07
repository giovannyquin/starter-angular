/**
 * Created by ssierrao on 19/12/2016.
 */
let d3 = require('d3');
export class GraphicController {
    options: any;
    data: [any];

    constructor() {
    }

    $onInit() {
        console.log('graphic');
        this.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d: any){console.log('d-x ', d.label); return d.label; },
                y: function(d: any){ return d.value; },
                showValues: true,
                valueFormat: function(d:any ){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };

        this.data = [{
            key: 'Cumulative Return',
            values: [
                { 'label' : 'A' , 'value' : -29.765957771107 },
                { 'label' : 'B' , 'value' : 0 },
                { 'label' : 'C' , 'value' : 32.807804682612 },
                { 'label' : 'D' , 'value' : 196.45946739256 },
                { 'label' : 'E' , 'value' : 0.19434030906893 },
                { 'label' : 'F' , 'value' : -98.079782601442 },
                { 'label' : 'G' , 'value' : -13.925743130903 },
                { 'label' : 'H' , 'value' : -5.1387322875705 }
            ]
        }];
    }

}

const GraphicComponent = {
    template: require('./graphic.html'),
    controller: GraphicController
};

export default GraphicComponent;
