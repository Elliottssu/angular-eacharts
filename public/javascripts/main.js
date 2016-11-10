angular.module('myApp', ['ui.router'])
	.config(function ($locationProvider,$urlRouterProvider,$stateProvider) {
	  $locationProvider
	  .html5Mode({
	    enabled: true, 
	    requireBase: false
	  });

	  $urlRouterProvider
	  .when('/','/overview')
	  .otherwise('/overview')

	  $stateProvider
	  .state('overview',{
	    url:'/overview',
	    templateUrl:'views/overview.html',
	    controller:'viewCtrl'
	  })
	})