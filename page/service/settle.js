/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/16
 * Time: 18:36
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    $('body').on('click', '#footer .detail .third', function(e) {
        $util.stop(e);
        $(this).addClass('active').siblings('.item').removeClass('active');
        $core.nextPage('Service-Record');
    });

    $(document)
    // 结算列表相关操作  --- BEGIN
    .on('click', '#settle .nav li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('mouseover', '#settle .content li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#settle .content li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        if ($this.find('.down').length) { //如果是已取消
            $('#sidebar-right,#income-refund').addClass('dn');
            $('#refund-detail').removeClass('dn');
        } else {
            $('#sidebar-right,#refund-detail').addClass('dn');
            $('#income-refund').removeClass('dn');
        }
    })
    // 结算列表相关操作  --- END
    // 右侧列表相关操作  --- BEGIN
    .on('mouseover click', '#sidebar-right li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#sidebar-right li.first', function() {
        $core.nextPage('Service-Record');
    })
    .on('click', '#income-refund h3 i', function() {
        $('#income-refund').addClass('dn');
        $('#sidebar-right').removeClass('dn');
    })
    .on('click', '#refund-detail h3 i', function() {
        $('#refund-detail').addClass('dn');
        $('#sidebar-right').removeClass('dn');
    })
    .on('click', '#income-refund .refund-btn', function() {
        $('#mask-refund-cancel').removeClass('dn');
        // Alert.showConfirm('确认退款', '确认退款吗？', function() {
        //     //TODO
        //     $('#signin-detail').addClass('dn');
        //     $('#sidebar-right').removeClass('dn');
        // });
    })
    // 右侧列表相关操作  --- END
    // 退款相关操作  --- BEGIN
    .on('click', '#mask-refund-cancel .cancel-info h3 i', function() {
        $('#mask-refund-cancel').addClass('dn');
    })
    .on('click', '#mask-refund-cancel .cancel-info .btn-cancel', function() {
        $('#mask-refund-cancel').addClass('dn');
    })
    .on('click', '#mask-refund-cancel .cancel-info .selected-list li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#mask-refund-cancel .cancel-info .btn-cancel-reason', function() {
        $('#mask-refund-cancel .cancel-reason').removeClass('dn');
    })
    .on('click', '#mask-refund-cancel .cancel-reason h3 i', function() {
        $('#mask-refund-cancel .cancel-reason').addClass('dn');
    })
    .on('click', '#mask-refund-cancel .cancel-reason .btn-cancel', function() {
        $('#mask-refund-cancel .cancel-reason').addClass('dn');
    })
    .on('click', '#mask-refund-cancel .cancel-reason .type-reason span', function() {
        var $this = $(this);
        $this.addClass('active').siblings('span').removeClass('active');
    })
    // 退款相关操作  --- END
    ;

    $core.Ready(function() {
        console.log('settle');
        $('.footer .detail .third').addClass('active');
    });
});