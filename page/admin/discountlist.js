/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/29
 * Time: 20:59
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    var checkFunc = {
        percent: function(){
            var flag = false,
                $selector = $('#percent'),
                percent = $selector.val();
            if (!percent) {
                Alert.showTips($selector, '请输入折扣百分比');
            } else if (percent < 0 ||　percent > 100) {
                Alert.showTips($selector, '折扣百分比范围0~100');
            } else {
                flag = true;
                Alert.hideTips();
            }
            return flag;
        }
    };
    $('body').on('click', '.sidebar .setting', function (e) {
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
    })
    .on('click', '#org', function() {
        $core.nextPage('Admin-Org');
    })
    .on('click', '#pay', function() {
        $core.nextPage('Admin-Pay');
    })
    .on('click', '#employee', function() {
        $core.nextPage('Admin-MgrEmployee');
    })
    .on('click', '#discount .child li', function(e) {
        $util.stop(e);
        var $this = $(this),
            id = $this.attr('id');
        $this.addClass('active').siblings('li').removeClass('active');
        if(id === 'discountMgr'){
            $core.nextPage('Admin-DiscountMgr');
        }
    })
    .on('click', '#student-service', function() {
        $core.nextPage('Admin-StudentService');
    })
    .on('click', '#setting', function() {
        $core.nextPage('Admin-SwitchSchool');
    })
    //基础设置相关操作 --- END
    //中间部分相关操作 --- BEGIN
    .on('mouseover', '#discount-list li', function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#discount-nav li', function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#discount-list li', function(){
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        var type = $.trim($this.find('.middle').text());
        if(type === '无折扣') {
            $('#discount-detail').addClass('dn');
            $('#discount-detail-none').removeClass('dn');
        } else {
            $('#discount-detail-none').addClass('dn');
            $('#discount-detail').removeClass('dn');
        }
    })
    //中间部分相关操作 --- END
    //sidebar-right相关操作 --- BEGIN
    .on('mouseover', '#sidebar-right li', function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#sidebar-right li', function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#sidebar-right li.total', function(){
        $core.nextPage('Admin-DiscountTotal');
    })
    .on('click', '#sidebar-right li.single', function(){
        $core.nextPage('Admin-DiscountSingle');
    })
    .on('click', '#sidebar-right li.self-define', function(){
        $core.nextPage('Admin-DiscountSelfDefine');
    })
    //sidebar-right相关操作 --- END
    //discount-detail相关操作 --- BEGIN
    .on('click', '#discount-detail h3 i', function(){
        $('#discount-detail').addClass('dn');
    })
    .on('click', '#discount-detail .bar .delete', function(){
        var courseName = $('#discount-list li.active .left h3').text(),
            cid = '1';
        Alert.showConfirm('删除课程[' + courseName + ']后将不能恢复，<br/>确认删除？', function () {
            deleteCourse(cid, function () {
                console.log('删除课程成功！');
            });
        });
    })
    .on('click', '#discount-detail .bar .edit', function(){
        $('.mask-confirm').removeClass('dn');
    })
    //discount-detail相关操作 --- END
    //discount-detail-none相关操作 --- BEGIN
    .on('click', '#discount-detail-none h3 i', function(){
        $('#discount-detail-none').addClass('dn');
    })
    .on('click', '#discount-detail-none .bar a', function(){
        $core.nextPage('Admin-DiscountSingle');
    })
    //discount-detail-none相关操作 --- END
    //mask-confirm相关操作 --- BEGIN
    .on('click', '.mask-confirm h3 i,.mask-confirm .btn-cancel', function(){
        $('.mask-confirm').addClass('dn');
    })
    .on('click', '.mask-confirm .btn-confirm', function(){
        for(var key in checkFunc){
            if(!checkFunc[key]()){
                return;
            }
        }
        $('.mask-confirm').addClass('dn');
        var cid = 1;
        updateCourse(cid, function () {
            console.log('更新课程折扣成功！');
        });
    })
    //mask-confirm相关操作 --- END
    ;

    // 删除课程
    function deleteCourse(cid, cb){
        $http.get({
            url: 'course/archive',
            data: {
               cid : cid
            },
            success: function (data) {
               if(data.code === $comm.HttpStatus.OK) {
                   Alert.showSuccess();
               } else {
                   Alert.showError();
               }
               $util.isFunction(cb) && cb();
            },
            error : function () {
               Alert.showError();
            }
        });
    }

    // 更新课程
    function updateCourse(cid, cb){
        $http.get({
            url: 'course/archive',
            data: {
              cid : cid
            },
            success: function (data) {
                if(data.code === $comm.HttpStatus.OK) {
                  Alert.showSuccess();
                } else {
                  Alert.showError();
                }
                $util.isFunction(cb) && cb();
            },
            error : function () {
                 Alert.showError();
            }
        });
    }
    $core.Ready(function() {
        console.log('discountlist');
    });
});