angular.module("applicationModule").controller("componentsController", ["$scope", "loginService", "listeService", "$location", "jwtHelper",  function($scope, loginService, listeService, $location, jwtHelper) {

	$scope.user = null;
	$scope.costoSpedizione = 19.50;

	$scope.orderBaseMessage = ""

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

	$scope.setNextPath = function(nextPath){
		$scope.nextPath = nextPath;
	}
	$scope.getNextPath = function(){
		return $scope.nextPath;
	}

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
		if($scope.carrello == undefined){
			return 0;
		}
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
		if($scope.preferiti == undefined){
			return 0;
		}
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
		$scope.initPreferiti([]);
		$scope.initCarrello([]);
		$scope.setTempConfigurazione(null);
		loginService.logOut();
		$location.url('/home');
	}
	
	$scope.getCostoSpedizione = function(){
		return $scope.costoSpedizione;
	}

	$scope.getColoreConf = function(configurazione){
		var colore = "black";
		var numeroEntita = configurazione.elencoEntita.length;
		for(var i = 0; i < numeroEntita; i++){
			var entita = configurazione.elencoEntita[i];
			if(entita.categoria == "colore"){
				colore = entita.colore;
			}
		}
		return colore;
	}

	$scope.getInizialiConf = function(configurazione){
		var iniziali = "";
		var numeroEntita = configurazione.elencoEntita.length;
		for(var i = 0; i < numeroEntita; i++){
			var entita = configurazione.elencoEntita[i];
			if(entita.categoria == "iniziali"){
				iniziali += entita.nome;
			}
		}
		return iniziali;
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
			var configurazione = configurazioni[i];
			totale += $scope.calcolaPrezzo(configurazione);
		}
		return totale;
	}

	$scope.ricaricaListe = function(email, page){
		listeService.getConfigurazioniUtente(email).then(function(data){
			$scope.preferiti = data.data.configurazioni;
			
			var tempCarrello = [];
			for(var i = 0; i < $scope.preferiti.length; i++){
				if($scope.preferiti[i].carrello){
					tempCarrello.push($scope.preferiti[i]);
				}
			}
			$scope.carrello = tempCarrello;
			if(page != null && page != undefined && page != ""){
				$scope.changePath(page);
			}
		});
	}

	$scope.getUserEmail = function(){
		var user = $scope.user;
		var idToken = jwtHelper.decodeToken(user.signInUserSession.idToken.jwtToken);
		var email = idToken.email;
		return email;
	}

	$scope.loginAndMove = function(username, password, nextPath){
		loginService.login(email, password).then(
			function(data){
				console.log(data);
				loginService.getCurrentUser().then (function (data){
					console.log(data);
					var user = data;
					var idToken = jwtHelper.decodeToken(data.signInUserSession.idToken.jwtToken);
					var tokenEmail = idToken.email;
					$scope.ricaricaListe(tokenEmail);
					user.eMail = tokenEmail;
					$scope.setUser(data);
					if ($scope.remember.value == true){
						loginService.setDeviceStatusRemembered().then(
								function(greeting) {
									console.log('Success: remembered ' + greeting);
								}, function(reason) {
									console.log('Failed: ' + reason);
								});
					}else{
						loginService.setDeviceStatusNotRemembered().then(
								function(greeting) {
									console.log('Success: not remembered ' + greeting);
								}, function(reason) {
									console.log('Failed: ' + reason);
								});
					}

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

				});

				if(nextPath == null || nextPath == ""){
					$scope.changePath('/home');
				} else {
					$scope.changePath(nextPath);
				}
			}, function(reason) {
				  console.log( reason);
				  alert (reason.message);
			}
		);
	}

	$scope.completaOperazioniOrdneAcquistato = function(){
		//aggiorno l'ordine su DB e poi lo elimino da locale
		$scope.ordineInCorso.pagato = true;
		$scope.ordineInCorso.stato = 1;

		listeService.putOrdine($scope.ordineInCorso).then(
			function (res){
				console.log(res);
				if(res.errorMessage != null && res.errorMessage != ""){
					//ho un errore
					console.log(res.errorMessage);
					alert("C'è stato un problema nel salvataggio dell'ordine");
				} else {
					alert("ordine correttamente aggiornato");
					//preparo l'invio delle mail
					$scope.ordineInCorso.codice = res.data.codiceOrdineRisposta;
					var mailMessage = $scope.generateEmailMessage($scope.ordineInCorso);
					listeService.sendEmail(mailMessage).then(
						function(res2){
							if(res2.errorMessage != null && res2.errorMessage != ""){
								console.log(res2.errorMessage);
								alert("C'è stato un problema nell'invio della mail di riepilogo, contattare l'ammistratore");
							} else {
								$scope.ordineInCorso = null;
								$scope.changePath('/preferiti');
							}
						}
					);
				}
			},
			function (reason){
				console.log(reason);
				alert ("errore salvataggio ordine");
			}
		);
	}

	$scope.generateEmailMessage = function(){
		var message = {};

		message.toEmailAddress = [$scope.getUserEmail()];
		message.ccEmailAddress = [];
		message.emailSubject = "Annacloud - Riepilogo Ordine " + $scope.ordineInCorso.codice;
		message.emailMessage = "messaggio di prova inviato dopo la chiusura di un ordine";

		return message;
	}

	loginService.getCurrentUser().then(function(data){
		$scope.setUser(data);
		if(data != null){
			if(data.signInUserSession != null){
				var idToken = jwtHelper.decodeToken(data.signInUserSession.idToken.jwtToken);
				var email = idToken.email;
				$scope.ricaricaListe(email);
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

	$scope.hideHeader = function(){
		return $location.path().indexOf("configura") != -1;
	}
	
	$scope.wowInit = function(config){
		if(config){
			new WOW(config).init();
		} else {
			new WOW().init();
		}
	};

	$scope.changePath = function(path){
		$location.url(path);
		$scope.$apply();
	}
}]);
