/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/18
 * Time: 16:00
 */
require(['YOUKE.Util', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    $('body').on('click', '.sidebar-nav .home', function (e) {
        $util.stop(e);
    });
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //nav-left相关操作 --- BEGIN
    .on('click', '.nav-left .setting', function() {
        $core.nextPage('Admin-Org');
    })
    //nav-left相关操作 --- END
    //content相关操作 --- BEGIN
    .on('click', '.body .content .business-daily', function() {
        // $core.nextPage('Admin-Daily');
        $core.nextPage('Admin-Weekly');
    })
    .on('click', '.body .content .account-sales', function() {
        $core.nextPage('Admin-SalesDetail');
    })
    .on('click', '.body .content .mgr-student', function() {
        $core.nextPage('Admin-IndexStudent');
    })
    .on('click', '.body .content .mgr-course', function() {
        $core.nextPage('Admin-MgrCourse');
    })
    //content相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('index');
    });
});