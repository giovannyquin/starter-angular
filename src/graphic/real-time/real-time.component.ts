import './real-time.less';
let d3 = require('d3');
class RealTimeController implements ng.IController {
    options: any;
    options1: any;
    data: [any];
    run:boolean;

    constructor (private $scope: ng.IScope) {

    }

    $onInit(){
        this.setData();
        this.realTime();
    }

    setData () {
        this.options = {
            chart: {
                type: 'lineChart',
                height: 180,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d: any){ return d.x; },
                y: function(d: any){ return d.y; },
                useInteractiveGuideline: true,
                duration: 500,
                yAxis: {
                    tickFormat: function(d: any){
                        return d3.format('.01f')(d);
                    }
                }
            }
        };

        this.options1 = angular.copy(this.options);
        this.options1.chart.duration = 0;
        this.options1.chart.yDomain = [-1,1];

        this.data = [{ values: [], key: 'Random Walk' },
                        { values: [], key: 'Random Gio' },
                        { values: [], key: 'Random Master' }];

        this.run = true;
    }

    realTime () {
        debugger;
        let x = 0;
        setInterval(() => {
            if (!this.run) return;
            this.data[0].values.push({ x: x,	y: Math.random() - 0.5});
            this.data[1].values.push({ x: x,	y: Math.random() - 0.5});
            this.data[2].values.push({ x: x,	y: Math.random() - 0.5});
            //this.data=this.generateData();
            if (this.data[0].values.length > 50) this.data[0].values.shift();
            if (this.data[1].values.length > 50) this.data[1].values.shift();
            if (this.data[2].values.length > 50) this.data[2].values.shift();
            x++;

            this.$scope.$apply(); // update both chart
        }, 500);
    }

    /* Random Data Generator (took from nvd3.org) */
    generateData() {
        return this.stream_layers(3,10+Math.random()*200,.1).map((data: any, i: any) => {
            return {
                key: 'Stream' + i,
                values: data
            };
        });
    }

    /* Inspired by Lee Byron's test data generator. */
    stream_layers(n: any, m: any, o: any) {
        if (arguments.length < 3) o = 0;
        let bump = (a: any) => {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < m; i++) {
                var w = (i / m - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        return d3.range(n).map(() => {
            var a: any = [], i:any;
            for (i = 0; i < m; i++) a[i] = o + o * Math.random();
            for (i = 0; i < 5; i++) bump(a);
            return a.map(this.stream_index);
        });
    }

    /* Another layer generator using gamma distributions. */
    stream_waves(n: any, m: any) {
        return d3.range(n).map((i: any) => {
            return d3.range(m).map((j: any) => {
                var x = 20 * j / m - i / 3;
                return 2 * x * Math.exp(-.5 * x);
            }).map(this.stream_index);
        });
    }

     stream_index(d: any, i: any) {
        return {x: i, y: Math.max(0, d)};
    }
}

const RealTimeComponent = {
    template: require('./real-time.html'),
    controller: RealTimeController
};

export default RealTimeComponent;
