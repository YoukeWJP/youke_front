/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/29
 * Time: 21:01
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    var checkFunc = {
        discountName: function () {
            var flag = false,
                $selector = $('#discountName'),
                discountName = $selector.val();
            if (!discountName) {
                Alert.showTips($selector, '请输入折扣名称');
            } else if (!$util.isWord(discountName)) {
                Alert.showTips($selector, '折扣名称不能包含特殊字符');
            } else {
                flag = true;
                Alert.hideTips();
            }
            return flag;
        },
        beginDate: function() {
            var flag = false,
                $selector = $('#beginDate'),
                beginDate = $selector.val();
            if (!beginDate) {
                Alert.showTips($selector, '请选择开始日期');
            } else {
                flag = true;
                Alert.hideTips();
            }
            return flag;
        },
        endDate: function() {
            var flag = false,
                beginDate = $('#beginDate').val(),
                $selector = $('#endDate'),
                endDate = $selector.val();
            if (!endDate) {
                Alert.showTips($selector, '请选择结束日期');
            } else if (beginDate) {
                if (new Date(beginDate).getTime() > new Date(endDate).getTime()) {
                    Alert.showTips($selector, '结束日期不能早于开始日期');
                } else {
                    flag = true;
                    Alert.hideTips();
                }
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
                Alert.showTips($selector, '请输入总金额');
            } else if (total <= 0) {
                Alert.showTips($selector, '总金额必须大于0');
            } else {
                flag = true;
                Alert.hideTips();
            }
            return flag;
        },
        amount: function() {
            var flag = false,
                $selector = $('#amount'),
                amount = $selector.val();
            var $parent = $('.mode>a.active');
            if ($parent.hasClass('first')) {
                flag = true;
                Alert.hideTips();
            } else if ($parent.hasClass('second')) {
                if (!amount) {
                    Alert.showTips($selector, '请输入返现额度');
                } else if (amount <= 0) {
                    Alert.showTips($selector, '返现额度金额必须大于0');
                } else {
                    flag = true;
                    Alert.hideTips();
                }
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
        createTotalDiscount(item, function() {
            $core.nextPage('Admin-DiscountMgr');
        });
    })
    .on('click', '.mode .first,.mode .second', function(){
        var $this = $(this);
        if ($this.hasClass('first')) {
            $this.addClass('active').children('i').addClass('checked');
            $this.siblings('a').removeClass('active').children('i').removeClass('checked');
            $this.siblings('a').find('p').addClass('dn');
        } else if ($this.hasClass('second')) {
            $this.addClass('active').children('i').addClass('checked');
            $this.siblings('a').removeClass('active').children('i').removeClass('checked');
            $this.children('p').removeClass('dn');
        }
    })
    ;

    //初始化日期控件
    function calendarBasicInitBegin() {
        // https://docs.mobiscroll.com/2-17-0/jquery/scroller#usage
        var currYear = new Date().getFullYear();
        $('#beginDate').mobiscroll().calendar({
            theme: 'ios', //mobiscroll
            lang: 'zh',
            display: 'modal',
            mode: 'mixed',
            dateOrder: 'yymmdd',
            dateFormat: 'yy-mm-dd',
            defaultValue: $('#endDate').val() ? new Date($('#endDate').val()) : new Date(),
            startYear: 2000, //开始年份
            endYear: currYear + 10, //结束年份
            onClosed: function(valueText, inst) {
                console.log(valueText);
                console.log(inst);
                calendarBasicInitEnd();
            }
        });
    }

    //初始化日期控件
    function calendarBasicInitEnd() {
        // https://docs.mobiscroll.com/2-17-0/jquery/scroller#usage
        var currYear = new Date().getFullYear();
        $('#endDate').mobiscroll().calendar({
            theme: 'ios', //mobiscroll
            lang: 'zh',
            display: 'modal',
            mode: 'mixed',
            dateOrder: 'yymmdd',
            dateFormat: 'yy-mm-dd',
            defaultValue: $('#beginDate').val() ? new Date($('#beginDate').val()) : new Date(),
            startYear: 2000, //开始年份
            endYear: currYear + 10, //结束年份
            onClosed: function(valueText, inst) {
                console.log(valueText);
                console.log(inst);
                calendarBasicInitBegin();
            }
        });
    }

    function createTotalDiscount(item, cb) {
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
        console.log('discounttotaledit');
        calendarBasicInitBegin();
        calendarBasicInitEnd();
    });
});