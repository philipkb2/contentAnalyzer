angular.module('textAnalyzer')
	.directive('displayPersonalityInsights', function(){

		return {
			scope: {
				personalityInsightsData: '='
			},
			templateUrl: '../views/personalityInsightsTmpl.html',
			link: function(scope, element, attrs){

				var pi_data = scope.pi_response;

				var RadarChart = {
					draw: function(id, d, options){
						var cfg = {
							radius: 5,
							w: 600,
							h: 600,
							factor: 1,
							factorLegend: 0.85,
							levels: 3,
							maxValue: 0,
							radians: 2 * Math.PI,
							opacityArea: 0.5,
							ToRight: 5,
							TranslateX: 80,
							TranslateY: 30,
							ExtraWidthX: 100,
							ExtraWidthY: 100,
							color: d3.scale.category10()
						};
						
						if('undefined' !== typeof options){
							for(var i in options){
								if('undefined' !== typeof options[i]){
									cfg[i] = options[i];
								}
							}
						}
						cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){ return d3.max(i.map(function(o){ return o.value; })); }));
						var allAxis = (d[0].map(function(i, j){ return i.axis; }));
						var total = allAxis.length;
						var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
						var Format = d3.format('%');
						d3.select(id).select("svg").remove();
						var g = d3.select(id)
							.append("svg")
							.attr("width", cfg.w + cfg.ExtraWidthX)
							.attr("height", cfg.h + cfg.ExtraWidthY)
							.append("g")
							.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
						var tooltip;
						
						// Circular segments
						for(var j = 0; j < cfg.levels - 1; j++){
							var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
							g.selectAll(".levels")
								.data(allAxis)
								.enter()
								.append("svg:line")
								.attr("x1", function(d, i){ return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
								.attr("y1", function(d, i){ return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
								.attr("x2", function(d, i){ return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
								.attr("y2", function(d, i){ return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
								.attr("class", "line")
								.style("stroke", "grey")
								.style("stroke-opacity", "0.75")
								.style("stroke-width", "0.3px")
								.attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
						}

						// Text indicating at what % each level is
						for(var j = 0; j < cfg.levels; j++){
							var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
							g.selectAll(".levels")
								.data([1]) //dummy data
								.enter()
								.append("svg:text")
								.attr("x", function(d){ return levelFactor * (1 - cfg.factor * Math.sin(0)); })
								.attr("y", function(d){ return levelFactor * (1 - cfg.factor * Math.cos(0)); })
								.attr("class", "legend")
								.style("font-family", "sans-serif")
								.style("font-size", "10px")
								.attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
								.attr("fill", "#737373")
								.text(Format((j + 1) * cfg.maxValue / cfg.levels));
						}
						
						series = 0;

						var axis = g.selectAll(".axis")
							.data(allAxis)
							.enter()
							.append("g")
							.attr("class", "axis");

						axis.append("line")
							.attr("x1", cfg.w / 2)
							.attr("y1", cfg.h / 2)
							.attr("x2", function(d, i){ return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
							.attr("y2", function(d, i){ return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
							.attr("class", "line")
							.style("stroke", "grey")
							.style("stroke-width", "1px");

						axis.append("text")
							.attr("class", "legend")
							.text(function(d){ return d; })
							.style("font-family", "sans-serif")
							.style("font-size", "11px")
							.attr("text-anchor", "middle")
							.attr("dy", "1.5em")
							.attr("transform", function(d, i){ return "translate(0, -10)"; })
							.attr("x", function(d, i){ return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians/total)) - 60 * Math.sin(i * cfg.radians / total); })
							.attr("y", function(d, i){ return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });
					 
						d.forEach(function(y, x){
							dataValues = [];
							g.selectAll(".nodes")
								.data(y, function(j, i){
									dataValues.push([
										cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)), 
										cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
							  		]);
								});
							dataValues.push(dataValues[0]);
							g.selectAll(".area")
								.data([dataValues])
								.enter()
								.append("polygon")
								.attr("class", "radar-chart-serie" + series)
								.style("stroke-width", "2px")
								.style("stroke", cfg.color(series))
								.attr("points",function(d) {
									var str = "";
									for(var pti = 0; pti < d.length; pti++){
										str = str + d[pti][0] + "," + d[pti][1] + " ";
									}
									return str;
								})
								.style("fill", function(j, i){ return cfg.color(series); })
								.style("fill-opacity", cfg.opacityArea)
								.on('mouseover', function (d){
									z = "polygon." + d3.select(this).attr("class");
									g.selectAll("polygon")
										.transition(200)
										.style("fill-opacity", 0.1); 
									g.selectAll(z)
										.transition(200)
										.style("fill-opacity", 0.7);
									})
								.on('mouseout', function(){
									g.selectAll("polygon")
										.transition(200)
										.style("fill-opacity", cfg.opacityArea);
								});
							series++;
						});
						series = 0;

						d.forEach(function(y, x){
							g.selectAll(".nodes")
								.data(y).enter()
								.append("svg:circle")
								.attr("class", "radar-chart-serie" + series)
								.attr('r', cfg.radius)
								.attr("alt", function(j){ return Math.max(j.value, 0); })
								.attr("cx", function(j, i){
									dataValues.push([
										cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)), 
										cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
									]);
							return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
							})
							.attr("cy", function(j, i){
							  return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
							})
							.attr("data-id", function(j){ return j.axis; })
							.style("fill", cfg.color(series)).style("fill-opacity", 0.9)
							.on('mouseover', function (d){
								newX =  parseFloat(d3.select(this).attr('cx')) - 10;
								newY =  parseFloat(d3.select(this).attr('cy')) - 5;
								
								tooltip
									.attr('x', newX)
									.attr('y', newY)
									.text(Format(d.value))
									.transition(200)
									.style('opacity', 1);
									
								z = "polygon." + d3.select(this).attr("class");
								g.selectAll("polygon")
									.transition(200)
									.style("fill-opacity", 0.1); 
								g.selectAll(z)
									.transition(200)
									.style("fill-opacity", 0.7);
						  	})
							.on('mouseout', function(){
								tooltip
									.transition(200)
									.style('opacity', 0);
								g.selectAll("polygon")
									.transition(200)
									.style("fill-opacity", cfg.opacityArea);
						  	})
							.append("svg:title")
							.text(function(j){ return Math.max(j.value, 0); });

							series++;
						});
						// Tooltip
						tooltip = g.append('text')
							.style('opacity', 0)
							.style('font-family', 'sans-serif')
							.style('font-size', '13px');
					}
				};

				// ==================== //
				// ======  DATA  ====== //
				// ==================== //

				// var pi_openness_data = pi_data[0].children[0].children[0]
				// var pi_conscientiousness_data = pi_data[0].children[0].children[1]
				// var pi_extraversion_data = pi_data[0].children[0].children[2]
				// var pi_agreeableness_data = pi_data[0].children[0].children[3]
				// var pi_emotionalRange_data = pi_data[0].children[0].children[4]

				// Data

				var d = [
					[
						{ axis: "Openness", value: 0.59 },
						{ axis: "Adventurousness", value: 0.56 },
						{ axis: "Artistic interests", value: 0.42 },
						{ axis: "Emotionality", value: 0.34 },
						{ axis: "Imagination", value: 0.48 },
						{ axis: "Intellect", value: 0.14 },
						{ axis: "Authority-challenging", value: 0.11 },

						{ axis: "Conscientiousness", value: 0.05 },
						{ axis: "Achievement striving", value: 0.07 },
						{ axis: "Cautiousness", value: 0.12 },
						{ axis: "Dutifulness", value: 0.27 },
						{ axis: "Orderliness", value: 0.03 },
						{ axis: "Self-discipline", value: 0.12 },
						{ axis: "Self-efficacy", value: 0.4 },

						{ axis: "Introversion / Extraversion", value: 0.03 },
						{ axis: "Activity level", value: 0.22 },
						{ axis: "Assertiveness", value: 0.03 },
						{ axis: "Cheerfulness", value: 0.03 },
						{ axis: "Excitement-seeking", value: 0.07 },
						{ axis: "Outgoing", value: 0.18 },
						{ axis: "Gregariousness", value: 0.07 },

						{ axis: "Agreeableness", value: 0.08 },
						{ axis: "Altruism", value: 0.12 },
						{ axis: "Cooperation", value: 0.27 },
						{ axis: "Modesty", value: 0.03 },
						{ axis: "Morality / Uncompromising", value: 0.12 },
						{ axis: "Sympathy", value: 0.4 },
						{ axis: "Trust", value: 0.03 },

						{ axis: "Emotional range", value: 0.22 },
						{ axis: "Fiery", value: 0.03 },
						{ axis: "Prone to worry", value: 0.03 },
						{ axis: "Melancholy", value: 0.07 },
						{ axis: "Immoderation", value: 0.18 },
						{ axis: "Self-consciousness", value: 0.07 },
						{ axis: "Susceptible to stress", value: 0.08 }
					]
				];


				// var d = [
				// 	[
				// 		{ axis: "Openness", value: 0.59 },
				// 		{ axis: "Adventurousness", value: 0.56 },
				// 		{ axis: "Artistic interests", value: 0.42 },
				// 		{ axis: "Emotionality", value: 0.34 },
				// 		{ axis: "Imagination", value: 0.48 },
				// 		{ axis: "Intellect", value: 0.14 },
				// 		{ axis: "Authority-challenging", value: 0.11 }
				// 		// { axis: "Openness", value: pi_openness_data.percentage },
				// 		// { axis: "Adventurousness", value: pi_openness_data.children[0].percentage },
				// 		// { axis: "Artistic interests", value: pi_openness_data.children[1].percentage },
				// 		// { axis: "Emotionality", value: pi_openness_data.children[2].percentage },
				// 		// { axis: "Imagination", value: pi_openness_data.children[3].percentage },
				// 		// { axis: "Intellect", value: pi_openness_data.children[4].percentage },
				// 		// { axis: "Authority-challenging", value: pi_openness_data.children[5].percentage }
				// 	],
				// 	[
				// 		{ axis: "Conscientiousness", value: 0.05 },
				// 		{ axis: "Achievement striving", value: 0.07 },
				// 		{ axis: "Cautiousness", value: 0.12 },
				// 		{ axis: "Dutifulness", value: 0.27 },
				// 		{ axis: "Orderliness", value: 0.03 },
				// 		{ axis: "Self-discipline", value: 0.12 },
				// 		{ axis: "Self-efficacy", value: 0.4 }
				// 		// { axis: "Conscientiousness", value: pi_conscientiousness_data.percentage },
				// 		// { axis: "Achievement striving", value: pi_conscientiousness_data.children[0].percentage },
				// 		// { axis: "Cautiousness", value: pi_conscientiousness_data.children[1].percentage },
				// 		// { axis: "Dutifulness", value: pi_conscientiousness_data.children[2].percentage },
				// 		// { axis: "Orderliness", value: pi_conscientiousness_data.children[3].percentage },
				// 		// { axis: "Self-discipline", value: pi_conscientiousness_data.children[4].percentage },
				// 		// { axis: "Self-efficacy", value: pi_conscientiousness_data.children[5].percentage }
				// 	],
				// 	[
				// 		{ axis: "Introversion / Extraversion", value: 0.03 },
				// 		{ axis: "Activity level", value: 0.22 },
				// 		{ axis: "Assertiveness", value: 0.03 },
				// 		{ axis: "Cheerfulness", value: 0.03 },
				// 		{ axis: "Excitement-seeking", value: 0.07 },
				// 		{ axis: "Outgoing", value: 0.18 },
				// 		{ axis: "Gregariousness", value: 0.07 }
				// 		// { axis: "Introversion / Extraversion", value: pi_extraversion_data.percentage },
				// 		// { axis: "Activity level", value: pi_extraversion_data.children[0].percentage },
				// 		// { axis: "Assertiveness", value: pi_extraversion_data.children[1].percentage },
				// 		// { axis: "Cheerfulness", value: pi_extraversion_data.children[2].percentage },
				// 		// { axis: "Excitement-seeking", value: pi_extraversion_data.children[3].percentage },
				// 		// { axis: "Outgoing", value: pi_extraversion_data.children[4].percentage },
				// 		// { axis: "Gregariousness", value: pi_extraversion_data.children[5].percentage }
				// 	],
				// 	[
				// 		{ axis: "Agreeableness", value: 0.08 },
				// 		{ axis: "Altruism", value: 0.12 },
				// 		{ axis: "Cooperation", value: 0.27 },
				// 		{ axis: "Modesty", value: 0.03 },
				// 		{ axis: "Morality / Uncompromising", value: 0.12 },
				// 		{ axis: "Sympathy", value: 0.4 },
				// 		{ axis: "Trust", value: 0.03 }
				// 		// { axis: "Agreeableness", value: pi_agreeableness_data.percentage },
				// 		// { axis: "Altruism", value: pi_agreeableness_data.children[0].percentage },
				// 		// { axis: "Cooperation", value: pi_agreeableness_data.children[1].percentage },
				// 		// { axis: "Modesty", value: pi_agreeableness_data.children[2].percentage },
				// 		// { axis: "Morality / Uncompromising", value: pi_agreeableness_data.children[3].percentage },
				// 		// { axis: "Sympathy", value: pi_agreeableness_data.children[4].percentage },
				// 		// { axis: "Trust", value: pi_agreeableness_data.children[5].percentage }
				// 	],
				// 	[
				// 		{ axis: "Emotional range", value: 0.22 },
				// 		{ axis: "Fiery", value: 0.03 },
				// 		{ axis: "Prone to worry", value: 0.03 },
				// 		{ axis: "Melancholy", value: 0.07 },
				// 		{ axis: "Immoderation", value: 0.18 },
				// 		{ axis: "Self-consciousness", value: 0.07 },
				// 		{ axis: "Susceptible to stress", value: 0.08 }
				// 		// { axis: "Emotional range", value: pi_emotionalRange_data.percentage },
				// 		// { axis: "Fiery", value: pi_emotionalRange_data.children[0].percentage },
				// 		// { axis: "Prone to worry", value: pi_emotionalRange_data.children[1].percentage },
				// 		// { axis: "Melancholy", value: pi_emotionalRange_data.children[2].percentage },
				// 		// { axis: "Immoderation", value: pi_emotionalRange_data.children[3].percentage },
				// 		// { axis: "Self-consciousness", value: pi_emotionalRange_data.children[4].percentage },
				// 		// { axis: "Susceptible to stress", value: pi_emotionalRange_data.children[5].percentage }
				// 	]
				// ];

				// Options for the Radar chart
				var w = 600;
					h = 600;
				var colorscale = d3.scale.category10();
				var mycfg = {
					w: w,
					h: h,
					maxValue: 0.6,
					levels: 6,
					ExtraWidthX: 300
				};

				// Draw the Radar chart. Will expect that data is in %'s
				RadarChart.draw(".chartPersonalityInsights", d, mycfg);

				// ======================== //
				// =======  LEGEND  ======= //
				// ======================== //

				// Legend titles
				var LegendOptions = ['Openness', 'Conscientiousness', 'Introversion / Extraversion', 'Agreeableness', 'Emotional Range'];

				var chartContainer = d3.select('.chartPersonalityInsights')
					.attr("width", w + 300)
					.attr("height", h);

				var svg = d3.select('.chartPersonalityInsights')
					.selectAll('svg')
					.append('svg')
					.attr("width", w + 300)
					.attr("height", h);

				// Create the title for the legend
				var text = svg.append("text")
					.attr("class", "title")
					.attr('transform', 'translate(150,0)') 
					.attr("x", w - 70)
					.attr("y", 10)
					.attr("font-size", "12px")
					.attr("fill", "#404040")
					.text("Personality Category");
				// Initiate Legend	
				var legend = svg.append("g")
					.attr("class", "legend")
					.attr("height", 100)
					.attr("width", 200)
					.attr('transform', 'translate(150,20)');
				// Create colour squares
				legend.selectAll('rect')
					.data(LegendOptions)
					.enter()
					.append("rect")
					.attr("x", w - 65)
					.attr("y", function(d, i){ return i * 20; })
					.attr("width", 10)
					.attr("height", 10)
					.style("fill", function(d, i){ return colorscale(i); });
				// Create text next to squares
				legend.selectAll('text')
					.data(LegendOptions)
					.enter()
					.append("text")
					.attr("x", w - 52)
					.attr("y", function(d, i){ return i * 20 + 9; })
					.attr("font-size", "11px")
					.attr("fill", "#737373")
					.text(function(d) { return d; });	

			}
		};

	});
