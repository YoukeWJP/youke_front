/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/13
 * Time: 16:17
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
    }).on('click', '#org', function() {
        $core.nextPage('Admin-Org');
    }).on('click', '#pay', function() {
        $core.nextPage('Admin-Pay');
    }).on('click', '#discount .child li', function() {
        var $this = $(this),
            id = $this.attr('id');
        $this.addClass('active').siblings('li').removeClass('active');
        if(id === 'discountMgr'){
            $core.nextPage('Admin-DiscountMgr');
        } else if(id === 'discountList'){
            $core.nextPage('Admin-DiscountList');
        }
    })
    .on('click', '#student-service', function() {
        $core.nextPage('Admin-StudentService');
    })
    .on('click', '#setting', function() {
        $core.nextPage('Admin-SwitchSchool');
    })
    //基础设置相关操作 --- END
    //员工管理列表相关操作 --- BEGIN
    .on('mouseover', '.body .content ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    }).on('click', '.body .content ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('.sidebar-right').removeClass('dn');
    }).on('click', '.sidebar-right .desc', function() {
        $('.sidebar-right').addClass('dn');
    }).on('click', '.sidebar-right .delete', function() {
        Alert.showConfirm('确认删除员工，<br/>张三？', function() {
            deleteEmployee();
        });
    }).on('click', '.body .content .title i', function() {
        $core.nextPage('Admin-AddEmployee');
    })
    //员工管理列表相关操作 --- END
    //重置登录密码 --- BEGIN
    .on('click', '.sidebar-right .reset-pwd', function() {
        Alert.showConfirm('确认重置', '重置密码需要清除当前密码，<br/>并重新设置为“123456”，确定重置？', function() {
            resetLoginPwd();
        });
    })
    //重置登录密码 --- END
    ;
    //重置登录密码
    function resetLoginPwd() {}
    //删除员工
    function deleteEmployee() {}
    $core.Ready(function() {
        console.log('index');
        if ($util.getCurrentRole() === $comm.Role.admin) {
            $('#setting').parents('li').removeClass('dn');
        }
    });
});