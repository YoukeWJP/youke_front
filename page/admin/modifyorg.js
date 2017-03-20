/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/10
 * Time: 16:20
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;
    var CONST = {
        cid: 1 //$util.getQuery('cid')
    };
    var checkFunc = {
        school: function() {
            var flag = false,
                $selector = $('#school');
            var value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入校区名称');
            } else if (!$util.isWord(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '校区名称不能包含特殊字符');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        org: function() {
            var flag = false,
                $selector = $('#org');
            var value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入机构全称');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        url: function() {
            var flag = false,
                $selector = $('#url');
            var value = $selector.val().trim();
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
        mobile: function() {
            var flag = false,
                $selector = $('#mobile');
            var value = $selector.val().trim();
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
                $selector = $('#email');
            var value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入邮箱');
            } else if (!$util.isEmail(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的邮箱');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        desc: function() {
            var flag = false,
                $selector = $('#desc');
            var value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请填写描述');
            } else if (value.length > 200) {
                $selector.addClass('error');
                Alert.showTips($selector, '描述不能超过200个字符');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        }
    };
    $(document).on('click', '.top .back,.bottom .cancel', function() {
        $core.nextPage('Admin-Org');
    }).on('click', '.top .confirm,.bottom .confirm', function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        var item = {};
        modifyOrg(item, function() {
            $core.nextPage('Admin-Org');
        });
    })
    // 输入校验 --- BEGIN
    .on('input', '#school', function() {
        checkFunc.school();
    }).on('input', '#org', function() {
        checkFunc.org();
    }).on('input', '#url', function() {
        checkFunc.url();
    }).on('input', '#mobile', function() {
        checkFunc.mobile();
    }).on('input', '#email', function() {
        checkFunc.email();
    }).on('input', '#desc', function() {
        checkFunc.desc();
    })
    // 输入校验 --- END
    ;
    // 获取类别数据
    function getOrgInfo() {
        $http.get({
            url: 'org/list/' + CONST.cid,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var info = data.data;
                    $('#school').val(info.school);
                    $('#org').val(info.org);
                    $('#url').val(info.url);
                    $('#mobile').val(info.mobile);
                    $('#email').val(info.email);
                    $('#desc').val(info.desc);
                }
            }
        });
    }
    //创建新课程
    function modifyOrg(item, cb) {
        $http.post({
            url: 'org/update',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                    $util.isFunction(cb) && cb();
                }
            }
        });
    }
    $core.Ready(function() {
        console.log('modifyorg');
        getOrgInfo();
    });
});