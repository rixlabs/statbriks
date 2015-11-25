(function () {
    'use strict';

    angular
        .module('app.sandbox')
        .controller('SandboxController', SandboxController);

    /* SandboxController.$inject = ['$q','logger','sandboxdataservice','dummylist']; */
    /* @ngInject */
    function SandboxController() {
        var vm = this;
        vm.news = {
            title: 'ciccione',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };


    }
})();
