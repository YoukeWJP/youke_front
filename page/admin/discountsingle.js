/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/29
 * Time: 21:01
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    var checkFunc = {
        discountName: function() {
            var flag = false,
                $selector = $('#discountName'),
                discountName = $selector.val();
            if (!discountName) {
                Alert.showTips($selector, '请输入折扣名称');
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
        }
    };

    //校验单项课程折扣中表格的折扣
    var checkTableDiscountFunc = function () {
        var flag = true;
        var $selector = $('#mask-course .table input');
        for (var i = 0; i < $selector.length; i++) {
            var item = $($selector[i]);
            var text = item.val();
            if (!text) {
                flag = false;
                Alert.showTips(item, '请输入折扣');
                return flag;
            } else if (text > 100 || text < 0) {
                flag = false;
                Alert.showTips(item, '折扣范围0~100');
                return flag;
            } else {
                flag = true;
                Alert.hideTips();
            }
        }
        return flag;
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
        createSingleDiscount(item, function() {
            $core.nextPage('Admin-DiscountMgr');
        });
    })
    .on('click', '.course-list i', function(){
        $('#mask-course').removeClass('dn');
    })
    // mask-course --- BEGIN
    .on('click', '#mask-course h3 i', function(){
        $('#mask-course').addClass('dn');
    })
    .on('click', '#mask-course p.add', function(){
        $('#mask-course-discount').removeClass('dn');
    })
    .on('click', '#mask-course .table i', function(){
        var $this = $(this);
        $this.closest('tr').remove();
    })
    .on('click', '#mask-course .btn-confirm', function(){
        if (!checkTableDiscountFunc()) {
            return;
        }
        $('#mask-course').addClass('dn');
    })
    // mask-course --- END
    // mask-course-discount --- BEGIN
    .on('click', '#mask-course-discount .table i', function(){
        var $this = $(this);
        $this.toggleClass('checked');
        var idList = [],
            nameList = [];
        var obj = getSelectedCourse();
        for(var key in obj){
            idList.push(key);
            nameList.push(obj[key]);
        }
        $('#mask-course-discount .selected span').text(nameList.join('、'));
    })
    .on('click', '#mask-course-discount h3 i,#mask-course-discount .bar .btn-cancel', function(){
        $('#mask-course-discount').addClass('dn');
    })
    .on('click', '#mask-course-discount .bar .btn-confirm', function(){
        //TODO
        //这里需要做添加的动作
        $('#mask-course-discount').addClass('dn');
    })
    // mask-course-discount --- END
    ;

    //获取选中项的课程列表
    function getSelectedCourse(){
        var result = {},
            $selector = $('#mask-course-discount .table i.checked');
        [].forEach.call($selector, function(item, index){
            var $tr = item = $(item).closest('tr');
            var id = $tr.attr('data-id'),
                name = $.trim($tr.find('td:first-child').text());
            result[id] = name;
        });
        return result;
    }

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

    function createSingleDiscount(item, cb) {
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
        console.log('discountsingle');
        calendarBasicInitBegin();
        calendarBasicInitEnd();
    });
});