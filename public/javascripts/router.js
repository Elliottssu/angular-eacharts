angular.module('myApp', ['ui.router', 'echartsCtrlModule', 'echartsDireModule', 'echartsServiceModule'])
	.config(function ($locationProvider,$urlRouterProvider,$stateProvider) {
	  $locationProvider
	  .html5Mode({
	    enabled: true, 
	    requireBase: false
	  });

	  $urlRouterProvider
	  .when('/','/echarts')
	  .otherwise('/echarts')

	  $stateProvider
	  .state('echarts',{
	    url:'/echarts',
	    templateUrl:'views/echarts.html',
	    controller:'echartsCtrl'
	  })
	})