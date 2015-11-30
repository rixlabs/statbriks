(function () {
    'use strict';

    angular
        .module('app.sandbox')
        .directive('sandy', sandy);

    function sandy() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'src/sandbox/sandy.directive.html',
            scope: {
                max: '='
            },
            link: linkFunc,
            controller: SandyController,
            // note: This would be 'ExampleController' (the exported controller name, as string)
            // if referring to a defined controller in its separate file.
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            console.log('LINK: scope.min = %s *** should be undefined', scope.min);
            console.log('LINK: scope.max = %s *** should be undefined', scope.max);
            console.log('LINK: scope.vm.min = %s', scope.vm.min);
            console.log('LINK: scope.vm.max = %s', scope.vm.max);
        }
    }

    SandyController.$inject = [];

    function SandyController($scope) {
        // Injecting $scope just for comparison
        var vm = this;

        vm.min = 3;
        vm.poldo = "POLDO";

        console.log('CTRL: vm.min = %s', vm.min);
        console.log('CTRL: vm.max = %s', vm.max);
    }

})();