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

		//柱状与折线图
		service.typeBarLineOption = function (data) {
		  var option = {
		          tooltip: {
		            trigger: "axis"
		          },
		          legend: {
		            show: true,
		            data: data.legend,
		            top: 10
		          },
		          height: "70%",
		          grid: {
		            bottom: 15,
		            left: 20,
		            right: 20
		          },
		          color : ['#39CCCC','#0074D9'],
		          xAxis: [
		            {
		              type: "category",
		              nameGap: 35,
		              axisTick: {
		                show: false
		              },
		              axisLine: {
		                onZero: true
		              },
		              data: data.xAxisData
		            }
		          ],
		          yAxis: [
		            {
		              type: "value",
		              name: data.legend[0],
		              axisLabel: {
		                formatter: "{value}",
		                inside: true,
		                margin: 8
		              },
		              axisTick: {
		                show: false
		              },
		              nameTextStyle: {
		                color: "#000"
		              },
		              zlevel: 10,
		              splitLine: {
		                show: false
		              },
		              splitArea: {
		                show: false
		              }
		            },
		            {
		              type: "value",
		              name: data.legend[1],
		              axisLabel: {
		                inside: true,
		                margin: 8
		              },
		              axisTick: {
		                show: false
		              },
		              nameTextStyle: {
		                color: "#000"
		              },
		              zlevel: 10,
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
		              smooth: true,
		              label: {
		                normal: {
		                  show: false
		                }
		              },
		              data: data.seriesData[0]
		            },
		            {
		              name: data.legend[1],
		              type: "line",
		              yAxisIndex: 1,
		              smooth: true,
		              data: data.seriesData[1],
		              connectNulls: true
		            }
		          ]
		        }
		        return option
		}


		return service
	})