/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/17
 * Time: 13:19
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;
    //http://echarts.baidu.com/option.html#series
    //日收入
    var scatter = echarts.init(document.getElementById('scatter'));
    var scatterOption = {
        grid: [{
            x: '10%',
            y: '10%',
            width: '80%',
            height: '70%'
        }],
        tooltip: {
            formatter: '({c})'
        },
        xAxis: [{
            gridIndex: 0,
            min: 0,
            max: 20
        }],
        yAxis: [{
            gridIndex: 0,
            min: 0,
            max: 15
        }],
        series: [{
            type: 'scatter',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [
                [10.0, 8.04],
                [8.0, 6.95],
                [13.0, 7.58],
                [9.0, 8.81],
                [11.0, 8.33],
                [14.0, 9.96],
                [6.0, 7.24],
                [4.0, 4.26],
                [12.0, 10.84],
                [7.0, 4.82],
                [5.0, 5.68]
            ]
        }]
    };
    //支付方式pie图
    var payPie = echarts.init(document.getElementById('payPie'));
    var payPieOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '支付金额',
            type: 'pie',
            radius: '55%',
            data: [{
                value: 60000,
                name: '现金'
            }, {
                value: 25000,
                name: '银行卡'
            }, {
                value: 25000,
                name: '支付宝'
            }, {
                value: 25000,
                name: '微信'
            }],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    //订单统计pie图
    var orderPie = echarts.init(document.getElementById('orderPie'));
    var orderPieOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '订单金额',
            type: 'pie',
            radius: '55%',
            data: [{
                value: 60000,
                name: '销售'
            }, {
                value: -25000,
                name: '退单'
            }],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    //初始化日期控件
    function calendarBasicInit() {
        // https://docs.mobiscroll.com/2-17-0/jquery/scroller#usage
        var currYear = new Date().getFullYear();
        $('#calendarTime').mobiscroll().calendar({
            theme: 'ios', //mobiscroll
            lang: 'zh',
            display: 'modal',
            mode: 'mixed',
            dateFormat: 'yy-mm-dd',
            startYear: 2000, //开始年份
            endYear: currYear + 10, //结束年份
            onClosed: function(valueText, inst) {
                console.log($moment.days(valueText));
            }
        });
    }
    $core.Ready(function() {
        console.log('daily');
        $('#calendarTime').val($util.format({
            flag: 1
        }));
        calendarBasicInit();
        scatter.setOption(scatterOption);
        payPie.setOption(payPieOption);
        orderPie.setOption(orderPieOption);
    });
});