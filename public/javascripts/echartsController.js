angular.module('echartsCtrlModule', ['echartsServiceModule'])
	.controller('echartsCtrl', function ($scope, $http, echartService) {
		//导航切换
		$scope.showId = [true];
		$scope.showTrend = function (index) {
		  $scope.showId = [];
		  $scope.showId[index] = true;
		  switch (index) {
		    case 0:
		      $scope.typeBarLineOption = $scope.typeBarLine1;
		      break;
		    case 1:
		      $scope.typeBarLineOption = $scope.typeBarLine2;
		      break;
		    case 2:
		      $scope.typeBarLineOption = $scope.typeBarLine3;
		      break;
		    case 3:
		      $scope.typeBarLineOption = $scope.typeBarLine4;
		      break;
		  }
		};


		$http.get('./resources/goodsInfo.json').success(function (data) {
			//单线条演示
			$scope.typeLineData = {
				legend: ['店铺数量']
			}
			echartService.handleData(data.data.shopNumData, $scope.typeLineData, 'shopNum')
			$scope.typeLineOption = echartService.typeLineOption($scope.typeLineData)


            //柱状图与折线双演示
            $scope.typeBarLineData1 = {
            	legend: ['销售量','增长率']
            }
            $scope.typeBarLineData2 = {
            	legend: ['销售额','增长率']
            }
            $scope.typeBarLineData3 = {
            	legend: ['收藏','增长率']
            }
            $scope.typeBarLineData4 = {
            	legend: ['评价','增长率']
            }

			echartService.handleData(data.data.goodsData, $scope.typeBarLineData1, 'amount', 'amountRatio')
			$scope.typeBarLine1 = echartService.typeBarLineOption($scope.typeBarLineData1)

	    	echartService.handleData(data.data.goodsData, $scope.typeBarLineData2, 'sale', 'saleRatio')
	    	$scope.typeBarLine2 = echartService.typeBarLineOption($scope.typeBarLineData2)

	    	echartService.handleData(data.data.goodsData, $scope.typeBarLineData3, 'focusNum', 'commentNumRatio')
	    	$scope.typeBarLine3 = echartService.typeBarLineOption($scope.typeBarLineData3)

	    	echartService.handleData(data.data.goodsData, $scope.typeBarLineData4, 'commentNum', 'amountRatio')
	    	$scope.typeBarLine4 = echartService.typeBarLineOption($scope.typeBarLineData4)

	        $scope.typeBarLineOption = $scope.typeBarLine1

	        //多线条演示


			$scope.shopsNumData = {
			  yAxisName: '件'
			};

			echartService.handleMaxData(data.data.shopData, $scope.shopsNumData, 'shopName', 'sale', 'line')
			$scope.typeMultiLineOption = echartService.typeMultiLineOption($scope.shopsNumData);

	        //饼状图演示
	        $scope.shopSaleData = [];
	        $scope.pieLegend = [];
	        angular.forEach(data.data.shopSummary, function (v,k) {
	          $scope.echartData = {
	            value: v.totalSale,
	            name: v.shopName
	          }
	          $scope.shopSaleData.push($scope.echartData);
	          $scope.pieLegend.push(v.shopName);
	        })
	        $scope.typePieOption = echartService.typePieOption($scope.shopSaleData, $scope.pieLegend);

		})

	})