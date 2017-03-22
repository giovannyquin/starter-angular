export class MessageDirective implements ng.IDirective {

    restrict = 'A';
    require = 'ngModel';
    replace = true;
    template= require('../message-comment/message-comment.html');


    constructor(private $timeout: ng.ITimeoutService) {
    }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
        this.$timeout( () => {
            element[0].focus();
        }, 10);
    };

    static factory(): ng.IDirectiveFactory {

        const directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService) => new MessageDirective($timeout);
        directive.$inject = ["$timeout"];
        return directive;
    }
}