    // Include app dependency on ngMaterial

    var app = angular.module('YourApp', ['ngMaterial']);
app.config(function($mdThemingProvider) {

    var neonGreen = $mdThemingProvider.extendPalette('green', {
        '400': '20B2AA',
        '600': '20B2BA'
    });
    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('neonGreen', neonGreen);
    // Use that theme for the primary intentions
    $mdThemingProvider.theme('default')
    .primaryColor('neonGreen', {
        'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
});
app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $mdDialog) {
    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
        .then(function(){
            $log.debug("toggle left is done");
        });
    };
    $scope.toggleRight = function() {
        $mdSidenav('right').toggle()
        .then(function(){
            $log.debug("toggle RIGHT is done");
        });
    };

    $scope.chartData =  [
        {
            name: "chart1",
            data: [
                ['bond', 10],
                ['stock', 90],
            ],
            portfolio: "Portfolio 1",
            confidence: 20,
            term: "Short term",
            income: "5%"
        },
        {
            name: "chart2",
            data: [
                ['bond', 20],
                ['stock', 80],
            ],
            portfolio: "Portfolio 2",
            confidence: 40,
            term: "Middle term",
            income: "8%"
        },
        {
            name: "chart3",
            data: [
                ['bond', 30],
                ['stock', 70],
            ],
            portfolio: "Portfolio 3",
            confidence: 30,
            term: "Long term",
            income: "10%"
        }   
    ];
    $scope.charts = {};
    /* Make charts */
    setTimeout(function(){
        $scope.chartData.forEach(function(obj){
            $scope.charts[obj.name] = c3.generate({
                data: {
                    // iris data from R
                    columns: obj.data,
                    type : 'pie',
                    onclick: function (d, i) { console.log("onclick", d, i); },
                    onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                    onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                },
                bindto: '#' + obj.name,
            }); 
        })
    }, 100)
    
    /* Dialog */
    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog-invest.html',
            targetEvent: ev,
        })
        .then(function(answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
        });
    };
    
    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

})
.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav('left').close()
        .then(function(){
            $log.debug("close LEFT is done");
        });
    };
})
.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav('right').close()
        .then(function(){
            $log.debug("close RIGHT is done");
        });
    };
});
