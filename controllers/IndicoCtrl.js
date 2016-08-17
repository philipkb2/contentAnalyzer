var indico = require('indico.io');
var needle = require('needle');
var keys = require('../keys.js');

indico.apiKey = keys.indicoKey;

// Keys can no longer be passed in as url parameters >> https://indico.io/updates/security

module.exports = {

	// Consider splitting into separate API calls in case users only look at a portion of them.
	// That way the # of calls can be reduced.
	GetIndicoMultiText: function(req, res, next) {	// https://indico.io/docs#analyze_text
		indico.analyzeText(req.body.text, {
			apis: [
				'sentimentHQ'
				// 'personality',
				// 'personas',
				// 'emotion',
				// 'political',
				// 'keywords'
				// 'relevance' ['', '']
			]
		}).then(function(response, err) {	// console.log(arguments[0]);	// console.log(arguments);
			if (err) {
				console.log(err);
				res.status(500).json(err);
			} else if (response) {
				console.log(response);
				res.status(200).json(response);
			}
		});
	},

	CreateIndicoMultiText: function(req, res, next){
		
	},

	GetIndicoPersonaText: {
		// function(req, res, next){
	// 	needle.post(
	// 		'https://apiv2.indico.io/personality?key=' + indico.apiKey + '&persona=true&threshold=0.1',
	// 		// JSON.stringify
	// 		// {
	// 		// 	"data": req.body.text,
	// 		// 	"persona": true,
	// 		// 	"threshold": 0.1
	// 		// },
	// 		function(err, response) {
	// 			if (err) {
	// 				return err;
	// 				// res.status(500).json(err);
	// 			} else if (response) {
	// 				console.log(response);
	// 				// res.status(200).send(response);
	// 				return response;
	// 			}
	// 		}
	// 	);
	}

};



// var needleData = {
// 		"data": "I only stay home on Saturday nights to read.",
// 		"persona": true,
// 		"threshold": 0.1
// 		};



// $.post(
//   'https://apiv2.indico.io/personality?key=083b2a5e7d4b1fc8856a99b1674a076e',
//   {
//     data: JSON.stringify({
//       'data': "I only stay home on Saturday nights to read.",
//       'persona': true,
//       'threshold': 0.1
//     }),
//     success: function (data) {
//       console.log(data);
//     }
//   }
// );



// 		indico.personas(req.body.text)
// 			.then(function(response, err) {
// 				if (err) {
// 					res.status(500).json(err);
// 				} else if (response) {
// 					res.status(200).json(response);
// 				}
// 			});
// 	}




// indico.analyzeText(
// 	'<TEXT>',
// 	['RelatedTerm1', 'RelatedTerm2'],
// 	{version: 2},
// 	{apis: ['sentiment_hq', 'personality', 'persona', 'emotion', 'political', 'keywords', 'relevance']}
// )
// 	.then(response)
// 	.catch(logError);


// ============================================================
// Indico.io docshttps://indico.io/docs#sentiment_hq
// Indico.io NODE PKG: https://www.npmjs.com/package/indico.io
// 10,000 free API calls per month
// ============================================================

// apis response:
// [
//     {
	 //    'sentiment_hq': 0.7300551533699036,
	 //    'political': {
	 //        'Conservative': 0.2288717527904388,
	 //        'Green': 0.05575739681227337,
	 //        'Liberal': 0.6541234047231098,
		// 	'Libertarian': 0.06124744567417795
	 //    },
		// 'personality': {
	 //        'extraversion': 0.384,
	 //        'openness': 0.730,
	 //        'agreeableness': 0.439,
	 //        'conscientiousness': 0.103
	 //    },
// 	    'persona': {	// 16 Myers Briggs personas
// 	    	'architect': 0.036483237448904055,
// 	    	'logician': 0.036483237448904055,
// 	    	'commander': 0.036483237448904055,
// 		    'debator': 0.038705012628395506,
// 		    'advocate': 0.03894013672918785,
// 		    'mediator': 0.036483237448904055,
// 		    'protagonist': 0.036483237448904055,
// 		    'campaigner': 0.036483237448904055,
// 		    'logistician': 0.036483237448904055,
// 		    'defender': 0.036483237448904055,
// 		    'executive': 0.036483237448904055,
// 		    'consul': 0.12134217481571341,
// 		    'virtuoso': 0.036483237448904055,
// 		    'adventurer': 0.036483237448904055,
// 		    'entrepreneur': 0.036483237448904055,
// 		    'entertainer': 0.036483237448904055
// 		},
// 		'relevance': [
// 			0.16670130847921036,
// 			0.2949661163493879
// 		],
// 		'emotion': {
// 			'anger': 0.007581704296171665,
// 			'joy': 0.07016665488481522,
// 			'fear': 0.8000516295433044,
// 			'sadness': 0.02512381225824356,
// 			'surprise': 0.06534374748375202
// 		},
// 		'keywords': {
// 			'example1': 0.38810469246709006,
// 			'exampleB': 0.61189530753291
// 		}
// ]
