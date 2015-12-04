(function () {
    'use strict';

    angular
        .module('app.sandbox')
        .controller('SandboxController', SandboxController);

    SandboxController.$inject = ['$timeout'];
    /* @ngInject */
    function SandboxController($timeout) {
        var vm = this;
        vm.news = {
            title: 'ciao',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };

        vm.name = 'Tobias';
        vm.message = '';
        vm.dialogIsHidden = false;
        vm.hideDialog = hideDialog;

        function hideDialog(message){
            console.log('nascondone...');
            vm.message = message;
            vm.dialogIsHidden = true;
            $timeout(function () {
                vm.message = '';
                vm.dialogIsHidden = false;
            }, 2000);
        }

    }
})();
