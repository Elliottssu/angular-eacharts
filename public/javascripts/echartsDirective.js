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
				var chart = echarts.init(elem[0], 'macarons');         //初始化echart加入macarons主题，线条比较柔和，柱形也不尖锐
				chart.setOption($scope.option);   
			}
		}
	})