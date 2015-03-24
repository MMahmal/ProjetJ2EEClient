/**
 * Created by MhD on 26/02/15.
 */
produitModule.factory('produitService', ['$http', '$rootScope', function ($http, $rootScope){
    var factory = {};
    factory.getlist = function(){
        return $http.get('http://localhost:8080/rest/produit?token='
            + $rootScope.token
        ).error(function(data){
                delete $rootScope.token;
            });
    };
    factory.commander = function(produit)
    {
        return $http.post(
            'http://localhost:8080/rest/Commande',
            {token: $rootScope.token, reference: produit.reference, quantityOrdered: produit.quantityOrdered}
        )
    };
    return factory;
}]);