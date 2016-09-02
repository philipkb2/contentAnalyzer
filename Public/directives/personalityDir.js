angular.module('textAnalyzer')
	.directive('displayPersonality', function(){

		return {
			scope: {
				personalityData: '='
			},
			templateUrl: '../views/personalityTmpl.html',
			link: function(scope, element, attrs){

				var personalityData = scope.personalityData;
// Openness: {{id_response.personality.openness}}<br>
// Extraversion: {{id_response.personality.extraversion}}<br>
// Agreeableness: {{id_response.personality.agreeableness}}<br>
// Conscientiousness: {{id_response.personality.conscientiousness}}
				ID_PersonalityData = [
					{
						key: "Personality",
						values: [
							{
								"label" : "Openness" ,
								"value" : personalityData.openness
							} ,
							{
								"label" : "Extraversion" ,
								"value" : personalityData.extraversion
							} ,
							{
								"label" : "Agreeableness" ,
								"value" : personalityData.agreeableness
							} ,
							{
								"label" : "Conscientiousness" ,
								"value" : personalityData.conscientiousness
							}
						]
					}
				];

				nv.addGraph(function() {
					var personalityChart = nv.models.discreteBarChart()
						.x(function(d) { return d.label })
						.y(function(d) { return d.value })
						.staggerLabels(true)
						//.staggerLabels(ID_PersonalityData[0].values.length > 8)
						.showValues(true)
						.duration(250);

					d3.select('#chartPersonality1 svg')
						.datum(ID_PersonalityData)
						.call(personalityChart);

					nv.utils.windowResize(personalityChart.update);
					return personalityChart;
				});

			}

		};

	});
