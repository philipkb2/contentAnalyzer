var watson = require('watson-developer-cloud');

var AlchemyAPI = require('alchemy-api');
var keys = require('../keys.js');

// KEYS //
var alchemyKey = keys.ibmAlchemyKey;	// 1000 free API events per day

var alchemy_language = watson.alchemy_language({
	api_key: alchemyKey
});

module.exports = {

	GetAlchemyCombined: function(req, res, next){

		var watsonMethods = 'entities,keywords,concepts,doc-sentiment,doc-emotion';
		var textParams = {
			extract: watsonMethods,
			maxRetrieve: 5,
			linkedData: 0,
			text: req.body.text
		};
		var urlParams = {
			extract: watsonMethods,
			maxRetrieve: 5,
			linkedData: 0,
			url: req.body.url,
			showSourceText: 1
		};

		var chooseParams = function(req){
			if (req.body.text) {
				return textParams;
			} else if (req.body.url) {
				return urlParams;
			}
		};

		alchemy_language.combined(chooseParams(req), function (err, response) {
			if (err) {
				console.log('Alchemy Error: ' + err);
				res.status(500).json(err);
			} else if (response) {
				console.log('Alchemy Response: ' + response);
				res.status(200).json(response);
			}
		});
	},

	CreateAlchemyCombined: function(req, res, next){

	},

	CreateAlchemySentiment: function(req, res, next){

	},

	CreateAlchemyEmotions: function(req, res, next){

	},

	GetAlchemyTextFromURL: function(req, res, next){
		var alchemy = new AlchemyAPI(alchemyKey);
		alchemy.combined(
			req.body.urlOrText,
			['text', 'entities', 'keywords', 'concepts', 'sentiment', 'emotions'],
			{'showSourceText': 1, 'linkedData': 0, 'maxRetrieve': 20},
			function(err, response) {
				if (err) {
					console.log('Alchemy Error:' + err);
					res.status(500).json(err);
				} else if (response) {
					console.log('Alchemy Response:' + response);
					res.status(200).json(response);
				}
			}
		);
	},

		GetAlchemyCombinedOLD: function(req, res, next){
			var alchemy = new AlchemyAPI(alchemyKey);
			alchemy.combined(
				req.body.urlOrText,
				['text', 'entities', 'keywords', 'concepts', 'sentiment', 'emotions'],
				{'showSourceText': 1, 'linkedData': 0, 'maxRetrieve': 20},
				function(err, res) {
					if (err) {
						res.status(500).json(err);
					} else if (res) {
						res.status(200).json(res);				
					}
				}
			);
		},

	GetAlchemySentiment: function(req, res, next){
		var alchemy = new AlchemyAPI(alchemyKey);
		alchemy.sentiment(
			req.body.urlOrText,
			{},
			function(err, res) {
				if (err) {
					res.status(500).json(err);
				} else if (res) {
					res.status(200).json(res);			
				}
			}
		);
	},

	GetAlchemyEmotions: function(req, res, next){
		var alchemy = new AlchemyAPI(alchemyKey);
		alchemy.emotions(
			req.body.urlOrText,
			{},
			function(err, res) {
				if (err) {
					res.status(500).json(err);
				} else if (res) {
					res.status(200).json(res);
				}
			}
		);
	}

};


// ==============================================================================
// For AlchemyAPI...
// Alchemy API NODE PKG: https://www.npmjs.com/package/alchemy-api
// Examples: https://github.com/AlchemyAPI/alchemyapi_node/blob/master/tests.js
// Examples: https://github.com/AlchemyAPI/alchemyapi_node/blob/master/app.js
// 
// IBM BLUEMIX CONSOLE: https://console.ng.bluemix.net
// 
// For Tone Analyzer & Personality Insights...
// Watson Developer Cloud NODE Docs: https://www.npmjs.com/package/watson-developer-cloud
// Personality Insights API NODE docs: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/personality-insights/api/v2/
// ==============================================================================


// ALCHEMY LANGUAGE API ----- ONLY IF ALCHEMYAPI DOESN'T WORK
// var watson = require('watson-developer-cloud');

// var alchemy_language = watson.alchemy_language({
// 	api_key: alchemyKey;
// });
 
// var params = {
// 	text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
// };
 
// alchemy_language.sentiment(params, function (err, res) {
// 	if (err)
//     	console.log('error:', err);
// 	else
//     	console.log(JSON.stringify(res, null, 2));
// });
