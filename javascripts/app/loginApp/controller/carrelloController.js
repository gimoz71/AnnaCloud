angular.module("loginModule").controller("carrelloController", ["$scope", "listeService", "loginService", "$location", "jwtHelper",
	function($scope, listeService, loginService, $location, jwtHelper) {
	
	$scope.rimuoviDaCarrello = function(conf){
		conf.carrello = false;
		listeService.putConfigurazione(conf).then(
			function (res){
				if(res.errorMessage != undefined && res.errorMessage != null){
					alert("Si è verificato un problema nell'eliminazione della configurazione dal carrello");
				} else {
					$scope.ricaricaListe($scope.getUserEmail(), "");
				}
			},
			function (reason){
				console.log(reason);
				alert ("errore aggiunta preferiti");
			}
		);
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
					ordine.codice = res.data.codiceOrdineRisposta;
					$scope.setOrdineInCorso(ordine);

					$location.url('/checkout');
					//qui devo svuotare il carrello
					$scope.svuotaCarrello(ordine);
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
