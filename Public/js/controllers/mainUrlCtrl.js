angular.module('textAnalyzer')
    .controller('mainUrlCtrl', function($scope, mainService, $state){

        $scope.getStoredAnalysis = function(){
        	mainService.getStoredAnalysis().then(function(response){
        		$scope.products = response;
        	});
        };

        $scope.addNewAnalysis = function(){
        	mainService.addAnalysis().then(function(response){

        	});
        };

		$scope.getMultiUrl = function(urlToAnalyze){
			// ALCHEMY
			mainService.get_al_combinedUrl(urlToAnalyze).then(function(response){
				$scope.al_response = response;
				// $scope.ALText = response.text;
				textTo_TA_PI(response.text);
			});
			// INDICO
			mainService.get_indc_multiUrl(urlToAnalyze).then(function(response){
				$scope.indc_response = response;
			});
			mainService.get_indc_personaText(urlToAnalyze).then(function(response){
				$scope.indc_persona_response = response;
			});
			var textTo_TA_PI = function(textToAnalyze){
				// TONE ANALYZER
				mainService.get_toneAnalyzer(textToAnalyze).then(function(response){
					$scope.ta_documentTone = response.document_tone;
					$scope.ta_toneSentences = response.sentences_tone;
				});
				// PERSONALITY INSIGHTS
				mainService.get_personality_insights(textToAnalyze).then(function(response){
					$scope.personality_insights_response = response;
				});
			};
		};

	});
