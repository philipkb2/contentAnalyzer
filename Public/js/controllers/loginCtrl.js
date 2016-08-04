angular.module('textAnalyzer')
    .controller('loginCtrl', function($scope, mainService, $state){

        $scope.login = function(){
            mainService.login($scope.credentials).then(function(response){
                console.log(response.data);
                $state.go('analyze');
            });
        };

        $scope.register = function(){
            mainService.register($scope.newUser).then(function(response){
                console.log(response.data);
                $state.go('analyze');
            });
        };

    });
