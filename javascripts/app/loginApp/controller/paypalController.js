 angular.module("loginModule").controller("cartController", ["$scope",
		function($scope) {

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
			            total: 1,
			            currency: 'EUR'
			          }
			        }]
			      });
			    },
			    // Execute the payment
			    onAuthorize: function(data, actions) {
			      return actions.payment.execute().then(function() {
			        // Show a confirmation message to the buyer
			        window.alert("grazie per l'acquisto !");
			      });
			    }
			  }, '#paypal-button' );

	 
	 
	}]);
