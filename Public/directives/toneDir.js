angular.module('textAnalyzer')
	.directive('displayTone', function(){

	    return {
	    	scope: {
	    		toneData: '='
	    	},
	        templateUrl: '../views/toneTmpl.html',
	        link: function(scope, element, attrs){

				var toneData = scope.toneData;

		        var TA_ToneData = [
			        {
			            key: 'Series1',
			            values: [
// Emotion Tone:
	// Anger: {{tone_emotion.tones[0].score}}
	// Disgust: {{tone_emotion.tones[1].score}}
	// Fear: {{tone_emotion.tones[2].score}}
	// Joy: {{tone_emotion.tones[3].score}}
	// Sadness: {{tone_emotion.tones[4].score}}
			                {
			                    "label" : "Anger" ,
			                    "value" : toneData.tone_categories[0].tones[0].score
			                } ,
			                {
			                    "label" : "Disgust" ,
			                    "value" : toneData.tone_categories[0].tones[1].score
			                } ,
			                {
			                    "label" : "Fear" ,
			                    "value" : toneData.tone_categories[0].tones[2].score
			                } ,
			                {
			                    "label" : "Joy" ,
			                    "value" : toneData.tone_categories[0].tones[3].score
			                } ,
			                {
			                    "label" : "Sadness" ,
			                    "value" : toneData.tone_categories[0].tones[4].score
			                } ,
			                {
			                    "label" : " " ,
			                    "value" : 0
			                } ,
// Writing Tone:
	// Analytical: {{tone_writing.tones[0].score}}
	// Confident: {{tone_writing.tones[1].score}}
	// Tentative: {{tone_writing.tones[2].score}}
			                {
			                    "label" : "Analytical" ,
			                    "value" : toneData.tone_categories[1].tones[0].score
			                } ,
			                {
			                    "label" : "Confident" ,
			                    "value" : toneData.tone_categories[1].tones[1].score
			                } ,
			                {
			                    "label" : "Tentative" ,
			                    "value" : toneData.tone_categories[1].tones[2].score
			                } ,
			                {
			                    "label" : " " ,
			                    "value" : 0
			                } ,
// Social Tone:
	// Openness: {{tone_social.tones[0].score}}
	// Conscientiousness: {{tone_social.tones[1].score}}
	// Extraversion: {{tone_social.tones[2].score}}
	// Agreeableness: {{tone_social.tones[3].score}}
	// Emotional Range: {{tone_social.tones[4].score}}
			                {
			                    "label" : "Openness" ,
			                    "value" : toneData.tone_categories[2].tones[0].score
			                } ,
			                {
			                    "label" : "Conscientious" ,
			                    "value" : toneData.tone_categories[2].tones[1].score
			                } ,
			                {
			                    "label" : "Extraversion" ,
			                    "value" : toneData.tone_categories[2].tones[2].score
			                } ,
			                {
			                    "label" : "Agreeableness" ,
			                    "value" : toneData.tone_categories[2].tones[3].score
			                } ,
			                {
			                    "label" : "Emotional Range" ,
			                    "value" : toneData.tone_categories[2].tones[4].score
			                } ,
			            ]
			        },
			    ];

			    var toneChart;
			    nv.addGraph(function() {
			        toneChart = nv.models.multiBarHorizontalChart()
			            .x(function(d) { return d.label })
			            .y(function(d) { return d.value })
			            .yErr(function(d) { return d.yErr })
			            // .yErr(function(d) { return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] })			            
			            .barColor(d3.scale.category20().range())
			            .duration(250)
			            .margin({left: 100})
			            .stacked(true);

			        toneChart.yAxis.tickFormat(d3.format(',.2f'));

			        toneChart.yAxis.axisLabel('Y Axis');
			        toneChart.xAxis.axisLabel('X Axis').axisLabelDistance(20);

			        d3.select('#chartTone1 svg')
			            .datum(TA_ToneData)
			            .call(toneChart);

			        nv.utils.windowResize(toneChart.update);

			        toneChart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
			        toneChart.state.dispatch.on('change', function(state){
			            nv.log('state', JSON.stringify(state));
			        });
			        return toneChart;
			    });

    		}
	    };

	});
