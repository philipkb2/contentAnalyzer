var watson = require('watson-developer-cloud');
var keys = require('../keys.js');

// 100 free API events per MONTH
var PIusername = keys.ibmPIUsername;
var PIpassword = keys.ibmPIPassword;

module.exports = {

	GetPersonalityInsights: function(req, res, next){
		var personality_insights = watson.personality_insights({
			username: PIusername,
			password: PIpassword,
			version: 'v2'
		});

		personality_insights.profile({
			function(req) {
				if (params === req.body.text) {
					return "text: req.body.text"; // minimum 100 words, should be 3500+, ideally 6000+
				} else if (params === req.body.url) {
					return "url: req.body.url";
				}
			}
		},
			function (err, res) {
				if (err) {
					console.log('error:', err);
					res.status(500).json(err);
				}
				else {
					console.log(JSON.stringify(res, null, 2));
					res.status(200).json(res, null, 2);
				}
		});
	},

	CreatePersonalityInsights: function(req, res, next){

	}

};

// API DOCS: http://www.ibm.com/watson/developercloud/personality-insights/api/v2/?node#authentication