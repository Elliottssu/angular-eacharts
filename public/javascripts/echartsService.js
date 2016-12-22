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

		//折线图
		service.typeLine = function (data) {
			var option = {
	            tooltip: {},
	            legend: {
	                data:['件']
	            },
	            xAxis: {
	                data: data.xAxisData
	            },
	            yAxis: {},
	            series: [
	            	{
	              	 name: '销售量',
	               	 type: 'line',
	               	 data: data.seriesData[0]
	          		},
          		  	{
	  		    	 name: '增长率',
	  		     	 type: 'line',
	  		     	 data: data.seriesData[1]
	  				}
	            ]
			}
			
			return option
		}
		//折线图demo
		service.typeLine2 = function () {
			var option = {
	            tooltip: {},
	            legend: {
	                data:['件']
	            },
	            xAxis: {
	                data: ['2016/12/6', '2016/12/7', '2016/12/8', '2016/12/9', '2016/12/10', '2016/12/11', '2016/12/12']
	            },
	            yAxis: {},
	            series: [{
	                name: '累计数',
	                type: 'bar',
	                data: [5, 5, 8, 8, 8, 8, 10]
	            }]
			}
			
			return option
		}
		return service
	})