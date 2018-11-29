 angular.module("loginModule").controller("cartController", ["$scope", "loginService", "listeService",
		function($scope, loginService, listeService) {
			
		 paypal.Button.render({
			    // Configure environment
			    env: 'sandbox',
			    client: {
			      sandbox: 'AT1iiIpFRZhumzfgjO0TKil1W1MsCHFXzqhcbB8o7cCqfdujMn0o1ie1b1pwHgzqBavu7pp0WQoeq4X4',
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
			            total: $scope.calcolaPrezzoOrdine($scope.getOrdineInCorso()) + $scope.getCostoSpedizione(),
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
					        	
					        	$scope.getOrdineInCorso().pagato = 1,
					        	$scope.getOrdineInCorso().stato = 1,
					        	
					        	listeService.putOrdine($scope.getOrdineInCorso()).then(
				        			function(data){
												if(data.errorMessage != null && data.errorMessage != ""){
													console.log("ordine aggiornato");
												} else {
													console.log("problema nell'aggiornamento dell'ordine");
												}
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
