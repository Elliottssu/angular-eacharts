angular.module('echartsCtrlModule', ['echartsServiceModule'])
	.controller('echartsCtrl', function ($scope, echartService) {
		$http.get('./resources/goodsInfo.json').success(function (data) {
			echartService.setSelCategoryData(data,$scope.salesData,'sale','saleRatio');
			$scope.demoOption = echartService.typeLine($scope.salesData)
		})
	})