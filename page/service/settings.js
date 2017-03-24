/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/18
 * Time: 14:47
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    $(document)
    //侧边菜单栏相关操作 --- BEGIN
    .on('mouseover', '#settings li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#settings li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#settings', function(e) {
        $util.stop(e);
    })
    .on('click', '#settings .fullscreen', function(e) {
        var $this = $(this);
        if ($this.hasClass('exit')) {
            $this.removeClass('exit');
            $util.exitFullscreen(e);
        } else {
            $this.addClass('exit');
            $util.fullScreen(e);
        }
    })
    .on('click', '#settings .logout', function() {
        Alert.showConfirm('确认退出', '确认退出账号：<br/>员工名(18512345678)', function() {
            //TODO
            $core.nextPage('Login-Login');
        });
    })
    .on('click', '#settings .home', function(e) {
        $('#settings li').removeClass('active');
        $(this).addClass('active');
    })
    //侧边菜单栏相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('settings');
    });
});