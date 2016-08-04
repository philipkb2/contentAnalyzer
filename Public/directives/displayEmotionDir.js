angular.module('textAnalyzer')
	.directive('displayEmotion', function(){

		return {
			scope: {
				emotionData: '='
			},
			templateUrl: '../views/emotionTmpl.html',
			link: function(scope, element, attrs){

				var emotionData = scope.emotionData;
// Anger: {{id_response.emotion.anger}}<br>
// Surprise: {{id_response.emotion.surprise}}<br>
// Sadness: {{id_response.emotion.sadness}}<br>
// Fear: {{id_response.emotion.fear}}<br>
// Joy: {{id_response.emotion.joy}}<br>
				ID_EmotionData = [
					{
						key: "Emotion",
						values: [
							{
								"label" : "Anger" ,
								"value" : emotionData.anger
							} ,
							{
								"label" : "Surprise" ,
								"value" : emotionData.surprise
							} ,
							{
								"label" : "Sadness" ,
								"value" : emotionData.sadness
							} ,
							{
								"label" : "Fear" ,
								"value" : emotionData.fear
							} ,
							{
								"label" : "Joy" ,
								"value" : emotionData.joy
							}
						]
					}
				];

				nv.addGraph(function() {
					var emotionChart = nv.models.discreteBarChart()
						.x(function(d) { return d.label })
						.y(function(d) { return d.value })
						.staggerLabels(true)
						//.staggerLabels(ID_EmotionData[0].values.length > 8)
						.showValues(true)
						.duration(250)
						;

					d3.select('#chartEmotion1 svg')
						.datum(ID_EmotionData)
						.call(emotionChart);

					nv.utils.windowResize(emotionChart.update);
					return emotionChart;
				});

			}

		};

	});
