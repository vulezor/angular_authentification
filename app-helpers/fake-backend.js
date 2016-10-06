(function () {
    'use strict';
    // setup fake backend for backend-less development
    var setupFakeBackend = function($httpBackend) {
        var testUser = { username: 'vulezor', password: 'vuki76', firstName: 'Test', lastName: 'User' };

        // fake authenticate api end point
        $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
            // get parameters from post request
            var params = angular.fromJson(data);

            // check user credentials and return fake jwt token if valid
            if (params.username === testUser.username && params.password === testUser.password) {
                return [200, { token: 'fake-jwt-token' }, {}];
            } else {
                return [200, {}, {}];
            }
        });

         $httpBackend.whenGET('/api/test?access_token=fake-jwt-token&key=value').respond(function (method, url, data) {
            // get parameters from post request
            console.log('URL',url);
            console.log('DATA',data);
            console.log('METHOD',method);
            var params = angular.fromJson(data);
            console.log(params);
             return [200, {buls:'sdf'}, {}];
            
        });

       //GET /api/test?access_token=fake-jwt-token&key=value

        // pass through any urls not handled above so static files are served correctly
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    }

    angular.module('app').run(setupFakeBackend);
})();