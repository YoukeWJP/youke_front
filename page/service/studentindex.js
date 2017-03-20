/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/14
 * Time: 19:23
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    $('body').on('click', '#footer .detail .second', function (e) {
        $util.stop(e);
        $(this).addClass('active').siblings('.item').removeClass('active');
    });

    $(document)
    .on('mouseover click', '#sidebar-right-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#sidebar-right-list li.second', function() {
        $core.nextPage('Service-MgrStudent');
    })
    .on('click', '#sidebar-right-list li.third', function() {
        $core.nextPage('Service-StudentBirthday');
    })
    ;

    $core.Ready(function() {
        console.log('studentindex');
        $('.footer .detail .second').addClass('active');
    });
});