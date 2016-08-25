angular.module('textAnalyzer')
	.directive('displayPersonalityInsights', function(){

		return {
			scope: {
				personalityInsightsData: '='
			},
			templateUrl: '../views/personalityInsightsTmpl.html',
			link: function(scope, element, attrs){

				var pi_data = scope.pi_response;
					





			}

		};

	});
