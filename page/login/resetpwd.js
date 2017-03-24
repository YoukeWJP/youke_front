/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/20
 * Time: 11:41
 */
require(['YOUKE.Util', 'YOUKE.Service', 'YOUKE.Parse'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $http = YOUKE.Service;

    var checkFunc = {
        loginName: function() {
            var flag = false,
                loginName = $('#loginName').val(),
                $selector = $('.error-login');
            if (!loginName) {
                $selector.removeClass('dn');
            } else if (!$util.isMobile(loginName)) {
                $selector.removeClass('dn');
            } else {
                flag = true;
                $selector.addClass('dn');
            }
            return flag;
        },
        smsCode: function() {
            var flag = false,
                smsCode = $('#smsCode').val(),
                $selector = $('.error-sms');
            if (!smsCode) {
                $selector.removeClass('dn');
            } else if (!$util.isValidSmsCode(smsCode)) {
                $selector.removeClass('dn');
            } else {
                flag = true;
                $selector.addClass('dn');
            }
            return flag;
        },
        password: function() {
            var flag = false,
                password = $('#password').val(),
                $selector = $('.error-pwd');
            if (!password) {
                $selector.removeClass('dn');
            } else if (!$util.isValidLoginPwd(password)) {
                $selector.removeClass('dn');
            } else {
                flag = true;
                $selector.addClass('dn');
            }
            return flag;
        },
        confirmPassword: function() {
            var flag = false,
                password = $('#password').val(),
                confirmPassword = $('#confirmPassword').val(),
                $selector = $('.error-confirmpwd');
            if (!confirmPassword) {
                $selector.text('请输入密码').removeClass('dn');
            } else if (password !== confirmPassword) {
                $selector.text('两次密码不一致').removeClass('dn');
            } else if (!$util.isValidLoginPwd(confirmPassword)) {
                $selector.text('请填写正确的密码(6到16位)').removeClass('dn');
            } else {
                flag = true;
                $selector.addClass('dn');
            }
            return flag;
        }
    };

    $scope.checkLoginName = checkFunc.loginName;
    $scope.checkSmsCode = checkFunc.smsCode;
    $scope.checkPassword = checkFunc.password;
    $scope.checkConfirmPassword = checkFunc.confirmPassword;

    $scope.sendSmsCode = function() {
        console.log('发送了短信！');
    };
    $scope.resetpwd = function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        $core.nextPage('Login-Login');
    };
    $core.Ready(function() {
        console.log('resetpwd');
    }, 1);
});