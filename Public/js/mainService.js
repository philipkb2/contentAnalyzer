angular.module('textAnalyzer')
	.service('mainService', function($http){

// INDICO //
		this.get_indc_multiText = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getIndicoMultiText',
				data: {text: textToAnalyze},
			}).then(function(response){
				return response.data;
			});
		};

		this.get_indc_personaText = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getIndicoPersonaText',
				data: {text: textToAnalyze},
			}).then(function(response){
				return response;
			});
		};

// ALCHEMY //
		this.get_al_combined = function(dataToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getAlchemyCombined',
				data: {urlOrText: dataToAnalyze}
			}).then(function(response){
				return response.data;
			});
		};

		this.get_al_sentiment = function(dataToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getAlchemySentiment',
				data: {urlOrText: dataToAnalyze}
			}).then(function(response){
				return response.data;
			});
		};

		this.get_al_emotions = function(dataToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getAlchemyEmotions',
				data: {urlOrText: dataToAnalyze}
			}).then(function(response){
				return response.data.docEmotions;
			});
		};

// TONE ANALYZER //
		this.get_toneAnalyzer = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getToneAnalyzer',
				data: {text: textToAnalyze}
			}).then(function(response){
				return response.data;
			});
		};

// PERSONALITY INSIGHTS //
		this.get_personality_insights = function()

// LOGIN //
		this.login = function(user){
			return $http({
				method: 'POST',
				url: '/login',
				data: user
			}).then(function(response){
				return response;
			});
		};

		this.getUser = function(){
			return $http({
				method: 'GET',
				url: '/me'
			}).then(function(response){
				return response;
			});
		};

		this.register = function(user){
			return $http({
				method: 'POST',
				url: '/users',
				data: user
			}).then(function(response){
				return response;
			});
		};

		this.logout = function(){
			return $http({
				method: 'GET',
				url: '/logout',
			}).then(function(response){
				return response;
			});
		};

	});
