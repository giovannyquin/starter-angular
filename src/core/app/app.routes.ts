export default class RoutesConfig {
    static $inject = ['$stateProvider', '$urlRouterProvider'];

    constructor($stateProvider: angular.ui.IStateProvider,
                $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                template: '<app></app>'
            });
    }
}
