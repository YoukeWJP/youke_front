/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/1
 * Time: 18:41
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;
    var CONST = {
        cid: 1 //$util.getQuery('cid')
    };

    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //中间部分相关操作 --- BEGIN
    .on('click', '#content .operate>a', function() {
        $('#sidebar-right-detail,#sidebar-right-sale-detail,#sidebar-right-refund-detail').addClass('dn');
        $(this).addClass('active').siblings('a').removeClass('active');
        getSalesDetail();
    })
    .on('mouseover', '#discount-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#discount-list li', function() {
        $('#sidebar-right-detail,#sidebar-right-sale-detail,#sidebar-right-refund-detail').addClass('dn');
        var type = $('#content .operate>a.active').attr('data-type');
        var $this = $(this);
        $this.addClass('active').siblings('a').removeClass('active');
        $('#sidebar-right-detail').removeClass('dn');
    })
    //中间部分相关操作 --- END
    //右侧菜单栏相关操作 --- BEGIN
    //    sidebar-right --- BEGIN
    .on('mouseover', '.sidebar-right li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    //    sidebar-right --- END
    //    sidebar-right-detail --- BEGIN
    .on('click', '#sidebar-right-detail .section li', function() {
        var type = $('#content .operate>a.active').attr('data-type');
        if(type === 'sale'){
            $('#sidebar-right-refund-detail').addClass('dn');
            $('#sidebar-right-sale-detail').removeClass('dn');
        } else if(type === 'refund'){
            $('#sidebar-right-sale-detail').addClass('dn');
            $('#sidebar-right-refund-detail').removeClass('dn');
        }
    })
    //    sidebar-right-detail --- END
    .on('click', '#sidebar-right-detail .course-name i', function() {
        $('#sidebar-right-detail').addClass('dn');
    })
    .on('click', '#sidebar-right-sale-detail h3.title i', function() {
        $('#sidebar-right-sale-detail').addClass('dn');
    })
    .on('click', '#sidebar-right-refund-detail h3.title i', function() {
        $('#sidebar-right-refund-detail').addClass('dn');
    })
    //右侧菜单栏相关操作 --- END
    ;
    //初始化日期控件
    function calendarBasicInit() {
        // https://docs.mobiscroll.com/2-17-0/jquery/scroller#usage
        var currYear = new Date().getFullYear();
        $('#searchDate').mobiscroll().calendar({
            theme: 'ios', //mobiscroll
            lang: 'zh',
            display: 'modal',
            mode: 'mixed',
            dateOrder: 'yymmdd',
            dateFormat: 'yy-mm-dd',
            defaultValue: $('#searchDate').val() ? new Date($('#searchDate').val()) : new Date(),
            startYear: 2000, //开始年份
            endYear: currYear + 10, //结束年份
            onClosed: function(valueText, inst) {
                console.log(valueText);
                console.log(inst);
                $('#sidebar-right-detail,#sidebar-right-sale-detail,#sidebar-right-refund-detail').addClass('dn');
                getSalesDetail();
            }
        });
    }

    function getSalesDetail() {
        var type = $('#content .operate>a.active').attr('data-type');
        if (type === 'sale') {
            //TODO
        } else if (type === 'refund') {
            //TODO
        }
    }

    $core.Ready(function() {
        console.log('salesdetail');
        $('#searchDate').val($util.format({
            flag: 1
        }));
        calendarBasicInit();
    });
});