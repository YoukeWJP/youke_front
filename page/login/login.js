/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/20
 * Time: 10:27
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Widget.Alert', 'YOUKE.Service', 'YOUKE.Parse', 'YOUKE.Service'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $comm = YOUKE.Comm,
        $http = YOUKE.Service;

    var checkFunc = {
        username: function() {
            var flag = false,
                username = $('#username').val(),
                $selector = $('.error-login');
            if (!username) {
                $selector.removeClass('dn');
            } else if (!$util.isMobile(username)) {
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
        }
    };

    $scope.checkUsername = checkFunc.username;
    $scope.checkPassword = checkFunc.password;

    $scope.autoLogin = function(e) {
        var el = e.srcElement || e.target;
        $(el).toggleClass('checked');
    };
    $scope.resetpwd = function() {
        $core.nextPage('Login-Resetpwd');
    };
    $scope.login = function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        login(function(data) {
            var role = data.role;
            if (role === $comm.Role.principal || role === $comm.Role.admin) { //校长或管理员
                $core.nextPage('Admin-Index');
            } else if (role === $comm.Role.instructor) { //教员，前台小妹
                $core.nextPage('Service-Index');
            } else {
                Alert.showError(data.message || '无法获取用户权限');
            }
        });
    };
    $scope.register = function() {
        $core.nextPage('Login-Register');
    };

    //登录功能
    function login(cb) {
        $http.post({
            url: 'api/auth/login',
            data: {
                username: $.trim($('#username').val()),
                password: $('#password').val()
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    localStorage.setItem('ykUserInfo', JSON.stringify(data.data));
                    $util.isFunction(cb) && cb(data.data);
                } else {
                    Alert.showError(data.message || '登录失败');
                }
            },
            error: function() {
                Alert.showError('登录失败');
            }
        });
    }

    $(document)
    .on('keydown', function(e) { //按回车键登录
        if ($util.getKeyCode(e) === 13) {
            $scope.login();
        }
    })
    ;

    $core.Ready(function() {
        localStorage.clear();
        console.log('login');
    });
});