angular.module('echartsDireModule', [])
	.directive('ngEcharts', function () {
		return {
			restrict: 'AE',
			scope: {
				option: '='
			},
			template: '<div style="height: 400px"></div>',
			replace: 'true',
			link: function ($scope, elem, attrs) {
				$scope.$watch('option', function (value) {
					if (value) {						
						var chart = echarts.init(elem[0], 'macarons');  //初始化echart加入macarons主题，线条比较柔和，柱形也不尖锐
						chart.setOption($scope.option); 	//echarts原生的赋值方法，$scope.option是视图中传过来的
					}		
				})
			}
		}
	})