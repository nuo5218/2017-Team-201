
angular.module('viewApp', ['ui.router','ngRoute'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'functionWindow@': {
                        templateUrl : 'views/mapFunctionWindow.html',
                          controller  : 'mapFunctionController'
                    },
                    'viewer@': {
                        templateUrl : 'views/mapWindow.html',
                        controller  : 'mapWindowController'
                    },
                    'infoWindow@': {
                        templateUrl : 'views/mapInfoWindow.html',
                        controller  : 'mapInfoController'
                    }
                }

            })
        
            // route for the map page
            .state('app.map', {
                url:'1',
                views: {
                    'functionWindow@': {
                        templateUrl :'views/mapFunctionWindow.html',
                          controller  : 'mapFunctionController'
                    },
                    'viewer@': {
                        templateUrl : 'views/mapWindow.html',
                        controller  : 'mapWindowController'
                    },
                    'infoWindow@': {
                        templateUrl : 'views/mapInfoWindow.html',
                         controller  : 'mapInfoController'
                    }
                }

            })
        
            // route for the 3D model page
            .state('app.model', {
                url:'2',
                views: {
                    'functionWindow@': {
                        templateUrl :'views/bimFunctionWindow.html',
                        controller  : 'modelFunctionController'
                    },
                    'viewer@': {
                        templateUrl : 'views/bimWindow.html',
                        controller  : 'modelWindowController'
                    },
                    'infoWindow@': {
                        templateUrl : 'views/bimInfoWindow.html',
                        controller  : 'modelInfoController'
                    }
            }
        });
    
        $urlRouterProvider.otherwise('/');
    })
;
   