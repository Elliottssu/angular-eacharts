angular.module('echartsServiceModule', [])
	.factory('echartService', function () {
		var service = {};

		//处理原始数据
		service.handleData = function (beforeData, afterData, seriesData1, seriesData2) {
			afterData.xAxisData = [];    //定义过滤x轴数据的数组
			afterData.seriesData = [[],[]];    //定义过滤y轴的两侧数据的二维数组
			for (var i = 0; i < beforeData.length; i++) {
				afterData.xAxisData.push(new Date(beforeData[i].time).toLocaleDateString())   //处理UTC 通用标准时间，转换为标准的时间格式
				afterData.seriesData[0].push(Math.round(beforeData[i][seriesData1]*100)/100)   //Math.round()四舍五入处理带很多小数点的数字 *100再除一百是为了保留两位小数
				afterData.seriesData[1].push(Math.round(beforeData[i][seriesData2]*100)/100)
			}
			return afterData
		}

		//单折线图
		service.typeLineOption = function (data) {
			var option = {
	            tooltip: {
	              trigger: "axis"
	            },
	            legend: {
	                data: data.legend
	            },
	            xAxis: {
	                data: data.xAxisData
	            },
	            yAxis: {
	                name: data.legend[0]
	            },
	            series: [
	            	{
	              	 name: data.legend[0],
	               	 type: 'line',
	               	 data: data.seriesData[0]
	          		}
	            ]
			}
			
			return option
		}

		//柱状与折线图
		service.typeBarLineOption = function (data) {
		  var option = {
		          tooltip: {
		            trigger: "axis"
		          },
		          legend: {
		            data: data.legend,
		          },
		          xAxis:  {
		              data: data.xAxisData
		          },
		          yAxis: [
		            {
		              name: data.legend[0],
		              splitLine: {
		                show: false
		              },
		              splitArea: {
		                show: false
		              }
		            },
		            {
		              name: data.legend[1],
		              splitLine: {
		                show: false
		              },
		              splitArea: {
		                show: false
		              }
		            }
		          ],
		          series: [
		            {
		              name: data.legend[0],
		              type: "bar",
		              data: data.seriesData[0]
		            },
		            {
		              name: data.legend[1],
		              type: "line",
		              yAxisIndex: 1,
		              data: data.seriesData[1]
		            }
		          ]
		        }
		        return option
		}


		return service
	})