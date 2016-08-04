angular.module("textAnalyzer")
	.controller("profileCtrl", function($scope, user, mainService, $state){

		$('body').removeClass('modal-open');
		$('div').removeClass('modal-backdrop fade in');

		$scope.user = user;

		$scope.logout = function (){
			mainService.logout().then(function(response){
				$state.go('home');
			});
		};

	});
