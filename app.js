(function () {
    'use strict';
    var app = angular.module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E']);
    //INTERCEPTOR

    angular.module('app').factory('interceptor', function($q, $localStorage){
        return{
            request:function(request){
                console.log('request is done');
                request.params = request.params || {};
                
                if ($localStorage.currentUser) {
                    console.log('TOKEN', $localStorage.currentUser.token);
                   request.params.access_token = $localStorage.currentUser.token;                        
                   request.headers.Authorization = 'Bearer ' + $localStorage.currentUser.token;
                }
                console.log(request);
                 return request;
            },
            response:function(response){
                console.log('RESPONSE', response)
                console.log('response is done');
                return response;
            },
            responseError: function(rejection){
                console.log('Failed with', rejection.status, 'status');
                return $q.reject(rejection);
            }
        }
    });
    
    var config = function($httpProvider, $stateProvider, $urlRouterProvider) {

        $httpProvider.interceptors.push('interceptor');
        
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            });
    }
    config.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];
    angular.module('app').config(config);

    var run = function($rootScope, $http, $location, $localStorage) {
        console.log('run');
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
    run.$inject = ['$rootScope', '$http', '$location', '$localStorage'];
    angular.module('app').run(run);	

  
})();