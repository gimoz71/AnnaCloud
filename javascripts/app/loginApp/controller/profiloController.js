angular.module("loginModule").controller("profiloController", ["$scope", "getConfigurazioniService", "loginService",
	function($scope, getConfigurazioniService, loginService) {

	$scope.listaPreferiti = [];
	loginService.getUserAttributes().then(
		function (attList){
			console.log(attList);
			attList.forEach(function (a){
				if (a["Name"] == "email" ){
//					codice = a["Value"];
//					console.log(codice);
//					getConfigurazioniService.response(codice).then(function(data){
//						$scope.listaPreferiti = data.data.configurazioni;
//						console.log(data);
//						console.log ($scope.listaPreferiti );
//						
//					})
				}
				if (a["Name"] == "custom:telefono" ){
					$scope.tel = a["Value"];
				}
			})
		},
		function (reason){
			console.log(reason)
		}
	)	
////		getConfigurazioniService.response("john@bea.com").then(function (data) {
////			$scope.listaPreferiti = data.data.configurazioni;
////			console.log(data);
////			console.log($scope.listaPreferiti);
////
////		})
//	
	$scope.cambiaTelefono = function(tel){
		var attributeList = [];
	    var attribute = {
	        Name : 'custom:telefono',
	        Value : $scope.tel
	    };
	    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res)
				},
				function (reason){
					console.log(reason)
				}
		)
	}
	
<<<<<<< HEAD
	$scope.cambiaNome = function(nome, cognome){
			var attributeList = [];
		    var attribute = {
		        Name : 'name',
		        Value : nome
		    };
		    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		    var attribute1 = {
			        Name : 'family name',
			        Value : cognome
			    };
		    var attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		    attributeList.push(attribute1);
			loginService.updateAttributes(attributeList).then(
					function (res){
						console.log(res)
					},
					function (reason){
						console.log(reason)
					}
			)
	}
	
	$scope.cambiaEmail = function(email, email1){
		if (email == email1){
			var attributeList = [];
		    var attribute = {
		        Name : 'email',
		        Value : email
		    };
		    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		    attributeList.push(attribute);
			loginService.updateAttributes(attributeList).then(
					function (res){
						console.log(res)
					},
					function (reason){
						console.log(reason)
					}
			)
		}else {
			alert ("le email non corrispondono");
		}	
	}
	
	$scope.cambiaPassword = function(o, n, n1){
		if (n == n1){
			loginService.changePassword(o, n).then (
				function (res){
					console.log(res);
					alert("Password cambiata con successo");
				},
				function (reason){
					console.log(reason)
					allert ("Errore nel cambio password");
				}
			)
		}else{
			alert ("Le password non corrispondono");
		}
		
	}
	
	$scope.cambiaIndirizzoSpedizione = function (ns, i1s , i26, cs, caps){
		var attributeList = [];
	    var attribute = {
	        Name : 'nomeSpe',
	        Value : ns
	    };
	    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		var attribute1 = {
		        Name : 'indirizzoSpe',
		        Value : i1s
		    };
		var attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		attributeList.push(attribute1);
		var attribute2 = {
		        Name : 'indirizzo2Spe',
		        Value : i2s
		    };
	    var attribute2 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute2);
	    attributeList.push(attribute2);
	    var attribute3 = {
		        Name : 'cittaSpe',
		        Value : cs
		    };
		var attribute3 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute3);
		attributeList.push(attribute3);
		var attribute4 = {
		        Name : 'capSpe',
		        Value : caps
		    };
		var attribute4 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute4);
	    attributeList.push(attribute4);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res)
				},
				function (reason){
					console.log(reason)
				}
		)
	}
	
	$scope.cambiaIndirizzoFatturazione = function (nomeFatturazione, indirizzo1Fatturazione , indirizzo2Fatturazione, cittaFatturazione, capFatturazione){
		var attributeList = [];
	    var attribute = {
	        Name : 'nomeFatt',
	        Value : nomeFatturazione
	    };
	    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		var attribute1 = {
		        Name : 'ind1Fatt',
		        Value : indirizzo1Fatturazione
		    };
		var attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		attributeList.push(attribute1);
		var attribute2 = {
		        Name : 'ind2Fatt',
		        Value : indirizzo2Fatturazione
		    };
	    var attribute2 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute2);
	    attributeList.push(attribute2);
	    var attribute3 = {
		        Name : 'cittaFatt',
		        Value : cittaFatturazione
		    };
		var attribute3 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute3);
		attributeList.push(attribute3);
		var attribute4 = {
		        Name : 'capFatt',
		        Value : capFatturazione
		    };
		var attribute4 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute4);
	    attributeList.push(attribute4);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res)
				},
				function (reason){
					console.log(reason)
				}
		)
	}
	
	
=======
>>>>>>> branch 'master' of https://github.com/gimoz71/AnnaCloud.git
}]);
