angular.module('textAnalyzer')
	.directive('displaySentiment', function(){

		return {
			scope: {
				indcSentimentData: '=',
				alSentimentData: '='
			},
			templateUrl: '../views/sentimentTmpl.html',
			link: function(scope, element, attrs){

				console.log(scope.indcSentimentData);
				console.log(scope.alSentimentData);

				var sentimentData = scope.sentimentData;
// Openness: {{id_response.personality.openness}}<br>
// Extraversion: {{id_response.personality.extraversion}}<br>
// Agreeableness: {{id_response.personality.agreeableness}}<br>
// Conscientiousness: {{id_response.personality.conscientiousness}}
				ID_SentimentData = [
					{
						key: "Sentiment",
						values: [
							{
								"label": "Sentiment ID",
								"value": indcSentimentData.sentimentHQ
							},
							{
								"label": "Sentiment AL",
								"value": "alSentimentData."
							}
						]
					}
				];

				nv.addGraph(function() {
					var sentimentChart = nv.models.discreteBarChart()
						.x(function(d) { return d.label; })
						.y(function(d) { return d.value; })
						.staggerLabels(true)
						//.staggerLabels(ID_PersonalityData[0].values.length > 8)
						.showValues(true)
						.duration(250);

					d3.select('#chartSentiment1 svg')
						.datum(ID_SentimentData)
						.call(sentimentChart);

					nv.utils.windowResize(sentimentChart.update);
					return sentimentChart;
				});

			}

		};

	});
