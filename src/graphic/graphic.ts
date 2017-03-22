import {module as ngMogule} from 'angular';
import GraphicComponent from './graphic.component';
import RealTimeComponent from './real-time/real-time.component';
import RealTimeHighComponent from './highcharts/real-time/real-time-high.component';
import RealTimeHighHoursComponent from './highcharts/real-time-hours/real-time-high-hours.component';
import GaugesComponent from './highcharts/gauges/gauges.component';
import MessageCommentComponent from './highcharts/message-comment/message-comment.component';
import RealTimeD3Component from './d3/real-time/real-time-d3.component';
import RealTimeBigDataComponent from './highcharts/real-time-big-data/real-time-big-data.component';
import { MessageDirective } from './highcharts/directives/message.directive';

class Config {
    static $inject = ['$stateProvider'];

    constructor($stateProvider: angular.ui.IStateProvider) {
        let conf = {
            url: '/',
            template: '<graphic></graphic>'
        };

        let realTimeConf = {
            url: '/real-time',
            template: '<real-time></real-time>'
        };

        let realTimeHoursConf = {
            url: '/real-time-hours',
            template: '<real-time-high-hours></real-time-high-hours>'
        };

        let realTimeHighConf = {
            url: '/real-time-high',
            template: '<real-time-high></real-time-high>'
        };

        let realTimeD3Conf = {
            url: '/real-time-d3',
            template: '<real-time-d3></real-time-d3>'
        };
        let realTimeBigDataConf = {
            url: '/real-time-big-data',
            template: '<real-time-big-data></real-time-big-data>'
        };

        let messageCommentConf = {
            url: '/message-comment',
            template: '<message-comment></message-comment>'
        };

        let gaugesHighConf = {
            url: '/gauges-high',
            template: '<gauges-high></gauges-high>'
        };

        $stateProvider.state('/', conf);
        $stateProvider.state('/real-time', realTimeConf);
        $stateProvider.state('/real-time-high', realTimeHighConf);
        $stateProvider.state('/real-time-hours-high', realTimeHoursConf);
        $stateProvider.state('/real-time-d3', realTimeD3Conf);
        $stateProvider.state('/real-time-big-data', realTimeBigDataConf);
        $stateProvider.state('/message', messageCommentConf);
        $stateProvider.state('/gauges-high', gaugesHighConf);
    }
}

export default ngMogule('app.graphic', [])
    .component('graphic', GraphicComponent)
    .component('realTime', RealTimeComponent)
    .component('realTimeHigh', RealTimeHighComponent)
    .component('realTimeHighHours', RealTimeHighHoursComponent)
    .component('messageComment', MessageCommentComponent)
    .component('gaugesHigh', GaugesComponent)
    .component('realTimeD3', RealTimeD3Component)
    .component('realTimeBigData', RealTimeBigDataComponent)
    .directive('message', MessageDirective.factory())
    .config(Config).name;