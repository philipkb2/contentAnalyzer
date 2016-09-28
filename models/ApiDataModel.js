var mongoose = require('mongoose');

// function truncateNum(num){
// 	return Math.round((num + 0.00001) * 1000) / 1000;
// }

var Analysis = new mongoose.Schema({

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: String,
	timestamps: true,	// http://mongoosejs.com/docs/guide.html#timestamps
// INDICO - 7 features // https://indico.io/docs
// 30 scores + 6 keywords & scores, 6 categories
	indicoSentiment: Number,
	indicoPolitical: {
		conservative: Number,
		green: Number,
		liberal: Number,
		libertarian: Number
	},
	indicoPersonality: {
		extraversion: Number,
		openness: Number,
		agreeableness: Number,
		conscientiousness: Number
	},
	indicoPersona: {	// 16 Myers Briggs personas
		architect: Number,
		logician: Number,
		commander: Number,
		debator: Number,
		advocate: Number,
		mediator: Number,
		protagonist: Number,
		campaigner: Number,
		logistician: Number,
		defender: Number,
		executive: Number,
		consul: Number,
		virtuoso: Number,
		adventurer: Number,
		entrepreneur: Number,
		entertainer: Number
	},
	// indicoRelevance: {	// Relevance API not supported (5/19/2016)
	// 	relevanceScores: Number,	// what about arrays in here?
	// 	relevanceTerms: String
	// },
	indicoEmotion: {
		anger: Number,
		joy: Number,
		fear: Number,
		sadness: Number,
		surprise: Number
	},
	indicoKeywords: {
		keyword1: String,
		keyword1Score: Number,
		keyword2: String,
		keyword2Score: Number,
		keyword3: String,
		keyword3Score: Number,
		keyword4: String,
		keyword4Score: Number,
		keyword5: String,
		keyword5Score: Number,
		keyword6: String,
		keyword6Score: Number
	},
// IBM ALCHEMY - 6 features // http://www.ibm.com/watson/developercloud/alchemy-language/api/v1/
// 6 scores, 15 text/label + scores, 5 categories, text
	alchemyTextExtraction: String,
	alchemySentiment: Number,
	alchemyEmotion: {
		anger: Number,
		disgust: Number,
		fear: Number,
		joy: Number,
		sadness: Number
	},
	alchemyEntities: {
		entity1: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number, type: String },
		entity2: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number, type: String },
		entity3: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number, type: String },
		entity4: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number, type: String },
		entity5: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number, type: String }
	},
	alchemyKeywords: {
		keyword1: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number },
		keyword2: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number },
		keyword3: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number },
		keyword4: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number },
		keyword5: { text: String, relevance: Number, sentimentType: String, sentimentScore: Number }
	},
	alchemyTaxonomy: {
		// label1: String, score1: Number, confident1: Boolean
		taxonomy1: { label: String, score: Number, confident: Boolean },
		taxonomy2: { label: String, score: Number, confident: Boolean },
		taxonomy3: { label: String, score: Number, confident: Boolean },
		taxonomy4: { label: String, score: Number, confident: Boolean },
		taxonomy5: { label: String, score: Number, confident: Boolean }
	},
// IBM TONE ANALYZER // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer/api/v3/#post-tone
// 13 scores, 3 categories
	taEmotionTone: {
		anger: Number,
		disgust: Number,
		fear: Number,
		joy: Number,
		sadness: Number
	},
	taLanguageTone: {
		analytical: Number,
		confident: Number,
		tentative: Number
	},
	taSocialTone: {
		openness: Number,
		conscientiousness: Number,
		extraversion: Number,
		agreeableness: Number,
		neuroticism: Number
	},
// IBM PERSONALITY INSIGHTS // http://www.ibm.com/watson/developercloud/personality-insights/api/v2/?node#authentication
// 52 scores, 7 categories, 1 word count
	piWordCount: Number,
	// BIG 5
	piOpenness: {
		openness: Number,
		adventurousness: Number,
		artisticInterests: Number,
		emotionality: Number,
		imagination: Number,
		intellect: Number,
		authorityChallenging: Number // liberalism
	},
	piConscientiousness: {
		conscientiousness: Number,
		achievementStriving: Number,
		cautiousness: Number,
		dutifulness: Number,
		orderliness: Number,
		selfDiscipline: Number,
		selfEfficacy: Number
	},
	piExtraversion: {
		extraversion: Number,
		activityLevel: Number,
		assertiveness: Number,
		cheerfulness: Number,
		excitementSeeking: Number,
		outgoing: Number, // friendliness
		gregariousness: Number
	},
	piAgreeableness: {
		agreeableness: Number,
		altruism: Number,
		cooperation: Number,
		modesty: Number,
		uncompromising: Number, // morality
		sympathy: Number,
		trust: Number
	},
	piEmotionalRange: {
		emotionalRange: Number, // neuroticism
		fiery: Number, // anger
		proneToWorry: Number, // anxiety
		melancholy: Number, // depression
		immoderation: Number,
		selfConsciousness: Number,
		susceptibleToStress: Number // vulnerability
	},
	// NEEDS
	piNeeds: {
		challenge: Number,
		closeness: Number,
		curiosity: Number,
		excitement: Number,
		harmony: Number,
		ideal: Number,
		liberty: Number,
		love: Number,
		practicality: Number,
		selfExpression: Number,
		stability: Number,
		structure: Number
	},
	// VALUES
	piValues: {
		conservation: Number,
		opennessToChange: Number,
		hedonism: Number,
		selfEnhancement: Number,
		selfTranscendence: Number
	}

});


module.exports = mongoose.model('Analysis', Analysis);
