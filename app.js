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
app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $mdDialog, $mdToast) {
    
    $scope.fillMoneyGraph = function(){
        var chart = c3.generate({
            data: {
                x: 'x',
                //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
                columns: [
                    ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06', '2013-01-07', '2013-01-08', '2013-01-09', '2013-01-10', '2013-01-11', '2013-01-12', '2013-01-13', '2013-01-14', '2013-01-15', '2013-01-16'],
                    //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                    ['data1', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250]
                ],
                colors: {
                    data1: '#000000',
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        count: 4,
                        format: '%Y-%m-%d'
                    }
                },
                y : {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                        count: 3,
                        format: d3.format("$,")
                        //                format: function (d) { return "$" + d; }
                    }
                }
            },
            bindto: '#money-graph',
            grid: {
                x: {
                    show: true
                }
            },
            legend: {
                show: false
            }
        });
    };
    
    $scope.fillMoneyGraph();
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
                    colors: {
                        bond: '#00897b',
                        stock: '#00796b'
                    },
//                    onclick: function (d, i) { console.log("onclick", d, i); },
//                    onmouseover: function (d, i) { console.log("onmouseover", d, i); },
//                    onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                },
                bindto: '#' + obj.name,
            }); 
        })
    }, 100)
    
    $scope.showCustomToast = function(port) {
        $mdToast.show({
            controller: 'ToastCtrl',
            templateUrl: 'toast-template.html',
            hideDelay: 5000,
            position: "bottom left",
            locals: {portfolio: port}
        });
    };
    
    /* Dialog */
    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog-invest.html',
            targetEvent: ev,
        })
        .then(function(port) {
            console.log("MainCtrl, you bought", port);
            /* Make a toast */
            $scope.showCustomToast(port);
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
        });
    };
    
    function DialogController($scope, $mdDialog) {
        $scope.data = {};
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.purchase = function(port) {
            if(!port) {
                $scope.alert = "Please choose a portfolio";
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.alert = "";
                    })
                    
                }, 2000);
            } else {
                $scope.inTransaction = !$scope.inTransaction;
                setTimeout(function(){
                    /* Call out to server to purchase portfoli o*/
                    console.log('Bought', port);
                    $mdDialog.hide(port);    
                }, 2000)
            }
        };
        
        $scope.portfolios = [
            {
                face : '/img/rec1.png',
                portfolio: 'Portfolio 1',
                confidence: '20',
                income: '5%',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : '/img/rec2.png',
                portfolio: 'Portfolio 2',
                confidence: '40',
                income: '8%',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : '/img/rec3.png',
                portfolio: 'Portfolio 3',
                confidence: '30',
                income: '10%',
                notes: " I'll be in your neighborhood doing errands"
            }
            
        ];
        $scope.currentPortfolio = null;
        $scope.currentPortIndex = null;
        $scope.updateSelection = function(index, portfolios) {
            if($scope.currentPortIndex == index) {
                $scope.currentPortfolio = null;
                $scope.currentPortIndex = null;
                $scope.slider = false;
            } else {
                $scope.slider = true;
                $scope.currentPortfolio = portfolios[index];
                $scope.currentPortIndex = index;
            }
            
            portfolios.forEach(function(item, pos){
                if(pos!= index) {
                    item.checked = false;
                }
            })
        }
        
        $scope.next = function(port){
            if(!port) {
                $scope.alert = "Please choose a portfolio";
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.alert = "";
                    })

                }, 2000);
            } else {
                $scope.slider = true;
            }
        }
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
})
.controller('ToastCtrl', function($scope, $mdToast, portfolio){
    $scope.closeToast = function() {
        $mdToast.hide();
    };
    $scope.portfolio = portfolio;
});
