/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/10
 * Time: 21:31
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    $('body').on('click', '.sidebar-nav .setting', function (e) {
        $util.stop(e);
    });
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //基础设置相关操作 --- BEGIN
    .on('click', '#nav>li>ul>li', function() {
        var $this = $(this),
            id = $this.attr('id');
        $('#nav>li>ul>li').removeClass('active');
        $this.addClass('active').find('.child').removeClass('dn');
    })
    .on('click', '#org', function() {
        $core.nextPage('Admin-Org');
    })
    .on('click', '#employee', function() {
        $core.nextPage('Admin-MgrEmployee');
    })
    .on('click', '#discount .child li', function() {
        var $this = $(this),
            id = $this.attr('id');
        $this.addClass('active').siblings('li').removeClass('active');
        if(id === 'discountMgr'){
            $core.nextPage('Admin-DiscountMgr');
        } else if(id === 'discountList'){
            $core.nextPage('Admin-DiscountList');
        }
    })
    .on('click', '#setting', function() {
        $core.nextPage('Admin-SwitchSchool');
    })
    //基础设置相关操作 --- END
    //学员服务相关操作 --- BEGIN
    .on('click', '#new-msg span', function() {
        var $this = $(this);
        $this.addClass('active').siblings('span').removeClass('active');
    })
    .on('click', '#change-msg span', function() {
        var $this = $(this);
        $this.addClass('active').siblings('span').removeClass('active');
    })
    .on('click', '#middle i', function() {
        var $this = $(this);
        $('#mask-edit-msg').removeClass('dn');
    })
    //学员服务相关操作 --- END
    //编辑短信相关操作 --- BEGIN
    .on('click', '#mask-edit-msg h3 i,#mask-edit-msg .bar .btn-cancel', function() {
        $('#mask-edit-msg').addClass('dn');
    })
    .on('click', '#mask-edit-msg .bar .btn-confirm', function() {
        editSMS(function(){
            $('#mask-edit-msg').removeClass('dn');
        });
    })
    //编辑短信相关操作 --- END
    ;

    function editSMS(cb) {
        $http.post({
            url: 'editSMS',
            data: {
                msg: $('#textarea').val().trim()
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError(data.message || '修改短信失败');
                }
            },
            error: function() {
                Alert.showError('修改短信失败');
            }
        });
    }

    $core.Ready(function() {
        console.log('studentservice');
    });
});