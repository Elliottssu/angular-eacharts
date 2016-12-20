angular.module('echartsServiceModule', [])
	.factory('echartService', function () {
		var service = {};
		//数据处理
		service.setSelCategoryData=function(oriData,newData,key1,key2){
		  newData.group=[];
		  newData.data=[[],[]];
		  angular.forEach(oriData,function (v,k) {
		    newData.group.push(new Date(v.time).toLocaleDateString());
		    if(typeof (v[key1])=='number'){
		      v[key1]=Math.round(v[key1]*100)/100;
		      v[key2]=Math.round(v[key2]*100)/100;
		      newData.data[0].push(v[key1]);
		      newData.data[1].push(v[key2]);
		    }else{
		      newData.data[0].push('--');
		      newData.data[1].push('--');
		    }
		  })
		  return newData
		}
		//折线图
		service.typeLine = function () {
			var option = {
				title: {
					text:'基本折线图'
				},
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