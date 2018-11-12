angular.module('visioneModule').controller('visioneController', function($scope){
	
	var visioneController = this;

	visioneController.wowInit = function (config) {
		if (config) {
			new WOW(config).init();
		} else {
			new WOW().init();
		}
	};
});