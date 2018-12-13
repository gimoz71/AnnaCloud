var app = angular.module('applicationModule', ['loginModule', 'configuratorModule', 'ngAnimate', 'ui.swiper', 'ui.bootstrap', 'ngRoute', 'angular-jwt'])
.directive('paypalContent', function(){
	return {
		restrict: 'E',
		scope: false,
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
});
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
	when('/404',  {
		templateUrl: '404.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);