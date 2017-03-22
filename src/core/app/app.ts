import {module as ngMogule} from 'angular';
//import TranslateConfig from './app.configuration';
import 'angular-ui-router';
import 'angular-translate';
import 'd3';
import 'nvd3/build/nv.d3';
import 'angular-nvd3/dist/angular-nvd3';
import 'highcharts';
import 'lodash/lodash.js';
import 'javascript-detect-element-resize/detect-element-resize.js';
import 'angular-gridster2/dist/gridster.js';

// Load boostrap styles
import 'bootstrap/dist/css/bootstrap.css';
import 'angular-ui-bootstrap';
import 'nvd3/build/nv.d3.css';
import 'angular-gridster2/dist/gridster.css';

// Config
import AppRoutes from './app.routes';

// modules
/*import SearchUserModule from '../../searchUser/searchUser';
import LanguageChoice from '../../language-choice/languageChoice';
import SetupConfiguration from '../../setup/configuration';
import BadgePreview from  '../../badge/badge';*/
import GraphicComponent from '../../graphic/graphic';


// Api
/*import Microservices from '../../shared/api/microservices/microservices';
import Tranlations from '../../shared/api/translations/translations';*/

// Component
import AppComponent from './app.component';
/*import HeaderComponent from '../header/header.component';
import BackComponent from '../back/back.component';*/

// Services
//import EventsService from '../../shared/services/events/events.service';

/**************************************************/
/*the next array definitions are the list of modules
 to load as dependencies of main app module*/
/**************************************************/
const libList: Array<string> = [
    'ui.router',
    'pascalprecht.translate',
    'ui.bootstrap',
    'nvd3',
    'angular-gridster2'
];
const apiList: Array<string> = [

];

const modulesList: Array<string> = [
    GraphicComponent
];
/****************************************************/
/*Project constants*/
/****************************************************/
const AppConstants: {
    'serviceBaseUrl': string,
    'contextEvents': string,
    'contextKiosk': string} = {
    'serviceBaseUrl': 'localhost:8080',
    'contextEvents': 'translations/events.kyani.net',
    'contextKiosk': 'translations/kiosk.kyani.net'
};
/************************************************/

let dependencies = libList
    .concat(apiList)
    .concat(modulesList);


export default ngMogule('app', dependencies)
    .component('app', AppComponent)
    /*.component('headerComponent', HeaderComponent)
    .component('backButton', BackComponent)
    .service('eventsService', EventsService)*/
    //.constant('appConstants', AppConstants)
    //.config(TranslateConfig)
    .config(AppRoutes).name;
