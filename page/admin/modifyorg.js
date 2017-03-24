/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/10
 * Time: 16:20
 */
require(['YOUKE.Util', 'YOUKE.Parse', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $parse = YOUKE.Parse,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;
    var userInfo = JSON.parse(localStorage.getItem('ykUserInfo')) || {};
    var currentCampusId = userInfo.campusid;//当前校区ID

    var checkFunc = {
        shortname: function() {
            var flag = false,
                $selector = $('#shortname');
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
        name: function() {
            var flag = false,
                $selector = $('#name');
            var value = $selector.val().trim();
            if (!value) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入校区全称');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        website: function() {
            var flag = false,
                $selector = $('#website');
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
        phone: function() {
            var flag = false,
                $selector = $('#phone');
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
        description: function() {
            var flag = false,
                $selector = $('#description');
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
        updateCampusInfo(function() {
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
    // 获取机构数据
    function getCampusInfo() {
        $http.post({
            url: 'api/campus/info/campusid/' + currentCampusId,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var item = data.data;
                    currentCampusId = item.campusid;
                    $parse.sync(item);
                }
            }
        });
    }
    //修改机构信息
    function updateCampusInfo(cb) {
        $http.post({
            url: 'api/campus/update',
            data: {
                campusid : currentCampusId,
                name : $.trim($('#name').val()),
                shortname : $.trim($('#shortname').val()),
                website : $.trim($('#website').val()),
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                description : $.trim($('#description').val())
            },
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
        getCampusInfo();
    });
});