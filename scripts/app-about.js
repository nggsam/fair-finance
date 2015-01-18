    // Include app dependency on ngMaterial

var app = angular.module('YourApp', ['ngMaterial']);
app
.config(function($mdThemingProvider) {

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
})
app.controller('AboutCtrl', function($scope, $timeout, $mdSidenav, $log, $mdDialog, $mdToast, $window, $http) {
    var tabs = [
        { title: 'Why Invest with us?', content: "We are a low risk low return, commission free investment product aimed at people who don’t have aside a budget to invest. Wealth make wealth and we want to make you part of the process. Instead of sitting jobless in a bank account, we want your money to get out in the world, explore it, and and earn more money."},
        { title: 'Why Invest at all?', content: "A negligible percentage of the American population has any sort of savings or investments. Without these, money only depletes; investing is your opportunity to grow your wealth, and grow it even more. We require you to have absolutely no knowledge of either finance or how the financial markets operate. We simply you provide you with cold hard facts and ask you to base your decisions on them."},
        { title: 'The downside?', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
        { title: 'How much does it cost?', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
        { title: 'I don’t have much money', content: "If you remove a tab, it will try to select a new one."}
    ];
    $scope.tabs = tabs;
    $scope.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
        if ( old && (old != current)) $log.debug('Goodbye ' + tabs[old].title + '!');
        if ( current )                $log.debug('Hello ' + tabs[current].title + '!');
    });
    $scope.addTab = function (title, view) {
        view = view || title + " Content View";
        tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
        for (var j = 0; j < tabs.length; j++) {
            if (tab.title == tabs[j].title) {
                $scope.tabs.splice(j, 1);
                break;
            }
        }
    };
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
