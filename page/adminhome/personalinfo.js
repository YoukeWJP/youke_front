/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/20
 * Time: 18:41
 */
require(['YOUKE.Util', 'YOUKE.Parse', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    var checkFunc = {
        oldPassword: function() {
            var flag = false,
                $selector = $('#oldPassword'),
                oldPassword = $selector.val();
            if (!oldPassword) {
                Alert.showTips($selector, '请输入旧密码');
                $selector.addClass('error');
            } else if (!$util.isValidLoginPwd(oldPassword)) {
                Alert.showTips($selector, '请填写正确的密码(6到16位)');
                $selector.addClass('error');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        newPassword: function() {
            var flag = false,
                $selector = $('#newPassword'),
                newPassword = $selector.val();
            if (!newPassword) {
                Alert.showTips($selector, '请输入新密码');
                $selector.addClass('error');
            } else if (!$util.isValidLoginPwd(newPassword)) {
                Alert.showTips($selector, '请填写正确的密码(6到16位)');
                $selector.addClass('error');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        newConfirmPassword: function() {
            var flag = false,
                newPassword = $('#newPassword').val(),
                $selector = $('#newConfirmPassword'),
                newConfirmPassword = $selector.val();
            if (!newConfirmPassword) {
                Alert.showTips($selector, '请输入新密码');
                $selector.addClass('error');
            } else if (newPassword !== newConfirmPassword) {
                Alert.showTips($selector, '两次输入的密码不一致');
                $selector.addClass('error');
            } else if (!$util.isValidLoginPwd(newConfirmPassword)) {
                Alert.showTips($selector, '请填写正确的密码(6到16位)');
                $selector.addClass('error');
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
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //左侧菜单相关操作 --- BEGIN
    .on('click', '#person-info .home', function() {
        $core.nextPage('Admin-Index');
    })
    .on('mouseover', '#person-info li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#person-info li.about', function() {
        $core.nextPage('Admin-Home-About');
    })
    //左侧菜单相关操作 --- END
    //中间部分相关操作 --- BEGIN
    .on('click', '.main .login .second', function() {
        $('.modify-pwd').removeClass('dn');
    })
    .on('change', '#uploadfile', function() {
        console.log('上传了文件！');
    })
    //中间部分相关操作 --- END
    //弹框部分相关操作 --- BEGIN
    .on('click', '.modify-pwd h3 i', function() {
        $('.modify-pwd').addClass('dn');
    })
    .on('click', '.modify-pwd .btn-confirm', function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        $('.modify-pwd').addClass('dn');
    })
    //弹框部分相关操作 --- END
    ;

    $scope.checkOldPassword = checkFunc.oldPassword;
    $scope.checkNewPassword = checkFunc.newPassword;
    $scope.checkNewConfirmPassword = checkFunc.newConfirmPassword;
    $core.Ready(function() {
        console.log('personalinfo');
    });
});