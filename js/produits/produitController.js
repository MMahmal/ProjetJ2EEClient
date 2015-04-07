/**
 * Created by MhD on 26/02/15.
 */

produitModule.controller('ProduitCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'produitService', function($scope, $rootScope, $location, $routeParams, produitService) {

    function displayProducts(){
        produitService.getlist().success(function (data) {
            if (data != undefined) {
                $scope.products = data;
            }
        });
    }

    if($rootScope.token === undefined)
        $location.path("/login");
    else {
        displayProducts();
    }

    $scope.commander= function() {

        for (var produitIndex in $scope.products) {
            var produit = $scope.products[produitIndex];

            if(produit.quantityOrdered !== undefined && produit.quantityOrdered > 0) {
                var commandePromise = produitService.commander(produit);

                commandePromise.success(function (data, status) {
                    toastr.success("Commande réussie !", "Produit N°" + produit.reference + " commandé");
                    displayProducts();
                }).
                    error(function (data, status) {
                        if (status === 403) {
                            delete $rootScope.token;
                            $location.path("/login")
                        }else if(status === 416)
                            toastr.error("Erreur lors de la commande", "Quantité commandée invalide");
                        else if(status === 406)
                            toastr.error("Erreur lors de la commande", "Argument manquant");
                        else if(status === 404)
                            toastr.error("Erreur lors de la commande", "Référence invalide");
                    });
            }
        }
    };

    $rootScope.$watch('token', function () {

        if($rootScope.token === undefined){
            $location.path("/login");
        }
    });

}]);