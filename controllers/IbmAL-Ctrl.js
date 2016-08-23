var watson = require('watson-developer-cloud');

var AlchemyAPI = require('alchemy-api');
var keys = require('../keys.js');

// KEYS //
var alchemyKey = keys.ibmAlchemyKey;	// 1000 free API events per day

var alchemy_language = watson.alchemy_language({
	api_key: alchemyKey
});

module.exports = {

	GetAlchemyCombined: function(req, res, next) {

		var watsonMethods = 'entities,keywords,concepts,doc-sentiment,doc-emotion';
		var textParams = {
			extract: watsonMethods,
			maxRetrieve: 5,
			linkedData: 0,
			// emotion: 1,	// Analyze emotions associated with each entity & keyword. Incurs an addt'l transaction charge.
			// sentiment: 1,	// Analyze the sentiment towards each entity & keyword. Incurs an addt'l transaction charge.
			text: req.body.text
		};
		var urlParams = {
			extract: watsonMethods,
			maxRetrieve: 5,
			linkedData: 0,
			// emotion: 1,	// Analyze emotions associated with each entity & keyword. Incurs an addt'l transaction charge.
			// sentiment: 1,	// Analyze the sentiment towards each entity & keyword. Incurs an addt'l transaction charge.
			url: req.body.url,
			showSourceText: 1	// Returns URL's cleaned-up text
		};

		var chooseParams = function(req) {
			if (req.body.text) {
				return textParams;
			} else if (req.body.url) {
				return urlParams;
			}
		};

		alchemy_language.combined(chooseParams(req), function (err, response) {
			if (err) {
				res.status(500).json(err);
			} else if (response) {
				res.status(200).json(response);
			}
		});
	},

	GetAlchemyTextOnly: function(req, res, next) {
		alchemy_language.combined({extract: 'text', url: req.body.url}, function(err, response) {
			if (err) {
				console.log('Alchemy Error: ' + err);
				res.status(500).json(err);
			} else if (response) {
				console.log('Alchemy Response: ' + response);
				res.status(200).json(response);
			}
		});
	},

	CreateAlchemyCombined: function(req, res, next) {

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
