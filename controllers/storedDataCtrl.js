var Chart = require('./../Models/Charts');

module.exports = {

	CreateContent: function(req, res, next){
		console.log("Data Stored");
		var newAnalysis = new Analysis(req.body);
		newAnalysis.save(function(err, res))
	},

	createChartData: function(req, res, next){
		console.log("hitting new chart", req.body);	// CHANGE TO REQ.QUERY
		var newChart = new Chart(req.body);
		newChart.save(function(err, result){
			if (err) {
				res.status(500 + 'createChartData function error').json(err);
			} else {
				res.status(200).json(result);
			}
		});
	},

};