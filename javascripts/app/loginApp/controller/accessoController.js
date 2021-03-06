angular.module("loginModule").controller("accessoController", ["$scope", "listeService", "loginService", "salvaUtenteService", function($scope, listeService, loginService, salvaUtenteService) {
	
	
	$scope.remember = {
		       value : true,
		     };
	
	$scope.login = function (email, password){

		loginService.login(email, password).then(
			function(data){
				console.log(data);
					loginService.getCurrentUser().then (function (data){
						console.log(data);
						var user = data;
						user.eMail = email;
						$scope.setUser(data);
						$scope.ricaricaListe(user.eMail, "");
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

						if($scope.getNextPath() != ""){
							var tempNextPath = $scope.getNextPath();
							$scope.setNextPath("");
							if($scope.tempConfigurazione != null && tempNextPath == '/preferiti'){
								var localTempConfigurazione = $scope.getTempConfigurazione()
								$scope.tempConfigurazione = null;
								var confUser = {};
								confUser.email = user.eMail;
								localTempConfigurazione.utente = confUser;

								//salvo la configurazione
								listeService.putConfigurazione(localTempConfigurazione).then(
									function (res){
										if(res.errorMessage != null || res.errorMessage != undefined){
											alert('si è verificato un problema nel salvataggio della configurazione');
											console.log(res.errorMessage);
										} else {
											console.log("Configurazione salvata correttamente");
											//ricarico le liste
											$scope.ricaricaListe(confUser.email, tempNextPath);
										}
									},
									function (reason){
										console.log(reason);
										alert ("errore aggiunta preferiti");
									}
								);
								
							} else {
								$scope.changePath(tempNextPath);
							}
						} else {
							$scope.changePath('/home');
						}
					})
			}, function(reason) {
				  console.log( reason);
				  alert (reason.message);
			}
		);
	}
	
	$scope.signUp = function (email, nome, cognome, password){
		loginService.signUp(email, nome, cognome, password).then(
				function(data){
					console.log(data);
					
					utente = {};
					utente.email = email;
					utente.username = nome + "-" +cognome;
					utente.nome = nome;
					utente.cognome = cognome;

					//alert di avviso
					alert("Registrazione avvenuta con successo, adesso puoi effettuare il login con le credenziali inserite");

					//mail di avviso avvenuta registrazione
					var message = {};

					message.toEmailAddress = [email];
					message.ccEmailAddress = [];
					message.emailSubject = "Conferma registrazione";
					message.emailMessage = "Congratulazioni, ti sei registrato su annacloud.it con successo.";

					listeService.sendEmail(message).then(
						function(res2){
							if(res2.errorMessage != null && res2.errorMessage != ""){
								console.log(res2.errorMessage);
								alert("C'è stato un problema nell'invio della mail di conferma registrazione");
							} 
						}
					);
				},
				function (reason){
					console.log(reason);
				}
		);
	}
	
	
}]);
