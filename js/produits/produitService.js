/**
 * Created by MhD on 26/02/15.
 */
produitModule.factory('produitService', ['$http', '$rootScope', function ($http, $rootScope){
    var factory = {};
    factory.getlist = function(){
        return $http.get(host+'/rest/produit?token='
            + $rootScope.token
        ).error(function(data){
                delete $rootScope.token;
        });
    };
    factory.commander = function(produit)
    {
        return $http({
            method: 'POST',
            url: host+'/rest/Commande',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {token: $rootScope.token, reference: produit.reference, quantityOrdered: produit.quantityOrdered}
        });
    };
    return factory;
}]);