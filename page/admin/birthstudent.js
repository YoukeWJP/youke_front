/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/19
 * Time: 10:34
 */
require(['YOUKE.Util', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //中间列表相关操作 --- BEGIN
    .on('mouseover', '.student-birthday .content li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.student-birthday .nav li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.student-birthday .content li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        $('.sidebar-right-student-detail').removeClass('dn');
    })
    //中间列表相关操作 --- END
    //右侧菜单栏相关操作 --- BEGIN
    .on('mouseover', '.sidebar-right-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right-list .first', function() {
        $core.nextPage('Admin-IndexStudent');
    })
    .on('click', '.sidebar-right-list .second', function() {
        $core.nextPage('Admin-MgrStudent');
    })
    //右侧菜单栏相关操作 --- END
    //生日详情相关操作 --- BEGIN
    .on('click', '.sidebar-right-student-detail .title i,.sidebar-right-student-detail .title label', function() {
        $('.sidebar-right-student-detail').addClass('dn');
    })
    .on('click', '.sidebar-right-student-detail .slide', function() {
        var $this = $(this);
        $this.toggleClass('up').toggleClass('down');
        if($this.hasClass('up')) {
            $('.student-info .detail').removeClass('dn');
        } else if($this.hasClass('down')){
            $('.student-info .detail').addClass('dn');
        }
    })
    //生日详情相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('birthstudent');
    });
});