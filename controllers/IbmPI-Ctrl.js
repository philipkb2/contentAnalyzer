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

		personality_insights.profile({text: req.body.text}, function(err, response) {	// minimum 100 words, should be 3500+, ideally 6000+
			if (err) {
				console.log('PI Error: ' + err);
				res.status(500).json(err);
			} else if (response) {
				console.log('PI Response: ' + response);
				console.log(JSON.stringify(response, null, 2));
				res.status(200).json(response, null, 2);
			}
		});
	},

	CreatePersonalityInsights: function(req, res, next){

	}

};

// API DOCS: http://www.ibm.com/watson/developercloud/personality-insights/api/v2/?node#authentication