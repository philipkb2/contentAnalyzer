
function radHist(){
    var data = "409238641 64923643 69006608 53773682 51820020 57659028 47083601 48278540 43995315 44079542 82280042 39579853 124354270 43933088 33755942 75179173 79031049 60171038 66618375 65700947 79953058 114388871 114036001 87568975 84831183 139007427 163946765 79727674 115119128 98631690 183489242 89049966 209983209 105529421 121930985 114236285 98134215 187512307 95813076 90269515 283440112 134841726 149347730 187336798 97957133 128709106 61058364 76193563 221739351 50152506 132257833 117126329 76672059 39892105 44399556 51911706 47099852 49763472 38684649 15608970 535213657 25873795 14429415 37619586 27130420 27783365 21274201 34035160 33972079 57458742 95929704 49090458 69979300 27796380 20348141 28893138 31241979 31476127 22817847 29853243 42462203 21362434 28810230 40138737 34690219 48117464 23700591 21192347 25401650 20770006 39089189 27329688 24135447 20274684 18646356 22048656 28340863 16387850 20996505 58543461 29545920 14791934 28307798 15779258 18592649 15532852 13338543 15804741 10252656 30878615 13156700 16461687 20741523 13979934 16330480 11926369 16273217 13871666 15580746 68971516 88549631 12244118 12295209 11133422 12225134 13623173 10627608 12892966 7244978 11607218 13508526 27035402 18440148 11695870 7822155 9195074 11958968 11042638 15979665 16569412 19002453 6575311 12609880 7903405 11898779 9596257 16389594 24388303 9506338 183824705 57529212 12513158 12803218 9742852 11712707 10822579 11008340 7020744 12575168 35008204 27597755 8522088 9527268 8740450 38968532 25749889 9146237 13028468 23632136 11995901 19476520 12582865 12514595 37844682 21407341 14248740 21985628 17720591 21596265 63463735 204007115 27019429 29118460 32753938 39631075 41623676 39646029 42305379 51100448 60119817 89915615 111214299 122584744 68028586 63572717 116099086 158108463 132024429 147438322 124567959 155203863 173092338 205343029 135821893 145648693 281468243 264955959 134433178 179148946 154952539 274187431 122538903 292827230 144761890 171617033 157895838 115503918 203044136 81002049 249109097 326310794 168559903 116540242 87281702 115096929 140567391 32338525 72807938 192778442 29409178 107104796 63960695 43088863 16900863 18243384 21695395 22742346 42711626 18182962 11386240 491766230 22035755 8578960 32285059 17907068 15693199 12050266 20792646 21143619 22005282 69331515 4451475 217290308 10424991 6320526 16097582 14225774 10961775 8345990 5975557 31735711 4755506 9413178 7996922 31220119 25445021 10542887 8386496 9709293 6939758 28477431 11237169 13648549 9988894 8872422 6946626 20379614 7992066 9658560 10263343 54230128 6889883 17063016 9605428 5821989 9595781 5614682 10435559 6465445 8347796 21320577 9935546 14036602 6867752 6749331 4121006 7098094 5384602 7247442 3314869 119262612 6891042 5659752 5902447 5831147 7745654 10584681 5432128 5249296 5133560 9558416 5243774 30204878 7838262 6242943 7472320 10916555 9037503 13081803 5954714 25731871 6173740 9262271 6159588 13418588 10359992 14434335 22400224 10811771 9497283 165037416 14513517 13633447 16304793 13825869 11725907 16504084 10928787 17275236 16887116 56092018 17184629 16018885 16285953 20051892 69278860 20828693 21448478 35023397 24239857 39813767 27261789 31156580 50440841 57427060 44538258 63017351 77560764 76646471 84863046";

    var datapoints = data.split(" ");
    var histogram = [];
    var sum = 0;
    for (var i = 0; i < datapoints.length; i++) {
        var datapoint = datapoints[i];
        histogram.push({ key: i, value: (datapoint/1000000) });
        sum+= datapoint / 1000000000;
    }

    var width = 600,
        height = 400,
        maxBarHeight = 260,
        center = 50,
        cx = width/2,
        cy = height/2;

    var radialScale = d3.scale.linear()
        .domain([0, 360])
        .range([0, 2 * Math.PI]);

    var scale = d3.scale.linear()
        .domain([0, d3.max(histogram, function(d) { return d.value; })])
        .range([center, maxBarHeight]);

    var vis = d3.select("#radialHistogram2")
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
        .attr("font-size", "30px")
        .text("19.5");

    var text2 = vis.append("text")
        .attr("x", cx)
        .attr("y", cy + 20)
        .text("billion");

    var arc = d3.svg.arc()
        .innerRadius(center)
        .outerRadius(function(d) { return scale(d.value); })
        .startAngle(function(d) { return radialScale(d.key); })
        .endAngle(function(d) { return radialScale(d.key + 1.4); });

    var arc2 = d3.svg.arc()
        .innerRadius(function(d) { return scale(d.value); })
        .outerRadius(maxBarHeight)
        .startAngle(function(d) { return radialScale(d.key); })
        .endAngle(function(d) { return radialScale(d.key + 1.4); });

    var data = vis.selectAll("path")
        .data(histogram)
        .enter();

    // outer path
    data.append("path")
        .attr("d", arc2)
        .attr("transform", "translate(" + cx + "," + cy +")")
        .call(interactions, false);

    // inner path
    data.append("path")
        .attr("d", arc)
        .attr("style", function(d) {
            var hue = d.key / 360;
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

            innerCircleOverlay.attr("style", "opacity:0");

            var hue = d.key / 360;
            var rgb = hslToRgb(hue, 0.8, 0.5);
            innerCircle.attr("fill", rgbToFill(rgb));

            text.text(d.value.toFixed(1));
            text2.text("million");
        })
        .on("mouseout", function(d) {
            text.text(sum.toFixed(1));
            text2.text("billion");

            if (highlight) {
                d3.select(this)
                    .attr("style", function(d) {
                        var hue = d.key / 360;
                        var rgb = hslToRgb(hue, 0.5, 0.5);
                        return "fill: " + rgbToFill(rgb);
                    });
            } else {
                 d3.select(this)
                    .attr("style", "fill:none");
            }

            innerCircleOverlay.attr("style", "opacity:1");
        });
    }

}
