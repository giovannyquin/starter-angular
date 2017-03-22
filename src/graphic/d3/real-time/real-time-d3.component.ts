import './real-time-d3.less';
let d3 = require('d3');
export class RealTimeD3Controller implements ng.IController {
    /*limit: any;
    duration: any;
    now: any;
    width: number;
    height: number;
    groups: any;
    x: any;
    y: any;
    line: any;
    svg: any;
    axis: any;
    paths: any;*/
    data: Array<any>;
    limitData: number;
    intervalTime: number;

    constructor () {
        this.limitData = 100;
        this.intervalTime = 1000;
    }

    $onInit () {

        //this.tick();
        //this.init();
        this.chargeData();
    }

    /*tick() {
        this.now = new Date();

        // Add new values
        for (let name in this.groups) {
            let group = this.groups[name];
            //group.data.push(group.value) // Real values arrive at irregular intervals
            group.data.push(20 + Math.random() * 100);
            group.path.attr('d', this.line);
        }

        // Shift domain
        console.log('other this.x ', this.x.domain);
        this.x.domain([this.now - (this.limit - 2) * this.duration, this.now - this.duration]);

        // Slide x-axis left
        this.axis.transition()
            .duration(this.duration)
            .ease('linear')
            .call(this.x.axis);

        // Slide paths left
        this.paths.attr('transform', null)
            .transition()
            .duration(this.duration)
            .ease('linear')
            .attr('transform', 'translate(' + this.x(this.now - (this.limit - 1) * this.duration) + ')')
            .each('end', this.tick);

        // Remove oldest data point from each group
        for (let name in this.groups) {
            let group = this.groups[name];
            group.data.shift();
        }
    }*/

    reDraw () {
        let svg = d3.select(".graph");
        svg.selectAll("*").remove();
        this.chargeData();
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    chargeData () {
        this.data = [];
        let limitInitData: any = this.limitData;

            let insert : Array<any> = [];
            let insert2 : Array<any> = [];
            let insert3 : Array<any> = [];
            let insert4 : Array<any> = [];
            let insert5 : Array<any> = [];
            let insert6 : Array<any> = [];
            let insert7 : Array<any> = [];
            let insert8 : Array<any> = [];
            let insert9 : Array<any> = [];
            let insert10 : Array<any> = [];
            for(let bb = 0; bb < limitInitData; bb++){
                 insert.push(this.getRandomInt(0, 2000));
                 insert2.push(this.getRandomInt(0, 2000));
                 insert3.push(this.getRandomInt(0, 2000));
                 insert4.push(this.getRandomInt(0, 2000));
                 insert5.push(this.getRandomInt(0, 2000));
                 insert6.push(this.getRandomInt(0, 2000));
                 insert7.push(this.getRandomInt(0, 2000));
                 insert8.push(this.getRandomInt(0, 2000));
                 insert9.push(this.getRandomInt(0, 2000));
                 insert10.push(this.getRandomInt(0, 2000));
            }
            this.data.push(insert);
            this.data.push(insert2);
            this.data.push(insert3);
            this.data.push(insert4);
            this.data.push(insert5);
            this.data.push(insert5);
            this.data.push(insert7);
            this.data.push(insert8);
            this.data.push(insert9);
            this.data.push(insert10);

       /* insert = [];
        for(let bb = 0; bb < limitInitData; bb++){
            insert.push(20 +Math.random() * 100);
        }
        this.data.push(insert);
        insert = [];
        for(let bb = 0; bb < limitInitData; bb++){
            insert.push(20 +Math.random() * 100);
        }
        this.data.push(insert);*/

        console.log('data ', this.data);
        this.init();

    }
    init() {
        let limit : any = 100,
            limitInitData: any = 100000,
            duration = this.intervalTime,
            now: any = new Date(Date.now() - duration);

        let margin = {top: 10, right: 10, bottom: 20, left: 40};
        let width : any = 400 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;


        let groups : any = {
            current: {
                value: 0,
                color: 'orange',
                data: this.data[0]
            },
            target: {
                value: 0,
                color: 'green',
                data:this.data[1]
            },
            output: {
                value: 0,
                color: 'grey',
                data: this.data[2]
            },
            track: {
                value: 0,
                color: 'red',
                data: this.data[3]
            },
            cosmos: {
                value: 0,
                color: 'yellow',
                data: this.data[4]
            },
            earth: {
                value: 0,
                color: 'blue',
                data: this.data[5]
            },
            moon: {
                value: 0,
                color: 'black',
                data: this.data[6]
            },
            door: {
                value: 0,
                color: 'purple',
                data: this.data[7]
            },
            backpack: {
                value: 0,
                color: 'brown',
                data: this.data[8]
            },
            nico: {
                value: 0,
                color: '#3366cc',
                data: this.data[9]
            }
        };

        let x : any = d3.time.scale()
            .domain([now - (limit - 2), now - duration])
            .range([0, height])

        let y : any = d3.scale.linear()
            .domain([0, 2100])
            .range([width, 0]);

        let line : any = d3.svg.line()
            .interpolate('basis')
            .x(function(d: any, i: any) {
                return x(now - (limit - 1 - i) * duration)
            })
            .y(function(d: any) {
                return y(d)
            })

        let svg : any = d3.select('.graph').append('svg')
            .attr('class', 'chart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        let axis : any = svg.append('g')
            .attr('class', 'y axis')
            .call(x.axis = d3.svg.axis().scale(x).orient('left'))
            .attr('transform', 'translate(45,20)')

        let g = svg.append("g")
            .attr("transform", "translate(400,20) rotate(180)");

        g.append("g")
            .attr("class", "x axis")
            .call(d3.svg.axis().scale(y).orient("bottom"));

        let paths : any = svg.append('g')

        for (let name in groups) {
            let group : any = groups[name]
            group.path = paths.append('path')
                .data([group.data])
                .attr('class', name + ' group')
                .style('stroke', group.color)
                .attr("transform", 'translate(400,20) rotate(90)')
        }

         function tick() {
            now = new Date()

            // Add new values
            for (let name in groups) {
                let group: any = groups[name]
                //group.data.push(group.value) // Real values arrive at irregular intervals
                group.data.push(Math.floor(Math.random() * (2000 - 0)) + 0)
                group.path.attr('d', line)
            }

            // Shift domain
            x.domain([now - (limit - 2) * duration, now - duration])

            // Slide x-axis left
            axis.transition()
                .duration(duration)
                .ease('linear')
                .call(x.axis)

            // Slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease('linear')
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .each('end', tick)

            // Remove oldest data point from each group
            for (let name in groups) {
                let group: any = groups[name]
                group.data.shift()
            }
        }

        tick()

        function make_x_axis() {
            return d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(5)
        }

        function make_y_axis() {
            return d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(5)
        }
    }

}

const RealTimeD3Component = {
    template: require('./real-time-d3.html'),
    controller: RealTimeD3Controller
};

export default RealTimeD3Component;