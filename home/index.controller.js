(function () {
    'use strict';
    var Controller = function($scope, $http){
        var vm = this;

        
        $scope.gotoApi = function(){
        	console.log('trigger')
        	var obj = {
        		key:'value'
        	};

        	$http.get('/api/test', {params:obj}).then(function(response){
        		console.log(response.data);
        	});
        };
     
    }
    Controller.$inject = ['$scope','$http'];
    angular.module('app').controller('Home.IndexController', Controller);

})();