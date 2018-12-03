angular.module("loginModule").controller("preferitiController", ["$scope", "loginService", "listeService", "$location",
	function($scope, loginService, listeService, $location) {

	
	$scope.goToPage = function(conf){
		$scope.setTempConfigurazione(conf);
		$location.url('/configura');
	}

	$scope.addToCart = function(configurazione){
		configurazione.carrello = true;

		listeService.putConfigurazione(configurazione).then(
				function (res){
					if(res.errorMessage != undefined){
						alert('si è verificato un problema nell inserimento della configurazione nel carrello');
						console.log(res.errorMessage);
					} else {
						console.log(res);

						$scope.ricaricaListe($scope.getUserEmail(), '/carrello');
						alert("configurazione correttamente aggiunta al carrello")
						//ricarica in background le liste
					}
				},
				function (reason){
					console.log(reason);
					alert ("errore aggiunta preferiti");
				}
			);
		}


	$scope.eliminaConfigurazione  = function (codice)  {
		console.log("sto per eliminare la configurazione con codice " + codice);
		listeService.deleteConfigurazione(codice).then(function(data){
				if(data.errorMessage != null && data.errorMessage != undefined){
					alert("si è verificato un errore nella cancellazione della configurazione");
					console.log("errorMessage");
				} else {
					alert ("configurazione correttamente eliminata");
					//ricarico le liste
					$scope.ricaricaListe($scope.getUserEmail(), "");
				}
	
			},
			function (reason){
				console.log(reason);
				alert ("errore cancellazione");
			}
		)
	}
}]);
