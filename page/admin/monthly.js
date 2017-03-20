/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/17
 * Time: 14:35
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //右侧菜单栏相关操作 --- BEGIN
    .on('mouseover', '.sidebar-right li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right li.daily', function() {
        $core.nextPage('Admin-Daily');
    })
    .on('click', '.sidebar-right li.weekly', function() {
        $core.nextPage('Admin-Weekly');
    })
    //右侧菜单栏相关操作 --- END
    ;

    //http://echarts.baidu.com/option.html#series
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
        $('#calendarTime').mobiscroll().date({
            theme: 'ios', //mobiscroll
            lang: 'zh',
            display: 'modal',
            mode: 'mixed',
            dateOrder: 'yymm',
            dateFormat: 'yy-mm',
            startYear: 2000, //开始年份
            endYear: currYear + 10, //结束年份
            onClosed: function(valueText, inst) {
                console.log(valueText);
            }
        });
    }
    $core.Ready(function() {
        console.log('monthly');
        $('#calendarTime').val($util.format({
            flag: 2
        }));
        calendarBasicInit();
        payPie.setOption(payPieOption);
        orderPie.setOption(orderPieOption);
    });
});