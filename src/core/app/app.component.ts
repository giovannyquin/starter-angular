/**
 * Created by vicman on 10/27/16.
 */
import './app.less';
/*import  EventsService  from '../../shared/services/events/events.service';
import Event from '../models/event';
import {MicroservicesConfig} from '../../shared/api/microservices/microservices';*/


export class AppCtrl {
    eventName: string;

    static $inject = [ '$scope'];

    constructor( private $scope: ng.IScope) {

    }

    $onInit() {
        this.getInfo();
    }

    getInfo(): void {
        console.log('app');
    }
}


const AppComponent = {
    template: require('./app.html'),
    controller: AppCtrl
};

export default AppComponent;