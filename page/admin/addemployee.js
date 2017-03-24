/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/20
 * Time: 14:26
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;
    var checkFunc = {
        mobile : function () {
            var flag = false,
                $selector = $('#mobile'),
                value = $selector.val().trim();
            if(!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入手机号');
            } else if(!$util.isMobile(value)){
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的手机号');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        password : function () {
            var flag = false,
                $selector = $('#password'),
                value = $selector.val().trim();
            if(!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入初始密码');
            } else if(!$util.isValidLoginPwd(value)){
                $selector.addClass('error');
                Alert.showTips($selector, '初始密码不合法');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        name : function () {
            var flag = false,
                $selector = $('#name'),
                value = $selector.val().trim();
            if(!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入员工姓名');
            } else if(!$util.isWord(value)){
                $selector.addClass('error');
                Alert.showTips($selector, '员工姓名不能包含特殊字符');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        authority : function () {
            var flag = false,
                $selector = $('#authority>input'),
                value = $selector.val().trim();
            if(!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请选择岗位权限');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        }
    };
    $(document)
    .on('click', function () {
        $('#authority ul').addClass('dn');
    })
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function () {
        $core.nextPage('Admin-MgrEmployee');
    })
    .on('click', '.top .confirm,.bar .confirm', function () {
        for(var key in checkFunc){
            if(!checkFunc[key]()){
                return;
            }
        }
        var item = {};
        addEmployee(item, function () {
            $core.nextPage('Admin-MgrEmployee');
        });
    })
    .on('click', '.top .confirm,.bar .cancel', function () {
        for(var key in checkFunc){
            if(!checkFunc[key]()){
                return;
            }
        }
        var item = {};
        addEmployee(item, function () {
        //
        });
    })
    //顶部菜单栏相关操作 --- END
    // 输入校验 --- BEGIN
    .on('input', '#mobile', function(){
        checkFunc.mobile();
    })
    .on('input', '#password', function(){
        checkFunc.password();
    })
    .on('input', '#name', function(){
        checkFunc.name();
    })
    // 输入校验 --- END
    .on('click', '#sex>span', function () {
        var $this = $(this);
        $this.addClass('active').siblings('span').removeClass('active');
    })
    // 岗位权限 --- BEGIN
    .on('click', '#authority>input', function (e) {
        $util.stop(e);
        $('#authority ul').removeClass('dn');
    })
    .on('mouseover', '#authority li', function () {
        var $this = $(this);
        var text = $this.text();
        $this.addClass('active').siblings('li').removeClass('active');
        $('#authority>input').attr('placeholder', text);
    })
    .on('click', '#authority li', function (e) {
        $util.stop(e);
        var $this = $(this);
        var text = $this.text(),
            posid = $this.attr('data-posid');
        $('#authority>input').attr('data-posid', posid).val(text);
        $this.closest('ul').addClass('dn');
    })
    // 岗位权限 --- END
    ;

    function addEmployee(item, cb) {
        $http.post({
            url: '',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb();
                }
            }
        });
    }
    $core.Ready(function() {
        console.log('addemployee');
    });
});