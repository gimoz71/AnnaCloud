var app = angular.module('applicationModule', ['loginModule', 'configuratorModule', 'ngAnimate', 'ui.swiper', 'ngRoute'])
/*.directive('homeContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'homeContent.html'
	 };
}).directive('configuraContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'configuraContent.html'
	 };
}).directive('visioneContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'visioneContent.html'
	 };
}).directive('esperienzaContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'esperienzaContent.html'
	 };
}).directive('contattiContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'contattiContent.html'
	 };
}).directive('storesContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'storesContent.html'
	 };
}).directive('accessoContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'accesso.html'
	 };
}).directive('preferitiContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'profilo-borse.html'
	 };
}).directive('ordiniContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'ordini-borse.html'
	 };
}).directive('carrelloContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'carrelloContent.html'
	 };
}).directive('profiloContent', function () {
	return {
		restrict: 'E',
		templateUrl: 'profiloContent.html'
	};
}).directive('paypalContent', function(){
	 return {
		 restrict: 'E',
		 scope: {
			 customerInfo: '=info'
		    },
		 templateUrl: 'paypalComponent.html'
	 };
}).directive('checkoutContent', function () {
	return {
		restrict: 'E',
		scope: {
			customerInfo: '=info'
		},
		templateUrl: 'checkoutContent.html'
	};
});*/

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	//$locationProvider.hashPrefix('');
	$routeProvider.
	when('/', {
		templateUrl: 'homeContent.html'
	}).
	when('/accedi', {
		templateUrl: 'accessoContent.html'
	}).
	when('/ordini', {
		templateUrl: 'ordiniContent.html'
	}).
	when('/profilo', {
		templateUrl: 'profiloContent.html'
	}).
	when('/preferiti', {
		templateUrl: 'preferitiContent.html'
	}).
	when('/carrello', {
		templateUrl: 'carrelloContent.html'
	}).
	when('/checkout', {
		templateUrl: 'checkoutContent.html'
	}).
	/*when('/come-funziona', {
		templateUrl: 'comefunzionaContent.html'
	}).
	when('/shop', {
		templateUrl: 'shopContent.html'
	}).*/
	when('/collezione', {
		templateUrl: 'collezioneContent.html'
	}).
	when('/visione', {
		templateUrl: 'visioneContent.html'
	}).
	when('/esperienza',  {
		templateUrl: 'esperienzaContent.html'
	}).
	when('/chi-siamo',  {
		templateUrl: 'contattiContent.html'
	}).
	when('/contatti',  {
		templateUrl: 'contattiContent.html'
	}).
	when('/configura',  {
		templateUrl: 'configuraContent.html',
		controller: 'unadunaConfiguratorController2'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);