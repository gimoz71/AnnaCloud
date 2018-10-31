 angular.module("loginModule").controller("cartController", ["$scope", "loginService", "listeService",
		function($scope, loginService, listeService) {
	 console.log("ciao");
	 $scope.listaPreferiti = [];
	 $scope.email = "";
	 $scope.totale = 0;
	 loginService.getUserAttributes().then(
				function (attList){
					console.log(attList);
					attList.forEach(function (a){
						if (a["Name"] == "email" ){
							codice = a["Value"];
							$scope.email = a["Value"];
							console.log(codice);
							listeService.getCarrelloUtente(codice).then(function(data){
								$scope.listaPreferiti = data.data.configurazioni;
								console.log(data);
								console.log ($scope.listaPreferiti );
								$scope.totale = $scope.listaPreferiti.length;
							})
						}
					})
				},
				function (reason){
					console.log(reason)
				}
			)	
			
		 paypal.Button.render({
			    // Configure environment
			    env: 'sandbox',
			    client: {
			      sandbox: 'ASJHmVrCfVWZLChundm-6MVE67fBWfPRdDZrUVLeNCSwhM09EwQz-hDtIxj_ygDDGEJg0yW4vy3367o5',
			      //production: 'demo_production_client_id'
			    },
			    // Customize button (optional)
			    locale: 'it_IT',
			    style: {
			      size: 'responsive',
			      color: 'blue',
			      shape: 'rect'
			    },
			    // Set up a payment
			    payment: function(data, actions) {
			      return actions.payment.create({
			        transactions: [{
			          amount: {
			            total: $scope.totale,
			            currency: 'EUR'
			          }
			        }]
			      });
			    },
			    // Execute the payment
			    onAuthorize: function(data, actions) {
			      return actions.payment.execute().then(
			    		  function(data) {
					        // Show a confirmation message to the buyer
					        window.alert("grazie per l'acquisto !");
					        console.log(data);
					        for (let  e in listaPreferiti){
					        	let ordine = {};
					        	ordine.pagato = 1,
					        	ordine.stato = 1,
					        	ordine.configurazione = e;
					        	let u = {};
					        	u.email = $scope.email;
					        	ordine.utente = u;
					        	listeService.putOrdine(ordine).then(
				        			function(data){
				        				console.log("ordine aggiunto con successo");
				        			},
				        			function(err){
				        				console.log(err);
				        			}
					        	);
					        }
					      },
					      function(err) {
					        // Show a confirmation message to the buyer
					        window.alert("errore durante il pagamento");
					        console.log(err);
					      }
			      );
			    }
			  }, '#paypal-button' ); 
	}]);
