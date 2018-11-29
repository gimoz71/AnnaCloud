angular.module("applicationModule").controller("componentsController", ["$scope", "loginService", "listeService", "$location", "jwtHelper",  function($scope, loginService, listeService, $location, jwtHelper) {
	
	$scope.isHome = true;
	$scope.isConfigurator = false;
	$scope.isVisione = false;
	$scope.isEsperienza = false;
	$scope.isContatti = false;
	$scope.isStores = false;
	$scope.isAccesso = false;
	$scope.isPreferiti = false;
	$scope.isOrdini = false;
	$scope.isProfilo = false;
	$scope.isCarrello = false;
	$scope.isCheckout = false;
	
	$scope.user = null;

	$scope.costoSpedizione = 19.50;

	$scope.carrello = [];
	$scope.preferiti = [];
	$scope.ordineInCorso = null;

	$scope.tempConfigurazione = null;
	
	$scope.email = "";
	$scope.tel = "";
	$scope.nome = "";
	$scope.cognome = "";
	$scope.indSpe = "";
	$scope.indSpe2 = "";

	$scope.nextPath = "";

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setOrdineInCorso = function(ordineInCorso){
		$scope.ordineInCorso = ordineInCorso;
	}

	$scope.getOrdineInCorso = function(){
		return $scope.ordineInCorso;
	}

	$scope.setEmail = function(email){
		$scope.email = email;
	}
	$scope.getEmail = function(){
		return $scope.email;
	}

	$scope.setTel = function(tel){
		$scope.tel = tel;
	}
	$scope.getTel = function(){
		return $scope.tel;
	}

	$scope.setNome = function(nome){
		$scope.nome = nome;
	}
	$scope.getNome = function(){
		return $scope.nome;
	}

	$scope.setCognome = function(cognome){
		$scope.cognome = tel;
	}
	$scope.getCognome = function(){
		return $scope.cognome;
	}

	$scope.setIndSpe = function(indSpe){
		$scope.indSpe = indSpe;
	}
	$scope.getIndSpe = function(){
		return $scope.indSpe;
	}

	$scope.setIndSpe2 = function(indSpe2){
		$scope.indSpe2 = indSpe2;
	}
	$scope.getIndSpe2 = function(){
		return $scope.indSpe2;
	}

	$scope.setTempConfigurazione = function(configurazione){
		$scope.tempConfigurazione = configurazione;
	}
	$scope.getTempConfigurazione = function(){
		return $scope.tempConfigurazione;
	}

	$scope.getCarrello = function(){
		return $scope.carrello;
	}

	$scope.initCarrello = function(carrello){
		$scope.carrello = carrello;
	}

	$scope.addToCarrello = function(oggetto){
		$scope.carrello.push(oggetto);
	}

	$scope.getCarrelloSize = function(){
		return $scope.carrello.length;
	}

	$scope.getPreferiti = function(){
		return $scope.preferiti;
	}

	$scope.initPreferiti = function(preferiti){
		$scope.preferiti = preferiti;
	}

	$scope.addToPreferiti = function(oggetto){
		//devo controllare se c'è già tra i preferiti (mentre nel carrello comunque aggiungo)
		$scope.preferiti.push(oggetto);
	}

	$scope.getPreferitiSize = function(){
		return $scope.preferiti.length;
	}

	$scope.setUser = function(t){
		$scope.user = t;
	}
	
	$scope.getUser = function(){
		return $scope.user;
	}
	
	$scope.logOut = function (){
		$scope.setUser(null);
		loginService.logOut();
		$scope.setHome();
	}
	
	$scope.getCostoSpedizione = function(){
		return $scope.costoSpedizione;
	}

	$scope.calcolaPrezzo = function(configurazione){
		var prezzoCalcolato = 0;
		var numeroEntita = configurazione.elencoEntita.length;
		for(var i = 0; i < numeroEntita; i++){
			var entita = configurazione.elencoEntita[i];
			prezzoCalcolato += entita.prezzo;
		}
		return prezzoCalcolato
	}

	$scope.calcolaPrezzoOrdine = function(ordine){
		var configurazioni = ordine.configurazioni;
		var totale = 0;
		for(var i = 0; i < configurazioni.length; i++){
			var configurazione = configurazioni.lenght;
			totale += $scope.calcolaPrezzo(configurazione);
		}
		return totale;
	}

	loginService.getCurrentUser().then(function(data){
		$scope.setUser(data);
		if(data != null){
			if(data.signInUserSession != null){
				var idToken = jwtHelper.decodeToken(data.signInUserSession.idToken.jwtToken);
				var email = idToken.email;
				listeService.getConfigurazioniUtente(email).then(function(data){
					$scope.preferiti = data.data.configurazioni;
					
					for(var i = 0; i < $scope.preferiti.length; i++){
						if($scope.preferiti[i].carrello){
							$scope.carrello.push($scope.preferiti[i]);
						}
					}
				});

				//tiro giu' anche gli attributi dell'utente
				loginService.getUserAttributes().then(
					function (attList){
						console.log(attList);
						attList.forEach(function (a){
							if (a["Name"] == "custom:email" ){
								$scope.email = a["Value"];
							}
							if (a["Name"] == "custom:telefono" ){
								$scope.tel = a["Value"];
							}
							if (a["Name"] == "name" ){
								$scope.nome = a["Value"];
							}
							if (a["Name"] == "family_name" ){
								$scope.cognome = a["Value"];
							}
							if (a["Name"] == "custom:indSpe" ){
								$scope.indSpe = a["Value"];
							}
							if (a["Name"] == "custom:indSpe2" ){
								$scope.indSpe2 = a["Value"];
							}
						})
					},
					function (reason){
						console.log(reason)
					}
				)	
			}
		}
		
		console.log ("l'utente è " + data);
		console.log(data);
	},
		function(reason){
			console.log('reason');
		}
	)
	
	$scope.nappeFisse = [ {
		datasource : "images/item.jpg",
		idaccessorio : 1,
		attivo : false
	}, {
		datasource : "images/item2.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item3.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item4.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item2.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item3.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item4.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item2.jpg",
		idaccessorio : 2,
		attivo : false
	} ];
	
	$scope.wowInit = function(config){
		if(config){
			new WOW(config).init();
		} else {
			new WOW().init();
		}
	};

	$scope.setHome = function(){
		$scope.isHome = true;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isProfilo = false;
		$scope.isCarrello = false;
		$scope.isCheckout = false;
	};

	$scope.setConfigurator = function(){
		$scope.isHome = false;
		$scope.isConfigurator = true;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};

	$scope.setVisione = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = true;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};

	$scope.setEsperienza = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = true;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};

	$scope.setContatti = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = true;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};

	$scope.setStores = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = true;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};
	
	$scope.setAccesso = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = true;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};
	
	$scope.setPreferiti = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = true;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};
	
	$scope.setOrdini = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = true;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};

	$scope.setCarrello = function () {
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = true;
		$scope.isProfilo = false;
		$scope.isCheckout = false;
	};

	$scope.setProfilo = function () {
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = true;
		$scope.isCheckout = false;
	};

	$scope.setCheckout = function () {
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
		$scope.isCarrello = false;
		$scope.isProfilo = false;
		$scope.isCheckout = true;
	};

}]);
