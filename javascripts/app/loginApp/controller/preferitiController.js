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

	$scope.eliminaCar  = function (ord)  {
		console.log(ord);
		listeService.deleteConfigurazione(ord).then(function(data){
				console.log(data);
				alert ("elemento eliminato");
				loginService.getUserAttributes().then(
						function (attList){
							console.log(attList);
							attList.forEach(function (a){
								if (a["Name"] == "email" ){
									codice = a["Value"];
									console.log(codice);
									listeService.getCarrelloUtente(codice).then(function(data){
										$scope.listaPreferiti = data.data.configurazioni;
										console.log(data);
										console.log ($scope.listaPreferiti );
										
									})
								}
							})
						},
						function (reason){
							console.log(reason)
						}
					)	
			},
			function (reason){
				console.log(reason);
				alert ("errore cancellazione");
			}
		)
	}
}]);
