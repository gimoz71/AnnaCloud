angular.module("loginModule").controller("preferitiController", ["$scope", "loginService", "listeService",
	function($scope, loginService, listeService) {

	$scope.listaPreferiti = [];
	loginService.getUserAttributes().then(
		function (attList){
			console.log(attList);
			attList.forEach(function (a){
				if (a["Name"] == "email" ){
					codice = a["Value"];
					console.log(codice);
					listeService.getConfigurazioniUtente(codice).then(function(data){
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
	
	$scope.addCarrello = function (conf){
		conf.carrello = true;
		conf.codice = "";
		listeService.putConfigurazione(conf).then(
				function (res){
					console.log(res);
					$scope.setCarrello();
				},
				function (reason){
					console.log(reason);
					alert ("errore aggiunta carrello");
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
//		getConfigurazioniService.response("john@bea.com").then(function (data) {
//			$scope.listaPreferiti = data.data.configurazioni;
//			console.log(data);
//			console.log($scope.listaPreferiti);
//
//		})
}]);
