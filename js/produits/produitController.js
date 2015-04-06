/**
 * Created by MhD on 26/02/15.
 */

produitModule.controller('ProduitCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'produitService', function($scope, $rootScope, $location, $routeParams, produitService) {

    if($rootScope.token === undefined)
        $location.path("/login");
    else {
        produitService.getlist().success(function (data) {
            if (data != undefined) {
                $scope.products = data;
                //for( produitIndex in $scope.products)
                //    $scope.products[produitIndex].quantityOrdered = ""
            }
        });
    }


    $scope.commander= function(){

        for(produitIndex in $scope.products){
            produit = $scope.products[produitIndex];
            var commandePromise = produitService.commander(produit);

            commandePromise.success(function(data, status){
                toastr.success("Commande réussie !", "Produit N°"+produit.reference+" commandé en "+produit.quantityOrdered+" exemplaires");
            });

        }
    }
}]);