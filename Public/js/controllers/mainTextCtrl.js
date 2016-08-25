angular.module('textAnalyzer')
    .controller('mainTextCtrl', function($scope, mainService, $state){

        $scope.getStoredAnalysis = function(){
        	mainService.getStoredAnalysis().then(function(response){
        		$scope.products = response;
        	});
        };

        $scope.addNewAnalysis = function(){
        	mainService.addAnalysis().then(function(response){

        	});
        };

		$scope.getMultiText = function(textToAnalyze){
			// ALCHEMY
			mainService.get_al_combinedText(textToAnalyze).then(function(response){
				$scope.al_response = response;
			});
			// INDICO
			mainService.get_indc_multiText(textToAnalyze).then(function(response){
				$scope.indc_response = response;
			});
			mainService.get_indc_personaText(textToAnalyze).then(function(response){
				$scope.indc_persona_response = response;
			});
			// TONE ANALYZER
			mainService.get_toneAnalyzer(textToAnalyze).then(function(response){
				$scope.ta_documentTone = response.document_tone;
				$scope.ta_toneSentences = response.sentences_tone;
				// $scope.tone_emotion = response.document_tone.tone_categories[0];
				// $scope.TAEmotionDisgust = response.tone_categories[0].tones[1].score;
			});
			// PERSONALITY INSIGHTS
			mainService.get_personality_insights(textToAnalyze).then(function(response){
				$scope.pi_response = response.tree.children;
				$scope.pi_wordcount = response.word_count;
			});
		};

	});
