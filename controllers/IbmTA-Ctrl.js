// var AlchemyAPI = require('alchemy-api');
var watson = require('watson-developer-cloud');
var keys = require('../keys.js');

// var alchemyKey = keys.ibmAlchemyKey;	// 1000 free API events per MONTH
var TAusername = keys.ibmTAUsername;
var TApassword = keys.ibmTAPassword;

module.exports = {

	GetToneAnalyzer: function(req, res, next){
		var tone_analyzer = watson.tone_analyzer({
			username: TAusername,
			password: TApassword,
			version: 'v3',
			version_date: '2016-05-19'
		});
		tone_analyzer.tone(
			{text: req.body.text},
			function(err, tone) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
				}
				else if (tone) {
					console.log(JSON.stringify(tone, null, 2));
					// res.status(200).json(tone);
					res.status(200).json(tone, null, 2);
				}
			}
		);
	},

	CreateToneAnalyzer: function(req, res, next){

	}

};

// // TONE ANALYZER - emotion, writing, social tones -- ONLY TEXT
