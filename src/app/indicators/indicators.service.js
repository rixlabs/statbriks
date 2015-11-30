(function () {
    'use strict';

    angular
        .module('app.indicators')
        .factory('indicators', indicators);

    indicators.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function indicators($http, $q, exception, logger) {
        var service = {
            getFromInquiry: getFromInquiry,
            printCiao: printCiao
        };

        return service;

        function getFromInquiry(indicator,params){
            var deferred = $q.defer();
            $http.get(params.hostname+indicator.endpoint).
                success(function(data, status, headers, config) {
                    var chartI = {};

                    if(indicator.options != null){
                        chartI.options=indicator.options;
                        if(indicator.params.indexOf("year") >= 0){
                            chartI.options.title = indicator.chart_title+" "+params.selectedYear;
                        }
                        else if(indicator.params.indexOf("from") >= 0 && indicator.params.indexOf("to") >= 0){
                            chartI.options.title = indicator.chart_title+" "+params.selectedYearFrom+" - "+params.selectedYear;
                        }
                        else{
                            chartI.options.title = indicator.chart_title
                        }
                    }else{
                        chartI.options = {

                            'title':indicator.chart_title
                        };
                    }


                    if(indicator.params.indexOf("percentX") >= 0){
                        chartI.options.hAxis = {viewWindowMode:'explicit',"gridlines": {"count": 11},viewWindow:{max:100,min:0},format: '#\'%\''};
                    }
                    if(indicator.params.indexOf("percentY") >= 0){
                        chartI.options.vAxis = {viewWindowMode:'explicit',"gridlines": {"count": 11},viewWindow:{max:100,min:0},format: '#\'%\''};
                    }
                    /*
                     dd =  new google.visualization.arrayToDataTable(data);
                     if(indicator.params.indexOf("labels2") >= 0){
                     dd = addAnnotation(dd,2).toDataTable();
                     }
                     if(indicator.params.indexOf("labels12") >= 0){
                     dd = addAnnotation(dd,12).toDataTable();
                     }
                     if(indicator.params.indexOf("labels3") >= 0){
                     dd = addAnnotation(dd,3).toDataTable();
                     }



                     chartI.data = dd;
                     */
                    chartI.data = data;
                    chartI.type = indicator.chart_type;

                    deferred.resolve(chartI);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject("OUCH!");
                });
            return deferred.promise;
        }

        function printCiao(){
            return "Ciao";
        }

    }

})();
