angular.module('textAnalyzer', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
    .config(function($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/homeTmpl.html',
                controller: 'loginCtrl'
            })
            .state('analyze', {
                url: '/analyze',
                templateUrl: '../views/analyzeTmpl.html',
                controller: 'profileCtrl',
                resolve: {
                    user: function(mainService, $state){
                        return mainService.getUser().then(function(response){
                            return response.data;
                        }).catch(function(err) {
                            $state.go('home');
                        });
                    }
                }                
            });

        $urlRouterProvider
            .otherwise('/');

    });
