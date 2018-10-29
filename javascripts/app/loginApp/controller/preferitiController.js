angular.module("loginModule").controller("preferitiController", ["$scope", "getConfigurazioniService", "loginService", "listeService",
	function($scope, getConfigurazioniService, loginService, listeService) {

	$scope.listaPreferiti = [];
	loginService.getUserAttributes().then(
		function (attList){
			console.log(attList);
			attList.forEach(function (a){
				if (a["Name"] == "email" ){
					codice = a["Value"];
					console.log(codice);
					getConfigurazioniService.response(codice).then(function(data){
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
		loginService.getUserAttributes().then(
			function (attList){
				console.log(attList);
				attList.forEach(function (a){
					if (a["Name"] == "email" ){
						codice = a["Value"];
						console.log(codice);
						getConfigurazioniService.response(codice).then(function(data){
							let ord  = {
							  "codiceOrdine" : "",
							  "configurazione": conf,
							  "pagato": 0,
							  "stato": 0,
							  "utente": {
							    "email": codice
							  }
							}
							listeService.putOrdine(ord).then(
									function (res){
										console.log(res)
									},
									function (reason){
										console.log(reason)
									}
								);
						})
					}
				})
			},
			function (reason){
				console.log(reason)
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
