/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/29
 * Time: 21:00
 */
require(['YOUKE.Util', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
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
        if(id === 'discountList'){
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
    //中间部分相关操作 --- BEGIN
    .on('mouseover', '#discount-list li', function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#discount-nav li', function(){
        var $this = $(this),
            type = $this.attr('data-type');
        if(type === 'total'){
            $('#discount-detail-single,#discount-detail-self-define').addClass('dn');
        } else if(type === 'single'){
            $('#discount-detail-total,#discount-detail-self-define').addClass('dn');
        } else if(type === 'self-define'){
            $('#discount-detail-total,#discount-detail-single').addClass('dn');
        }
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#discount-list li', function(){
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        var type = $('#discount-nav li.active').attr('data-type');
        if(type === 'total'){
            $('#discount-detail-single,#discount-detail-self-define').addClass('dn');
            $('#discount-detail-total').removeClass('dn');
        } else if(type === 'single'){
            $('#discount-detail-total,#discount-detail-self-define').addClass('dn');
            $('#discount-detail-single').removeClass('dn');
        } else if(type === 'self-define'){
            $('#discount-detail-single,#discount-detail-total').addClass('dn');
            $('#discount-detail-self-define').removeClass('dn');
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
    //discount-detail-total相关操作 --- BEGIN
    .on('click', '#discount-detail-total h3 i', function(){
        $('#discount-detail-total').addClass('dn');
    })
    .on('click', '#discount-detail-total .bar .delete', function(){
        var courseName = $.trim($('#discount-detail-total h3').text()),
            cid = '1';
        Alert.showConfirm('删除课程[' + courseName + ']后将不能恢复，<br/>确认删除？', function () {
            deleteCourse(cid, function () {
                console.log('删除课程成功！');
            });
        });
    })
    .on('click', '#discount-detail-total .bar .edit', function(){
        $core.nextPage('Admin-DiscountTotalEdit');
    })
    //discount-detail-total相关操作 --- END
    //discount-detail-single相关操作 --- BEGIN
    .on('click', '#discount-detail-single h3 i', function(){
        $('#discount-detail-single').addClass('dn');
    })
    .on('click', '#discount-detail-single .course-list .operate', function(){
        $core.nextPage('Admin-DiscountCourseSet');
    })
    .on('click', '#discount-detail-single .bar .delete', function(){
        var courseName = $.trim($('#discount-detail-single h3').text()),
            cid = '1';
        Alert.showConfirm('删除课程[' + courseName + ']后将不能恢复，<br/>确认删除？', function () {
            deleteCourse(cid, function () {
                console.log('删除课程成功！');
            });
        });
    })
    .on('click', '#discount-detail-single .bar .edit', function(){
        $core.nextPage('Admin-DiscountSingleEdit');
    })
    //discount-detail-single相关操作 --- END
    //discount-detail-self-define相关操作 --- BEGIN
    .on('click', '#discount-detail-self-define h3 i', function(){
        $('#discount-detail-self-define').addClass('dn');
    })
    .on('click', '#discount-detail-self-define .bar .delete', function(){
        var courseName = $.trim($('#discount-detail-single h3').text()),
            cid = '1';
        Alert.showConfirm('删除课程[' + courseName + ']后将不能恢复，<br/>确认删除？', function () {
            deleteCourse(cid, function () {
                console.log('删除课程成功！');
            });
        });
    })
    .on('click', '#discount-detail-self-define .bar .edit', function(){
        $core.nextPage('Admin-DiscountSelfDefineEdit');
    })
    //discount-detail-self-define相关操作 --- END
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
    $core.Ready(function() {
        console.log('discountmgr');
    });
});