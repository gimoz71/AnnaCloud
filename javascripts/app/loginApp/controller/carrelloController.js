angular.module("loginModule").controller("carrelloController", ["$scope", "listeService", "loginService", "$location", "jwtHelper",
	function($scope, listeService, loginService, $location, jwtHelper) {
	
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

	$scope.getCheckout = function(){

		//preparare l'ordine e metterlo in sessione
		var ordine = {};

		ordine.costo = $scope.getTotalAmount();
		ordine.costiSpedizione = $scope.getCostoSpedizione();
		ordine.stato = 0;
		ordine.pagato = false;

		utenteOrdine = {};
		utenteOrdine.email = $scope.getUserEmail();
		ordine.utente = utenteOrdine;

		ordine.configurazioni = $scope.getCarrello();

		//salvo l'ordine. Se va a buon fine svuoto il carrello
		$scope.salvaOrdine(ordine);

		$location.url('/checkout');
	}

	$scope.getUserEmail = function(){

		var userInSession = $scope.getUser();
		var user = {};
		if(userInSession != null){
			var idToken = jwtHelper.decodeToken(userInSession.signInUserSession.idToken.jwtToken);
			return idToken.email;
		}
		return "";
	}

	$scope.salvaOrdine = function(ordine){
		listeService.putOrdine(ordine).then(
			function (res){
				console.log(res);
				if(res.errorMessage != null && res.errorMessage != ""){
					//ho un errore
					console.log(res.errorMessage);
					alert("C'è stato un problema nel salvataggio dell'ordine, riprovare piu' tardi");
				} else {
					console.log("Ordine salvato, procedo a svuotare il carrello");
					$scope.setOrdineInCorso(ordine);
					//qui devo svuotare il carrello
					$scope.svuotaCarrello(ordine);

					$location.url('/checkout');
				}
			},
			function (reason){
				console.log(reason);
				alert ("errore salvataggio ordine");
			}
		);
	}

	$scope.svuotaCarrello = function(ordine){

		console.log("sto per svuotare il carrello");
		//ottenfo la lista dei codici delle configurazioni
		var listaCodici = $scope.getListaCodiciConfigurazioni(ordine);
		listeService.svuotaCarrello(listaCodici).then(
			function (res){
				console.log(res);

				console.log("carrello svuotato, ricarico le liste");
				listeService.getConfigurazioniUtente($scope.getUserEmail()).then(function(data){
					$scope.preferiti = data.data.configurazioni;
					
					for(var i = 0; i < $scope.preferiti.length; i++){
						if($scope.preferiti[i].carrello){
							$scope.carrello.push($scope.preferiti[i]);
						}
					}

					console.log("liste ricaricate");
				});
			},
			function (reason){
				console.log(reason);
				alert ("errore salvataggio ordine");
			}
		);
	}

	$scope.getListaCodiciConfigurazioni = function(ordine){

		var codici = [];

		var configurazioni = ordine.configurazioni;
		for(var i = 0; i < configurazioni.length; i++){
			var configurazione = configurazioni[i];
			if(configurazione.codice != null){
				codici.push(configurazione.codice);
			}
		}

		return codici;
	}

	$scope.getTotalAmount = function(){
		var carrello = $scope.getCarrello()
		var totale = 0;
		for(var i = 0; i < carrello.length; i++){
			var configurazione = carrello[i];
			totale += $scope.calcolaPrezzo(configurazione);
		}
		return totale;
	}
}]);
