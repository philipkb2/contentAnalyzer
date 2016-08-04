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
				mainService.get_al_combined(textToAnalyze).then(function(response){
					$scope.al_response = response;
					// $scope.ALConceptsText1 = response.concepts[0].text;
					// $scope.ALConceptsRelevance1 = response.concepts[0].relevance;
					// $scope.ALEntitiesText1 = response.entities[0].text;
					// $scope.ALEntitiesRelevance1 = response.entities[0].relevance;
					// $scope.ALKeywordsText1 = response.keywords[0].text;
					// $scope.ALKeywordsRelevance1 = response.keywords[0].relevance;
				});
				mainService.get_al_sentiment(textToAnalyze).then(function(response){
					$scope.al_sentimentScore = response.docSentiment.score;
				});
				mainService.get_al_emotions(textToAnalyze).then(function(response){
					$scope.al_emotions = response;
					// adfjs
				});
			// INDICO
				mainService.get_indc_multiText(textToAnalyze).then(function(response){
					$scope.indc_response = response;
					// response.keywords/emotion/political/sentimentHQ/personality
				});
			// 	mainService.get_indc_personaText(textToAnalyze).then(function(response){
			// 		$scope.IDPersona = response;
			// 	});
			// TONE ANALYZER
				mainService.get_toneAnalyzer(textToAnalyze).then(function(response){
					$scope.ta_documentTone = response.document_tone;
					$scope.ta_toneSentences = response.sentences_tone;

					// $scope.tone_emotion = response.document_tone.tone_categories[0];
					// $scope.TAEmotionDisgust = response.tone_categories[0].tones[1].score;
				});
		};

		// ======= INDICO.IO (2) ======= //

		$scope.indicoPersonaTEXT = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: 'https://apiv2.indico.io/personality?key=' + indicoKey + '&persona=true',
				data: JSON.stringify({
					'data': textToAnalyze,
					'persona': true
					})
			}).then(function(response){
				$scope.indicoPersona = response.data.results;	// Returns 16 Myers Briggs personas in the results object
			});
		};

	});
