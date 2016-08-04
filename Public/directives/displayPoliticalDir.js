angular.module('textAnalyzer')
	.directive('displayPolitical', function(){

	    return {
	    	scope: {
	    		politicalData: '='
	    	},
	        templateUrl: '../views/politicalTmpl.html',
	        link: function(scope, element, attrs){

    			var politicalData = scope.politicalData;
        		var ID_PoliticalData = [
		            {key: "Libertarian", y: politicalData.Libertarian },
		            {key: "Liberal", y: politicalData.Liberal },
		            {key: "Green", y: politicalData.Green },
		            {key: "Conservative", y: politicalData.Conservative },
		        ];
		        var height = 400;
		        var width = 400;
		        var politicalChart;

		        nv.addGraph(function() {
		            var politicalChart = nv.models.pieChart()
		                .x(function(d) { return d.key })
		                .y(function(d) { return d.y })
		                .donut(true)
		                .width(width)
		                .height(height)
		                .padAngle(.07)
		                .cornerRadius(5)
		                .id('donut1'); // allow custom CSS for this one svg
		            politicalChart.title("");
		            politicalChart.pie.labelsOutside(true).donut(true);
		            // politicalChart.pie.donutLabelsOutside(true).donut(true); // DEPRECATED
		            d3.select("#piePolitical1")
		                .datum(ID_PoliticalData)
		                .transition().duration(1200)
		                .call(politicalChart);
		            //nv.utils.windowResize(politicalChart.update);
		            return politicalChart;
	        	});
	        
    		}

	    };

	});
