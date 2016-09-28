angular.module('textAnalyzer')
	.directive('displayPersonalityInsightsRadHist', function(){

		return {
			scope: {
				personalityInsightsRadHistData: '='
			},
			templateUrl: '../views/personalityInsightsRadialHistogramTmpl.html',
			link: function(scope, element, attrs){

				var pi_data = scope.pi_response;

				var radialHistogram = function(){
					// var data = "409238641 64923643 69006608 53773682 51820020 57659028 47083601 48278540 43995315 44079542 82280042 39579853 124354270";

					// var histogramData = [
					// 	{ key: 0, label: "Openness", value: 0.59 },
					// 	{ key: 10.2857142857, label: "Adventurousness", value: 0.56 },
					// 	{ key: 20.571428571, label: "Artistic interests", value: 0.42 },
					// 	{ key: 30.857142857, label: "Emotionality", value: 0.34 },
					// 	{ key: 41.142857143, label: "Imagination", value: 0.48 },
					// 	{ key: 51.428571429, label: "Intellect", value: 0.14 },
					// 	{ key: 61.714285714, label: "Authority-challenging", value: 0.11 },

					// 	{ key: 72, label: "Conscientiousness", value: 0.05 },
					// 	{ key: 82.285714286, label: "Achievement striving", value: 0.07 },
					// 	{ key: 92.571428571, label: "Cautiousness", value: 0.12 },
					// 	{ key: 102.85714286, label: "Dutifulness", value: 0.27 },
					// 	{ key: 113.14285714, label: "Orderliness", value: 0.03 },
					// 	{ key: 123.42857143, label: "Self-discipline", value: 0.12 },
					// 	{ key: 133.71428571, label: "Self-efficacy", value: 0.4 },

					// 	{ key: 144, label: "Introversion / Extraversion", value: 0.03 },
					// 	{ key: 154.28571429, label: "Activity level", value: 0.22 },
					// 	{ key: 164.57142857, label: "Assertiveness", value: 0.03 },
					// 	{ key: 174.85714286, label: "Cheerfulness", value: 0.03 },
					// 	{ key: 185.14285714, label: "Excitement-seeking", value: 0.07 },
					// 	{ key: 195.42857143, label: "Outgoing", value: 0.18 },
					// 	{ key: 205.71428571, label: "Gregariousness", value: 0.07 },

					// 	{ key: 216, label: "Agreeableness", value: 0.08 },
					// 	{ key: 226.28571429, label: "Altruism", value: 0.12 },
					// 	{ key: 236.57142857, label: "Cooperation", value: 0.27 },
					// 	{ key: 246.85714286, label: "Modesty", value: 0.03 },
					// 	{ key: 257.14285714, label: "Morality / Uncompromising", value: 0.12 },
					// 	{ key: 267.42857143, label: "Sympathy", value: 0.4 },
					// 	{ key: 277.71428571, label: "Trust", value: 0.03 },

					// 	{ key: 288, label: "Emotional range", value: 0.22 },
					// 	{ key: 298.28571429, label: "Fiery", value: 0.03 },
					// 	{ key: 308.57142857, label: "Prone to worry", value: 0.03 },
					// 	{ key: 318.85714286, label: "Melancholy", value: 0.07 },
					// 	{ key: 329.14285714, label: "Immoderation", value: 0.18 },
					// 	{ key: 339.42857143, label: "Self-consciousness", value: 0.07 },
					// 	{ key: 349.71428571, label: "Susceptible to stress", value: 0.08 }
					// ];

					var histogramData = [
						{ key: 0, label: "Openness", value: 0.59 },
						{ key: 1, label: "Adventurousness", value: 0.56 },
						{ key: 2, label: "Artistic interests", value: 0.42 },
						{ key: 3, label: "Emotionality", value: 0.34 },
						{ key: 4, label: "Imagination", value: 0.48 },
						{ key: 5, label: "Intellect", value: 0.14 },
						{ key: 6, label: "Authority-challenging", value: 0.11 },

						{ key: 7, label: "Conscientiousness", value: 0.05 },
						{ key: 8, label: "Achievement striving", value: 0.97 },
						{ key: 9, label: "Cautiousness", value: 0.12 },
						{ key: 10, label: "Dutifulness", value: 0.27 },
						{ key: 11, label: "Orderliness", value: 0.03 },
						{ key: 12, label: "Self-discipline", value: 0.12 },
						{ key: 13, label: "Self-efficacy", value: 0.4 },

						{ key: 14, label: "Intro / Extraversion", value: 0.03 },
						{ key: 15, label: "Activity level", value: 0.22 },
						{ key: 16, label: "Assertiveness", value: 0.03 },
						{ key: 17, label: "Cheerfulness", value: 0.03 },
						{ key: 18, label: "Excitement-seeking", value: 0.07 },
						{ key: 19, label: "Outgoing", value: 0.18 },
						{ key: 20, label: "Gregariousness", value: 0.07 },

						{ key: 21, label: "Agreeableness", value: 0.08 },
						{ key: 22, label: "Altruism", value: 0.12 },
						{ key: 23, label: "Cooperation", value: 0.27 },
						{ key: 24, label: "Modesty", value: 0.03 },
						{ key: 25, label: "Morality / Uncompromising", value: 0.12 },
						{ key: 26, label: "Sympathy", value: 0.01 },
						{ key: 27, label: "Trust", value: 0.03 },

						{ key: 28, label: "Emotional range", value: 0.22 },
						{ key: 29, label: "Fiery", value: 0.03 },
						{ key: 30, label: "Prone to worry", value: 0.03 },
						{ key: 31, label: "Melancholy", value: 0.07 },
						{ key: 32, label: "Immoderation", value: 0.18 },
						{ key: 33, label: "Self-consciousness", value: 0.07 },
						{ key: 34, label: "Susceptible to stress", value: 0.08 }
					];

					var width = 600,
						height = 600,
						maxBarHeight = 300,
						center = 65,
						cx = width / 2,
						cy = height / 2;

					// Width scale of the bars
					var radialScale = d3.scale.linear()
						.domain([0, 35]) // [0, 360]
						.range([0, 2 * Math.PI]);	// How far around the outer circle the bars wrap. Current: 1x.

					// Height scale of the bars
					var scale = d3.scale.linear()
						.domain([0, d3.max(histogramData, function(d) { return d.value; })])
						.range([center, maxBarHeight]);

					var vis = d3.select(".radialHistogram")
						.attr("width", width)
						.attr("height", height);

					var innerCircle = vis.append("circle")
						.attr("cx", cx)
						.attr("cy", cy)
						.attr("r", center)
						.attr("fill", "white")
						.attr("stroke", "black")
						.attr("stroke-width", "2px");

					var innerCircleOverlay = vis.append("circle")
						.attr("cx", cx)
						.attr("cy", cy)
						.attr("class", "overlay")
						.attr("r", center)
						.attr("fill", "white")
						.attr("style", "opacity:1")
						.attr("stroke", "black")
						.attr("stroke-width", "2px");

					var text = vis.append("text")
						.attr("x", cx)
						.attr("y", cy)
						.attr("font-size", "22px")
						.attr("center", 65)
						.text("Personality");

					var text2 = vis.append("text")
						.attr("x", cx)
						.attr("y", cy + 20)
						.attr("font-size", "22px")
						.text("Profile");

					var arc = d3.svg.arc()
						.innerRadius(center)
						.outerRadius(function(d) { return scale(d.value); })
						.startAngle(function(d) { return radialScale(d.key); })
						.endAngle(function(d) { return radialScale(d.key + 1.1); });

					var arc2 = d3.svg.arc()
						.innerRadius(function(d) { return scale(d.value); })
						.outerRadius(maxBarHeight)
						.startAngle(function(d) { return radialScale(d.key); })
						.endAngle(function(d) { return radialScale(d.key + 1.1); });

					var data = vis.selectAll("path")
						.data(histogramData)
						.enter();

					// outer path
					data.append("path")
						.attr("d", arc2)
						.attr('style', 'fill:transparent')
						.attr("transform", "translate(" + cx + "," + cy +")")
						.call(interactions, false);

					// inner path
					data.append("path")
						.attr("d", arc)
						.attr("style", function(d) {
							var hue = d.key / 35;
							var rgb = hslToRgb(hue, 0.5, 0.5);
							return "fill: " + rgbToFill(rgb);
						})
						.attr("transform", "translate(" + cx + "," + cy +")")
						.call(interactions, true);

					function interactions(el, highlight) {
						el.on("mouseover", function(d) {
							if (highlight) {
								d3.select(this)
									.attr("style", "fill:black");
							} else {
								d3.select(this)
									.attr("style", "fill:#bbb");
							}

							var hue = d.key / 35;
							var rgb = hslToRgb(hue, 0.8, 0.5);
							innerCircleOverlay.attr("style", "opacity:0");
							innerCircle.attr("fill", rgbToFill(rgb));

							text.text((d.value * 100).toFixed(0) + "%")
								.attr("font-size", "30px");
							text2.text(d.label)
								.attr("font-size", d.label.length > 16 ? "12px" : "15px");

						})
						.on("mouseout", function(d) {
							if (highlight) {
								d3.select(this)
									.attr("style", function(d) {
										var hue = d.key / 35;
										var rgb = hslToRgb(hue, 0.5, 0.5);
										return "fill: " + rgbToFill(rgb);
									});
							} else {
								 d3.select(this)
									.attr("style", "fill: transparent");
							}

							innerCircleOverlay.attr("style", "opacity:1");

							text.text("Personality")
								.attr("font-size", "22px");
							text2.text("Profile")
								.attr("font-size", "22px");
						});
					}

				};

				// http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
				function hslToRgb(h, s, l){
					var r, g, b;
					function hue2rgb(p, q, t){
						if (t < 0) { t += 1; }
						if (t > 1) { t -= 1; }
						if (t < 1/6) { return p + (q - p) * 6 * t; }
						if (t < 1/2) { return q; }
						if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
						return p;
					}

					if (s === 0) {
						r = g = b = l; // achromatic
					} else {
						var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
						var p = 2 * l - q;
						r = hue2rgb(p, q, h + 1/3);
						g = hue2rgb(p, q, h);
						b = hue2rgb(p, q, h - 1/3);
					}

					return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
				}

				function rgbToFill(rgb){
				    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
				}

				radialHistogram();

			}
		};

	});
