angular.module('textAnalyzer')
	.service('mainService', function($http){

// INDICO //
		this.get_indc_multiText = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getIndicoMultiText',
				data: {text: textToAnalyze}
			}).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};

		this.get_indc_multiUrl = function(urlToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getIndicoMultiText',
				data: {url: urlToAnalyze}
			}).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};

		this.get_indc_personaText = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getIndicoPersonaText',
				data: {text: textToAnalyze}
			}).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};

// ALCHEMY //
		this.get_al_combinedText = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getAlchemyCombined',
				data: {text: textToAnalyze}
			}).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};

		this.get_al_combinedUrl = function(urlToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getAlchemyCombined',
				data: {url: urlToAnalyze}
			}).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};

// TONE ANALYZER //
		this.get_toneAnalyzer = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getToneAnalyzer',
				data: {text: textToAnalyze}
			}).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};

// PERSONALITY INSIGHTS //
		this.get_personality_insights = function(textToAnalyze){
			return $http({
				method: 'POST',
				url: '/api/getPersonalityInsights',
				data: {text: textToAnalyze}
			}).then(function(response){
				console.log(response.data);
				return response.data;
			});
		};

// SAVE DATA //
		this.create_saved_analysis = function(){
			return $http({
				method: 'POST',
				url: '/api/createSavedAnalysis',
				data: {
					
				}
			});
		};

        this.createNewPractice = function (data) {
            return $http({
                method: 'POST',
                url: "/create/practice",
                data: {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    mailingAddress: data.mailingAddress
                }
            }).then(function (response) {
                console.log("service", response);
                return response.data;
            });
        };

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
				url: '/logout'
			}).then(function(response){
				return response;
			});
		};

	});
