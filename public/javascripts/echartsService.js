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

		//处理原始数据(复杂)
		service.handleMaxData = function (beforeData, afterData, key1, key2, type) {
			afterData.xAxisData = [];
			afterData.series = [];
			afterData.legend = [];
			times = [];

			//_.uniq去重 _.map过滤 _.chunk分组
			angular.forEach(beforeData, function (v, k) {
			  times.push(new Date(v.time).toLocaleDateString());
			})
			afterData.xAxisData = _.uniq(times, true);

			angular.forEach(_.chunk(beforeData, 30), function (v, k) {
			  data = {};
			  data.name = _.uniq(_.map(v,key1))[0];
			  data.data = _.map(v, key2);
			  data.type = type;
			  afterData.series.push(data);
			  afterData.legend.push(data.name);
			})
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
	                name: data.legend
	            },
	            series: [
	            	{
	              	 name: data.legend,
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

		//多线条
		service.typeMultiLineOption = function (data) {
			var option = {
	            tooltip: {
	              trigger: "axis"
	            },
	            legend: {
	                data: data.legend,
	                top: 10,
	                left: '20%',
	                right: '20%'
	            },
	            xAxis: {
	                data: data.xAxisData
	            },
	            yAxis: {
	                name: data.yAxisName
	            },
	            series: data.series
			}
			
			return option
		}

		//饼状图
		service.typePieOption = function (data, legend) {
			var option = {
			  tooltip : {
			    formatter: "{b} : {c} 个 ({d}%)"
			  },
			  legend: {
			    orient: 'vertical',
			    x: '70%',
			    y:'15%',
			    data: legend
			  },
			  series: {
			    type:'pie',
			    radius: ['47%', '68%'],
			    center: ['35%', '50%'],
			    data:data
			  }
			}
			return option
		}


		return service
	})