 angular.module("loginModule").controller("cartController", ["$scope", "loginService", "listeService",
		function($scope, loginService, listeService) {
			
		 paypal.Button.render(
			//  {
			//     // Configure environment
			//     env: 'sandbox',
			//     client: {
			//       sandbox: 'AT1iiIpFRZhumzfgjO0TKil1W1MsCHFXzqhcbB8o7cCqfdujMn0o1ie1b1pwHgzqBavu7pp0WQoeq4X4',
			//       //production: 'demo_production_client_id'
			//     },
			//     // Customize button (optional)
			//     locale: 'it_IT',
			//     style: {
			//       size: 'responsive',
			//       color: 'blue',
			//       shape: 'rect'
			//     },
			//     // Set up a payment
			//     payment: function(data, actions) {
			// 			return new paypal.Promise(function(resolve, reject) {
			// 				let params = {
			// 						'action': 'create',
			// 						'use_billing_agreement': that.recurring
			// 				};
			// 				MarketAPI.executeOrder(that.order.id, that.constants.PAYMENT_SYSTEMS.PAYPAL, params, true,
			// 				function(data) {
			// 						if (data.processed) {
			// 								that.successfullyBuy();
			// 								return;
			// 						}
			// 						that.paymentId = data.params.paymentId;
			// 						resolve(that.paymentId);

			// 				});
			// 		});
			//       // return actions.payment.create({
			//       //   transactions: [{
			//       //     amount: {
			//       //       total: $scope.calcolaPrezzoOrdine($scope.getOrdineInCorso()) + $scope.getCostoSpedizione(),
			//       //       currency: 'EUR'
			//       //     }
			//       //   }]
			//       // });
			//     },
			//     // Execute the payment
			//     onAuthorize: function(data, actions) {
			//       return actions.payment.execute().then(
			//     		  function(data) {
			// 		        // Show a confirmation message to the buyer
			// 		        window.alert("grazie per l'acquisto !");
			// 		        console.log(data);
					        	
			// 						$scope.getOrdineInCorso().pagato = 1,
			// 						$scope.getOrdineInCorso().stato = 1,
									
			// 						listeService.putOrdine($scope.getOrdineInCorso()).then(
			// 							function(data){
			// 								if(data.errorMessage != null && data.errorMessage != ""){
			// 									console.log("ordine aggiornato");
			// 								} else {
			// 									console.log("problema nell'aggiornamento dell'ordine");
			// 								}
			// 							},
			// 							function(err){
			// 								console.log(err);
			// 							}
			// 						);
			// 		      },
			// 		      function(err) {
			// 		        // Show a confirmation message to the buyer
			// 		        window.alert("errore durante il pagamento");
			// 		        console.log(err);
			// 		      }
			//       );
			//     }
			// 	}
				{
					env: 'sandbox', // sandbox | production

					// Specify the style of the button
					style: {
						layout: 'horizontal',  // horizontal | vertical
						size:   'medium',    // medium | large | responsive
						shape:  'rect',      // pill | rect
						color:  'gold'       // gold | blue | silver | white | black
					},

					// Specify allowed and disallowed funding sources
					//
					// Options:
					// - paypal.FUNDING.CARD
					// - paypal.FUNDING.CREDIT
					// - paypal.FUNDING.ELV
					funding: {
						allowed: [
							paypal.FUNDING.CARD,
							paypal.FUNDING.CREDIT
						],
						disallowed: []
					},

					// Enable Pay Now checkout flow (optional)
					commit: true,

					// PayPal Client IDs - replace with your own
					// Create a PayPal app: https://developer.paypal.com/developer/applications/create
					client: {
						sandbox: 'AT1iiIpFRZhumzfgjO0TKil1W1MsCHFXzqhcbB8o7cCqfdujMn0o1ie1b1pwHgzqBavu7pp0WQoeq4X4',
						production: ''
					},

					payment: function (data, actions) {
						return actions.payment.create({
							payment: {
								transactions: [
									{
										amount: {
											total: $scope.calcolaPrezzoOrdine($scope.getOrdineInCorso()) + $scope.getCostoSpedizione(),
											//total: '100',
											currency: 'EUR'
										}
									}
								]
							}
						});
					},

					onAuthorize: function (data, actions) {
						return actions.payment.execute()
							.then(function () {
								window.alert('Grazie per aver acquistato!');
								$scope.svuotaCarrello($scope.getOrdineInCorso());//il carrello lo svuoto solo se il pagamento è andato a buon fine
								$scope.completaOperazioniOrdneAcquistato();
							});
					}
				}
				, '#paypal-button' ); 
	}]);
