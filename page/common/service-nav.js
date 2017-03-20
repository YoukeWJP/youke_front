/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/18
 * Time: 14:15
 */
require(['YOUKE.Util', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $util = YOUKE.Util,
        $http = YOUKE.Services,
        Alert = YOUKE.Widget.Alert;

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
    .on('click', '#mask-settings', function() {
        $('#mask-settings').addClass('dn');
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
    .on('click', '#settings .settings', function() {
        $core.nextPage('Service-Settings');
    })
    .on('click', '#settings .home', function() {
        $('#settings li').removeClass('active');
        $(this).addClass('active');
        $core.nextPage('Service-Settings');
    })
    //侧边菜单栏相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('service-nav');
    });
});