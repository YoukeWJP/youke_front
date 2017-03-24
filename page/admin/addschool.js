/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/15
 * Time: 22:28
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;
    var checkFunc = {
        schoolName: function() {
            var flag = false,
                $selector = $('#schoolName'),
                value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入校区名称');
            } else if (!$util.isWord(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的校区名称');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        schoolFullName: function() {
            var flag = false,
                $selector = $('#schoolFullName'),
                value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入校区全称');
            } else if (!$util.isWord(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的校区全称');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        url: function() {
            var flag = false,
                $selector = $('#url'),
                value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入网址');
            } else if (!$util.isURL(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的网址');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        phone: function() {
            var flag = false,
                $selector = $('#phone'),
                value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入电话号码');
            } else if (!$util.isPhone(value) && !$util.isMobile(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的电话号码');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        email: function() {
            var flag = false,
                $selector = $('#email'),
                value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入邮箱地址');
            } else if (!$util.isEmail(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的邮箱地址');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        comment: function() {
            var flag = false,
                $selector = $('#comment'),
                value = $selector.val().trim();
            if (value.length > 200) {
                $selector.addClass('error');
                Alert.showTips($selector, '描述不能超过200个字');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        }
    };
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function () {
        $core.nextPage('Admin-SwitchSchool');
    })
    .on('click', '.top .confirm,.bar .confirm', function () {
        for(var key in checkFunc){
            if(!checkFunc[key]()){
                return;
            }
        }
        var item = {};
        addSchool(item, function () {
            $core.nextPage('Admin-SwitchSchool');
        });
    })
    .on('click', '.top .confirm,.bar .cancel', function () {
        for(var key in checkFunc){
            if(!checkFunc[key]()){
                return;
            }
        }
        var item = {};
        addSchool(item, function () {
            //
        });
    })
    //顶部菜单栏相关操作 --- END
    // 输入校验 --- BEGIN
    .on('input', '#schoolName', function(){
        checkFunc.schoolName();
    })
    .on('input', '#schoolFullName', function(){
        checkFunc.schoolFullName();
    })
    .on('input', '#url', function(){
        checkFunc.url();
    })
    .on('input', '#phone', function(){
        checkFunc.phone();
    })
    .on('input', '#email', function(){
        checkFunc.email();
    })
    .on('input', '#comment', function(){
        checkFunc.comment();
    })
    // 输入校验 --- END
    ;

    function addSchool(item, cb) {
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
        console.log('addschool');
    });
});