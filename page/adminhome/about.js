/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/3
 * Time: 11:23
 */
require(['YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        Alert = YOUKE.Widget.Alert;

    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //左侧菜单相关操作 --- BEGIN
    .on('click', '#person-info .home', function() {
        $core.nextPage('Admin-Index');
    })
    .on('mouseover', '#person-info li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#person-info li.info', function() {
        $core.nextPage('Admin-Home-PersonalInfo');
    })
    .on('click', '#person-info li.exit', function() {
        Alert.showConfirm('确认退出', '确认退出账号：<br/>员工名(18512345678)', function() {
            //TODO
            $core.nextPage('Login-Login');
        });
    });
    //左侧菜单相关操作 --- END

    $core.Ready(function() {
        console.log('about');
    });
});