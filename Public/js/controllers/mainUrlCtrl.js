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
			var getAlchemyCombinedUrl = function(urlToAnalyze){
				mainService.get_al_combined(urlToAnalyze).then(function(response){
					$scope.al_response = response;
						// $scope.ALText = response.text;
						// $scope.ALUrl = response.url;
					getToneAnalyzerUrltoText(response.text);
					getIndicoMultiUrltoText(response.text);
					// getIndicoPersonaUrltoText(response.text);
				});
			};
			getAlchemyCombinedUrl(urlToAnalyze);

			var getAlchemySentimentUrl = function(urlToAnalyze){
				mainService.get_al_sentiment(urlToAnalyze).then(function(response){
					$scope.al_sentimentScore = response.docSentiment.score;
				});
			};
			getAlchemySentimentUrl(urlToAnalyze);

			var getAlchemyEmotionsUrl = function(urlToAnalyze){
				mainService.get_al_emotions(urlToAnalyze).then(function(response){
					$scope.al_emotions = response;
				});
			};
			getAlchemyEmotionsUrl(urlToAnalyze);
	// INDICO
			var getIndicoMultiUrltoText = function(textToAnalyze){
				mainService.get_indc_multiText(textToAnalyze).then(function(response){
					$scope.indc_response = response;
				});
			};
			// var getIndicoPersonaUrltoText = function(textToAnalyze){
			// 	mainService.getIndicoPersonaText(textToAnalyze).then(function(response){

			// 		$scope.IDPersona = response;

			// 	});
			// };

	// TONE ANALYZER
			var getToneAnalyzerUrltoText = function(textToAnalyze){
				mainService.get_toneAnalyzer(textToAnalyze).then(function(response){
					$scope.ta_documentTone = response.document_tone;
					$scope.ta_toneSentences = response.sentences_tone;
				});
			};

		};


// ========================== //
// ===== POLITICAL CHART ==== //
// ========================== //

	// var IDPoliticalData = [
	// 		{key: "Libertarian", y: $scope.IDPoliticalLibertarian },
	// 		{key: "Liberal", y: $scope.IDPoliticalLiberal },
	// 		{key: "Green", y: $scope.IDPoliticalGreen },
	// 		{key: "Conservative", y: $scope.IDPoliticalConservative },
	// 	];
	// 	var height = 400;
	// 	var width = 400;
	// 	var politicalChart;
	// 	nv.addGraph(function() {
	// 		var politicalChart = nv.models.pieChart()
	// 			.x(function(d) { return d.key })
	// 			.y(function(d) { return d.y })
	// 			.donut(true)
	// 			.width(width)
	// 			.height(height)
	// 			.padAngle(.07)
	// 			.cornerRadius(5)
	// 			.id('donut1'); // allow custom CSS for this one svg
	// 		politicalChart.title("100%");
	// 		politicalChart.pie.donutLabelsOutside(true).donut(true);
	// 		d3.select("#piePolitical1")
	// 			.datum(IDPoliticalData)
	// 			.transition().duration(1200)
	// 			.call(politicalChart);
	// 		//nv.utils.windowResize(politicalChart.update);
	// 		return politicalChart;
	// 	});


	});