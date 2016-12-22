angular.module('echartsCtrlModule', ['echartsServiceModule'])
	.controller('echartsCtrl', function ($scope, $http, echartService) {
		$scope.lineData1 = {
			legend: ['销售量','增长率']
		}
		$http.get('./resources/goodsInfo.json').success(function (data) {
			echartService.handleData(data, $scope.lineData1, 'amount', 'amountRatio')
			$scope.lineOption1 = echartService.typeLine($scope.lineData1)
		    $scope.lineOption = $scope.lineOption1	
		})

	})