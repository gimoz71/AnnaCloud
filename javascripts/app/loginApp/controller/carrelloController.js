angular.module("loginModule").controller("carrelloController", ["$scope", "listeService", "loginService",
	function($scope, listeService, loginService) {

	$scope.listaPreferiti = [];
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
			console.log(reason);
			$scope.setUser(null);
		}
	)	
	
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
