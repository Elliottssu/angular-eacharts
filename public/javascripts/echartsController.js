angular.module('echartsCtrlModule', ['echartsServiceModule'])
	.controller('echartsCtrl', function ($scope, $http, echartService) {
		$scope.showTrend = function (index) {
		  $scope.showId = [];
		  $scope.showId[index] = true;
		  switch (index) {
		    case 0:
		      $scope.lineSingleOption = $scope.lineOption1;
		      break;
		    case 1:
		      $scope.lineSingleOption =$scope.lineOption2;
		      break;
		    case 2:
		      $scope.lineSingleOption = $scope.lineOption3;
		      break;
		    case 3:
		      $scope.lineSingleOption = $scope.lineOption4;
		      break;
		  }
		};



		$scope.lineData1 = {
			legend: ['销售量','增长率']
		}
		$scope.lineData2 = {
			legend: ['销售额','增长率']
		}
		$scope.lineData3 = {
			legend: ['收藏','增长率']
		}
		$scope.lineData4 = {
			legend: ['评价','增长率']
		}
		$http.get('./resources/goodsInfo.json').success(function (data) {
			echartService.handleData(data, $scope.lineData1, 'amount', 'amountRatio')
			$scope.lineOption1 = echartService.typeLine($scope.lineData1)
		    $scope.lineSingleOption = $scope.lineOption1

	    	echartService.handleData(data, $scope.lineData2, 'sale', 'saleRatio')
	    	$scope.lineOption2 = echartService.typeLine($scope.lineData2)
	        $scope.lineSingleOption = $scope.lineOption1	

        	echartService.handleData(data, $scope.lineData3, 'focusNum', 'commentNumRatio')
        	$scope.lineOption3 = echartService.typeLine($scope.lineData3)
            $scope.lineSingleOption = $scope.lineOption1

        	echartService.handleData(data, $scope.lineData4, 'commentNum', 'amountRatio')
        	$scope.lineOption4 = echartService.typeLine($scope.lineData4)
            $scope.lineSingleOption = $scope.lineOption1


		})

	})