'use strict';

var customersApp = angular.module('customersApp', ['ngRoute', 'ngResource']);

customersApp.config([
  '$routeProvider', '$locationProvider',
  function($routeProvide, $locationProvider){
	$routeProvide
		.when('/',{
		  templateUrl:'./template/index.html',
		  controller:'CustomerListCtrl'
		})
		.when('/about',{
		  templateUrl:'./template/about.html',
		  controller:'AboutCtrl'
		})
		.when('/about/:id',{
		  templateUrl:'./template/about-customer.html',
		  controller:'AboutCustomerCtrl'
		})
		.when('/orders', {
		  templateUrl:'./template/orders.html',
		  controller:'OrdersCtrl'
		})
		.when('/orders/:id', {
		  templateUrl:'./template/orders-customer.html',
		  controller:'OrdersCustomerCtrl'
		})
		.otherwise({
		  redirectTo: '/'
		});
  }
]);

customersApp.controller('HeaderController', [
	'$scope', '$location',
	function($scope, $location){
		$scope.isActive = function (viewLocation) {
	        return ($location.path() === '/' && viewLocation === '/') ||
	        (viewLocation !== '/' && $location.path().indexOf(viewLocation) > -1);
	    };
	}
]);

customersApp.controller('CustomerListCtrl', [
	'$scope','$http',
	function($scope, $http) {
		$http.get('./customers.json').success(function(data) {
			$scope.customers = data;
		});

		$scope.changeMode = 'cards-view';
	}
]);

customersApp.controller('AboutCtrl', [
	'$scope','$http', '$location',
	function($scope, $http, $location) {

	}
]);

customersApp.controller('OrdersCtrl', [
	'$scope','$http', '$location',
	function($scope, $http, $location) {

	}
]);

customersApp.controller('AboutCustomerCtrl', [
	'$scope','$http', '$filter', '$routeParams',
	function($scope, $http, $filter, $routeParams) {
		$http.get('./customers.json').success(function(data) {
			$scope.customer = $filter('filter')(data, {'_id' : $routeParams.id})[0];
		});

	}
]);

customersApp.controller('OrdersCustomerCtrl', [
	'$scope','$http', '$filter', '$routeParams',
	function($scope, $http, $filter, $routeParams) {
		$http.get('./customers.json').success(function(data) {
			$scope.customer = $filter('filter')(data, {'_id' : $routeParams.id})[0];
		});

	}
]);
