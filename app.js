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
app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $mdDialog, $mdToast, $window) {
    
//    $scope.interest = ['interest', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250];
    $scope.dates = ['x', '2013-11-01', '2013-11-02', '2013-11-03', '2013-11-04', '2013-11-05', '2013-11-06', '2013-11-07', '2013-11-08', '2013-11-09', '2013-11-10', '2013-11-11', '2013-11-12', '2013-11-13', '2013-11-14', '2013-11-15', '2013-11-16', '2013-11-17', '2013-11-18', '2013-11-19', '2013-11-20', '2013-11-21', '2013-11-22', '2013-11-23', '2013-11-24', '2013-11-25', '2013-11-26', '2013-11-27', '2013-11-28', '2013-11-29', '2013-11-30', '2013-12-01', '2013-12-02', '2013-12-03', '2013-12-04', '2013-12-05', '2013-12-06', '2013-12-07', '2013-12-08', '2013-12-09', '2013-12-10', '2013-12-11', '2013-12-12', '2013-12-13', '2013-12-14', '2013-12-15', '2013-12-16', '2013-12-17', '2013-12-18', '2013-12-19', '2013-12-20', '2013-12-21', '2013-12-22', '2013-12-23', '2013-12-24', '2013-12-25', '2013-12-26', '2013-12-27', '2013-12-28', '2013-12-29', '2013-12-30', '2013-12-31'];
    $scope.portData= [
        ['interest', 34.39, 34.99, 35.57, 35.42, 34.94, 34.74, 34.67, 34.78, 34.79, 34.57, 34.78, 34.88, 35.16, 35.04, 35.2726, 35.37, 35.47, 35.66, 35.86, 36.19, 36.31, 36.42, 36.81, 36.72, 36.502, 36.7786, 37.01, 37.17, 37.1144, 37.012, 36.74, 36.59, 36.88, 37.54, 37.82, 38.12, 38.05, 37.96, 38.03, 38.14, 38.27, 37.95], ['interest', 25.21, 25.91, 26.4, 26.38, 26.14, 25.77, 25.55, 25.76, 25.64, 25.4, 25.69, 25.56, 25.85, 25.91, 26.17, 26.04, 26.27, 26.47, 26.59, 26.83, 26.76, 26.84, 27.3, 27.1, 27.13, 27.28, 27.38, 27.44, 27.3, 27.2, 27.15, 27.12, 27.01, 27.86, 28.16, 28.16, 28.39, 28.43, 28.34, 28.52, 28.66, 28.52],
        ['interest', 105.00, 106.03, 107.18, 106.18, 104.97, 105.29, 106.29, 105.79, 105.20, 106.09, 105.40, 106.56, 106.75, 105.68, 105.88, 106.60, 106.43, 106.31, 107.94, 108.51, 109.39, 109.72, 109.56, 109.95, 108.64, 110.03, 110.60, 111.53, 111.54, 110.94, 109.87, 109.12, 111.77, 112.11, 112.14, 114.46, 113.29, 112.44, 113.05, 112.94, 112.49, 110.75]
    ]
    $scope.fillMoneyGraph = function(){
        $scope.moneyGraph = c3.generate({
            data: {
                x: 'x',
                //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
                
                columns: [
                    $scope.dates,
                    $scope.portData[0]
                    
                ],
                colors: {
                    interest: '#20B2AA',
                    growth: '#ff0000'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        count:5,
                        format: '%Y-%m-%d'
                    }
                },
                y : {
                    min: 30,
                    padding: {},
                    tick: {
                        count: 3,
                        format: function (d) { return "$" + Math.ceil(d); }
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
    
    /* FILL PORTFOLIOS */
    $scope.portfolios = [
        {
            id: 'p1',
            face : '/img/rec1.png',
            portfolio: 'Portfolio 1',
            stocks: ['GGP', 'AVB', 'AIV', 'HCN'],
            confidence: 90,
            income: 14.082,
            current: 0
        },
        {
            id: 'p2',
            face : '/img/rec2.png',
            portfolio: 'Portfolio 2',
            stocks: ['ESS', 'GGP', 'AVB', 'AIV'],
            confidence: 87,
            income: 14.07,
            current: 0
        },
        {
            id: 'p3',
            face : '/img/rec3.png',
            portfolio: 'Portfolio 3',
            stocks: ['ESS', 'AVB', 'AIV', 'HCN'],
            confidence: 71,
            income: 14.078,
            current: 0
        }
        

    ];
    
    /* Add new line to line graph */
    $scope.shout = function(index){
        var currentData = $scope.portData[index]
        var avg = 0;
        var min = currentData[1];
        for(var j = 0; j < currentData.length; j++) {
            if(min > currentData[j])
                min = currentData[j];
            avg+= currentData[j];
        }
        avg = avg / (currentData.length - 1);
        
        $scope.moneyGraph = c3.generate({
            data: {
                x: 'x',
                //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'

                columns: [
                    $scope.dates,
                    $scope.portData[index],
                ],
                colors: {
                    interest: '#20B2AA',
                    growth: '#ff0000'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        count:5,
                        format: '%Y-%m-%d'
                    }
                },
                y : {
                    min: min - 5,
                    padding: {},
                    tick: {
                        count: 3,
//                        format: d3.format("$,")
                        format: function (d) { return "$" + Math.ceil(d); }
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
    }
    
    $scope.goLanding = function(){
        console.log("go landing");
        //        $location.path( '../index.html' );
        $window.location.href = "index.html";
    }
    
    $scope.goMain = function(){
        //        $location.path( '../index.html' );
        $window.location.href = "main.html";
    }
    $scope.portfolios = [
        {
            id: 'p1',
            name: 'chart1',
            face : '/img/rec1.png',
            portfolio: 'Portfolio 1',
            stocks: ['GGP', 'AVB', 'AIV', 'HCN'],
            confidence: 90,
            income: 14.082,
            current: 0,
            data: [
                ['bond', 10],
                ['stock', 90],
            ]
        },
        {
            id: 'p2',
            name: 'chart2',
            face : '/img/rec2.png',
            portfolio: 'Portfolio 2',
            stocks: ['ESS', 'GGP', 'AVB', 'AIV'],
            confidence: 87,
            income: 14.07,
            current: 0,
            data: [
                ['bond', 20],
                ['stock', 80],
            ]
        },
        {
            id: 'p3',
            name: 'chart3',
            face : '/img/rec3.png',
            portfolio: 'Portfolio 3',
            stocks: ['ESS', 'AVB', 'AIV', 'HCN'],
            confidence: 71,
            income: 14.078,
            current: 0,
            data: [
                ['bond', 30],
                ['stock', 70],
            ]
        }

    ];
    $scope.charts = {};
    /* Make charts */
    setTimeout(function(){
        $scope.portfolios.forEach(function(obj){
            $scope.charts[obj.id] = c3.generate({
                data: {
                    // iris data from R
                    columns: obj.data,
                    type : 'pie',
                    colors: {
                        bond: '#00897b',
                        stock: '#00796b'
                    }
//                    onclick: function (d, i) { 
//                        console.log("onclick", d, i);
//                    },
//                    onmouseover: function (d, i) { console.log("onmouseover", d, i); },
//                    onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                },
                bindto: '#' + obj.name
            }); 
        })
    }, 100)
    
    $scope.showCustomToast = function(port, amt) {
        $mdToast.show({
            controller: 'ToastCtrl',
            templateUrl: 'toast-template.html',
            hideDelay: 5000,
            position: "bottom left",
            locals: {portfolio: port, amt: amt}
        });
    };
    
    
    $scope.money = 8900;
    
    /* Calculate remaning money */
    $scope.reCalculate = function(amt){
        $scope.money = $scope.money - amt;
        /* CHECK < ZERO ???*/
    }
    
    $scope.registerPortfolio = function(port, amt) {
        $scope.portfolios.forEach(function(p){
            if(p.id === port.id) {
                p.current += amt;
            }
        })
    }
    /* Dialog */
    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog-invest.html',
            targetEvent: ev,
            locals: {portfolios: $scope.portfolios, money: $scope.money}
        })
        .then(function(data) {
            console.log("MainCtrl, you bought", data);
            /* Make a toast */
            $scope.showCustomToast(data.port, data.amt);
            $scope.reCalculate(data.amt);
            $scope.registerPortfolio(data.port, data.amt);
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
            $scope.portfolios.forEach(function(item, pos){
                item.checked = false;
            })
        });
    };
    
    
    function DialogController($scope, $mdDialog, portfolios, money) {
        $scope.data = {};
        $scope.portfolios = portfolios;
        $scope.money = money;
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
            
            portfolios.forEach(function(item, pos){
                    item.checked = false;
            })
        };
        $scope.purchase = function(port, amt) {
            if(!port) {
                $scope.alert = "Please choose a portfolio";
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.alert = "";
                    })
                    
                }, 2000);
                
                portfolios.forEach(function(item, pos){
                    item.checked = false;
                })
            } else {
                $scope.inTransaction = !$scope.inTransaction;
                setTimeout(function(){
                    /* Call out to server to purchase portfoli o*/
                    console.log('Bought', port, amt);
                    $mdDialog.hide({port: port, amt: amt});
                    
                    portfolios.forEach(function(item, pos){
                        item.checked = false;
                    })
                }, 3000)
            }
        };
        
        
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
.controller('ToastCtrl', function($scope, $mdToast, portfolio, amt){
    $scope.closeToast = function() {
        $mdToast.hide();
    };
    $scope.portfolio = portfolio;
    $scope.amt = amt;
});
