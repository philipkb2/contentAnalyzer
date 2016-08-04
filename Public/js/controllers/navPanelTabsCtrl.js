angular.module('textAnalyzer')
    .controller('navPanelTabs', function ($scope, $window){

        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true },
            { title:'Dynamic Title 3', content:'Dynamic content 3', disabled: true },
            { title:'Dynamic Title 4', content:'Dynamic content 4', disabled: true },
            { title:'Dynamic Title 5', content:'Dynamic content 5', disabled: true },
            { title:'Dynamic Title 6', content:'Dynamic content 6', disabled: true }
        ];

        $scope.alertMe = function(){
            setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
            });
        };

        $scope.model = {
            name: 'Tabs'
        };

    });
