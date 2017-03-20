/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/14
 * Time: 18:06
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
        $core.nextPage('Service-StudentIndex');
    });

    $(document)
    //  顶部相关操作  --- BEGIN
    .on('click', '#student-birthday .nav li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('#sidebar-right-student-detail').addClass('dn');
        $('#sidebar-right-list').removeClass('dn');
    })
    //  顶部相关操作  --- END
    //  学员列表相关操作  --- BEGIN
    .on('mouseover', '#student-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#student-list li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        $('#sidebar-right-list').addClass('dn');
        $('#sidebar-right-student-detail').removeClass('dn');
    })
    //  学员列表相关操作  --- END
    //  右侧列表相关操作  --- BEGIN
    .on('mouseover click', '#sidebar-right-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#sidebar-right-list li.first', function() {
        $core.nextPage('Service-StudentIndex');
    })
    .on('click', '#sidebar-right-list li.second', function() {
        $core.nextPage('Service-MgrStudent');
    })
    .on('click', '#sidebar-right-student-detail h3.title i,#sidebar-right-student-detail h3.title span', function() {
        $('#sidebar-right-student-detail').addClass('dn');
        $('#sidebar-right-list').removeClass('dn');
    })
    .on('click', '#sidebar-right-student-detail .student-birth .slide', function() {
        var $this = $(this);
        if($this.hasClass('down')){
            $this.removeClass('down').addClass('up');
            $this.closest('.student-birth').siblings('.detail').removeClass('dn');
        } else if($this.hasClass('up')){
            $this.removeClass('up').addClass('down');
            $this.closest('.student-birth').siblings('.detail').addClass('dn');
        }
    })
    //  右侧列表相关操作  --- END
    ;

    $core.Ready(function() {
        console.log('studentbirthday');
        $('.footer .detail .second').addClass('active');
    });
});