/**
 * Created by MhD on 26/02/15.
 */

loginModule.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$routeParams', '$http', function($scope, $rootScope, $location, $routeParams, $http) {

    $scope.login = function(){

        $http({
            method: 'POST',
            url: host+'/rest/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {user: $scope.user, password: $scope.password}
        }).success(function (data) {
            toastr.success("Connexion Réussie !");
            $rootScope.token = data;
            $location.path('/');
        }).error(function(data, status){

            if(status === 403)
                toastr.error("Mauvais identifiants, veuillez réessayer");
            else toastr.error("Impossible de se connecter.");
        });
    }

}]);