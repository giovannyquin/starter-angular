import {module as ngMogule} from 'angular';
import GraphicComponent from './graphic.component';
import RealTimeComponent from './real-time/real-time.component';

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

        $stateProvider.state('/', conf);
        $stateProvider.state('/real-time', realTimeConf);
    }
}

export default ngMogule('app.graphic', [])
    .component('graphic', GraphicComponent)
    .component('realTime', RealTimeComponent)
    .config(Config).name;