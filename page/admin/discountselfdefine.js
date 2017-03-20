/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/29
 * Time: 21:00
 */
require(['YOUKE.Util', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    var checkFunc = {
        schoolName: function() {
            var flag = false,
                $selector = $('#schoolName'),
                schoolName = $selector.val();
            if (!schoolName) {
                Alert.showTips($selector, '请输入校区名称');
            } else {
                flag = true;
                Alert.hideTips();
            }
            return flag;
        },
        total: function() {
            var flag = false,
                $selector = $('#total'),
                total = $selector.val();
            if (!total) {
                Alert.showTips($selector, '请输入折扣最大限额');
            } else if (total <= 0) {
                Alert.showTips($selector, '折扣最大限额必须大于0');
            } else {
                flag = true;
                Alert.hideTips();
            }
            return flag;
        },
        percent: function() {
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

    $(document)
    .on('click', '.top .back', function(){
        $core.nextPage('Admin-DiscountMgr');
    })
    .on('click', '.top .confirm,.bottom .confirm', function(){
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        var item = {};
        createSelfDefineDiscount(item, function() {
            $core.nextPage('Admin-DiscountMgr');
        });
    })
    ;

    function createSelfDefineDiscount(item, cb) {
        $http.post({
            url: 'discount/create',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError();
                }
            },
            error: function() {
                Alert.showError();
            }
        });
    }
    $core.Ready(function() {
        console.log('discountselfdefine');
    });
});