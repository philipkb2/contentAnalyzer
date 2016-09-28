angular.module('textAnalyzer')
	.directive('displayEmotion', function(){

		return {
			scope: {
				emotionData: '='
			},
			templateUrl: '../views/emotionTmpl.html',
			link: function(scope, element, attrs){

				var emotionData = scope.emotionData;

				ID_EmotionData = [
					{
						key: "Emotion",
						values: [
							{
								"label" : "Anger" ,
								"value" : 0.1214832
								// "value" : emotionData.anger
							} ,
							{
								"label" : "Surprise" ,
								"value" : 0.2784893
								// "value" : emotionData.surprise
							} ,
							{
								"label" : "Sadness" ,
								"value" : 0.3492920
								// "value" : emotionData.sadness
							} ,
							{
								"label" : "Fear" ,
								"value" : 0.3902834
								// "value" : emotionData.fear
							} ,
							{
								"label" : "Joy" ,
								"value" : 0.7920381
								// "value" : emotionData.joy
							}
						]
					}
				];

				nv.addGraph(function() {
					var emotionChart = nv.models.discreteBarChart()
						.x(function(d) { return d.label; })
						.y(function(d) { return d.value; })
						.staggerLabels(true)
						//.staggerLabels(ID_EmotionData[0].values.length > 8)
						.showValues(true)
						.duration(250)
						.color(d3.scale.category20().range());
						// .color(['#aec7e8', '#88FFA5', '#486192', '#FF8890', '#7b94b5']);

					d3.select('#chartEmotion1 svg')
						.datum(ID_EmotionData)
						.call(emotionChart);

					nv.utils.windowResize(emotionChart.update);
					return emotionChart;
				});

			}

		};

	});
