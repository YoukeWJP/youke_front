/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/18
 * Time: 17:04
 */
require(['YOUKE.Util', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //右侧菜单栏相关操作 --- BEGIN
    .on('mouseover', '.sidebar-right-list li', function() {
       $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right-list .second', function() {
        $core.nextPage('Admin-MgrStudent');
    })
    .on('click', '.sidebar-right-list .third', function() {
        $core.nextPage('Admin-BirthStudent');
    })
    //右侧菜单栏相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('indexstudent');
    });
});