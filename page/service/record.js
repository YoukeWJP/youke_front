/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/16
 * Time: 17:40
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    $('body').on('click', '#footer .detail .third', function(e) {
        $util.stop(e);
        $(this).addClass('active').siblings('.item').removeClass('active');
    });

    $(document)
    //  签到列表相关操作  --- BEGIN
    .on('click', '#signin .nav li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('mouseover', '#signin .content li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#signin .content li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        if ($this.find('.down').length) { //如果是已取消
            $('#sidebar-right,#signin-detail').addClass('dn');
            $('#cancel-detail').removeClass('dn');
        } else {
            $('#sidebar-right,#cancel-detail').addClass('dn');
            $('#signin-detail').removeClass('dn');
        }
    })
    //  签到列表相关操作  --- END
    //  右侧列表相关操作  --- BEGIN
    .on('mouseover click', '#sidebar-right li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#sidebar-right li.second', function() {
        $core.nextPage('Service-Settle');
    })
    .on('click', '#cancel-detail h3 i', function() {
        $('#cancel-detail').addClass('dn');
        $('#sidebar-right').removeClass('dn');
    })
    .on('click', '#signin-detail h3 i', function() {
        $('#signin-detail').addClass('dn');
        $('#sidebar-right').removeClass('dn');
    })
    .on('click', '#signin-detail .signin-btn', function() {
        $('#mask-course-signin-cancel').removeClass('dn');
        // Alert.showConfirm('确认取消签到', '确认取消签到吗？', function() {
        //     //TODO
        //     $('#signin-detail').addClass('dn');
        //     $('#sidebar-right').removeClass('dn');
        // });
    })
    //  右侧列表相关操作  --- END
    //  取消签到相关操作  --- BEGIN
    .on('click', '#mask-course-signin-cancel .cancel-info h3 i', function() {
        $('#mask-course-signin-cancel').addClass('dn');
    })
    .on('click', '#mask-course-signin-cancel .cancel-info .btn-cancel-reason', function() {
        $('#mask-course-signin-cancel .cancel-reason').removeClass('dn');
    })
    .on('click', '#mask-course-signin-cancel .cancel-info .btn-cancel', function() {
        $('#mask-course-signin-cancel').addClass('dn');
    })
    .on('click', '#mask-course-signin-cancel .cancel-reason h3 i', function() {
        $('#mask-course-signin-cancel .cancel-reason').addClass('dn');
    })
    .on('click', '#mask-course-signin-cancel .cancel-reason .btn-cancel', function() {
        $('#mask-course-signin-cancel .cancel-reason').addClass('dn');
    })
    //  取消签到相关操作  --- END
    ;

    $core.Ready(function() {
        console.log('record');
        $('.footer .detail .third').addClass('active');
    });
});