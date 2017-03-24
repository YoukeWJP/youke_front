/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/28
 * Time: 17:02
 */
require(['YOUKE.Util', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    $('body').on('click', '.sidebar-nav .setting', function (e) {
        $util.stop(e);
    });
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //基础设置相关操作 --- BEGIN
    .on('click', '#nav>li>ul>li', function() {
        var $this = $(this),
            id = $this.attr('id');
        $('#nav>li>ul>li').removeClass('active');
        $this.addClass('active').find('.child').removeClass('dn');
    })
    .on('click', '#org', function() {
        $core.nextPage('Admin-Org');
    })
    .on('click', '#employee', function() {
        $core.nextPage('Admin-MgrEmployee');
    })
    .on('click', '#discount .child li', function() {
        var $this = $(this),
            id = $this.attr('id');
        $this.addClass('active').siblings('li').removeClass('active');
        if(id === 'discountMgr'){
            $core.nextPage('Admin-DiscountMgr');
        } else if(id === 'discountList'){
            $core.nextPage('Admin-DiscountList');
        }
    })
    .on('click', '#student-service', function() {
        $core.nextPage('Admin-StudentService');
    })
    .on('click', '#setting', function() {
        $core.nextPage('Admin-SwitchSchool');
    })
    //基础设置相关操作 --- END
    //支付方式列表相关操作 --- BEGIN
    .on('mouseover click', '.body .content ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#payList .status', function() {
        Alert.showConfirm('确认开启/关闭', '确认开启/关闭改支付方式么？', function () {
            console.log('开启/关闭了');
        });
    })
    //支付方式列表相关操作 --- END
    ;

    //获取支付方式列表 --- BEGIN
    function getPayList() {

    }
    //获取支付方式列表 --- END

    $core.Ready(function() {
        console.log('pay');
        getPayList();
    });
});