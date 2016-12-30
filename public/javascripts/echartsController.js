angular.module('echartsCtrlModule', ['echartsServiceModule'])
	.controller('echartsCtrl', function ($scope, $http, echartService) {
		$scope.showId = [true, false, false, false, true, false, false, false];
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
			case 4:
			  $scope.lineSingleOption2 = $scope.lineOption5;
			  break;
			case 5:
			  $scope.lineSingleOption2 =$scope.lineOption6;
			  break;
			case 6:
		      $scope.lineSingleOption2 = $scope.lineOption7;
			  break;
			case 7:
			  $scope.lineSingleOption2 = $scope.lineOption8;
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

		$scope.lineData5 = {
			legend: ['销售量','增长率']
		}
		$scope.lineData6 = {
			legend: ['销售额','增长率']
		}
		$scope.lineData7 = {
			legend: ['收藏','增长率']
		}
		$scope.lineData8 = {
			legend: ['评价','增长率']
		}

		$http.get('./resources/goodsInfo.json').success(function (data) {
			echartService.handleData(data, $scope.lineData1, 'amount', 'amountRatio')
			$scope.lineOption1 = echartService.typeLineOption($scope.lineData1)

	    	echartService.handleData(data, $scope.lineData2, 'sale', 'saleRatio')
	    	$scope.lineOption2 = echartService.typeLineOption($scope.lineData2)

        	echartService.handleData(data, $scope.lineData3, 'focusNum', 'commentNumRatio')
        	$scope.lineOption3 = echartService.typeLineOption($scope.lineData3)

        	echartService.handleData(data, $scope.lineData4, 'commentNum', 'amountRatio')
        	$scope.lineOption4 = echartService.typeLineOption($scope.lineData4)

            $scope.lineSingleOption = $scope.lineOption1


            //第二种
			echartService.handleData(data, $scope.lineData5, 'amount', 'amountRatio')
			$scope.lineOption5 = echartService.typeBarLineOption($scope.lineData5)

	    	echartService.handleData(data, $scope.lineData6, 'sale', 'saleRatio')
	    	$scope.lineOption6 = echartService.typeBarLineOption($scope.lineData6)

	    	echartService.handleData(data, $scope.lineData7, 'focusNum', 'commentNumRatio')
	    	$scope.lineOption7 = echartService.typeBarLineOption($scope.lineData7)

	    	echartService.handleData(data, $scope.lineData8, 'commentNum', 'amountRatio')
	    	$scope.lineOption8 = echartService.typeBarLineOption($scope.lineData8)

	        $scope.lineSingleOption2 = $scope.lineOption5
		})

	})