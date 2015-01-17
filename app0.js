    // Include app dependency on ngMaterial

    var app = angular.module('LandingApp', ['ngMaterial']);
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
app.controller('LandingCtrl', function($scope, $location, $window) {
    $scope.demo = function(){
//        $location.path( '../index.html' );
        $window.location.href = "index.html";
    }
})