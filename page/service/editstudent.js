/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/7
 * Time: 11:15
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    var checkFunc = {
        studentName: function(){
            var flag = false,
                $selector = $('#studentName');
            var studentName = $selector.val().trim();
            if (!studentName.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入会员名');
            } else if (!$util.isWord(studentName)) {
                $selector.addClass('error');
                Alert.showTips($selector, '会员名称不能包含特殊字符');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        studentId: function () {
            var flag = false,
                $selector = $('#studentId');
            var studentId = $selector.val().trim();
            if (!studentId.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入学员卡ID');
            } else if (studentId <= 0 || !$util.isInt(studentId)) {
                $selector.addClass('error');
                Alert.showTips($selector, '学员卡ID只能是正整数');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        sex: function () {
            var flag = false,
                $selector = $('#sex');
            var sex = $selector.find('.active');
            if (!sex.length) {
                Alert.showTips($selector, '请选择性别');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        mobile: function () {
            var flag = false,
                $selector = $('#mobile');
            var mobile = $selector.val().trim();
            if (!mobile.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入手机号码');
            } else if (!$util.isMobile(mobile)) {
                $selector.addClass('error');
                Alert.showTips($selector, '手机号码不合法');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        birthday: function () {
            var flag = false,
                $selector = $('#birthday');
            var birthday = $selector.val().trim();
            if (!birthday.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请选择出生日期');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        email: function () {
            var flag = false,
                $selector = $('#email');
            var email = $selector.val().trim();
            if (!email.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入邮箱');
            } else if (!$util.isEmail(email)) {
                $selector.addClass('error');
                Alert.showTips($selector, '邮箱不合法');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        }
    };
    $(document)
    .on('click', '.top .back', function(){
        window.history.go(-1);
    })
    .on('click', '#sex span', function(){
        $(this).addClass('active').siblings('span').removeClass('active');
    })
    // 输入校验 --- BEGIN
    .on('input', '#studentName', function(){
        checkFunc.studentName();
    })
    .on('input', '#studentId', function(){
        checkFunc.studentId();
    })
    .on('input', '#mobile', function(){
        checkFunc.mobile();
    })
    .on('input', '#email', function(){
        checkFunc.email();
    })
    // 输入校验 --- END
    .on('click', '.bottom .cancel', function(){
        for(var key in checkFunc){
            if(!checkFunc[key]()){
                return;
            }
        }
        var item = {};
        addStudent(item, function () {
            //
        });
    })
    .on('click', '.top .confirm,.bottom .confirm', function(){
        for(var key in checkFunc){
            if(!checkFunc[key]()){
                return;
            }
        }
        var item = {};
        addStudent(item, function () {
            $core.nextPage('Service-Index');
        });
    })
    ;
    //创建新课程
    function addStudent(item, cb) {
        $http.post({
            url : 'course/create',
            data: item,
            success : function (data) {
                if(data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                    $util.isFunction(cb) && cb();
                }
            }
        });
    }
    //初始化日期控件
    function calendarBasicInit() {
        // https://docs.mobiscroll.com/2-17-0/jquery/scroller#usage
        var currYear = new Date().getFullYear();
        $('#birthday').mobiscroll().calendar({
            theme: 'ios', //mobiscroll
            lang: 'zh',
            display: 'modal',
            mode: 'mixed',
            dateFormat: 'yy-mm-dd',
            startYear: 1900, //开始年份
            endYear: 2099, //结束年份
            onClosed: function(valueText, inst) {
                console.log(valueText);
            }
        });
    }
    $core.Ready(function() {
        console.log('editstudent');
        calendarBasicInit();
        $('.footer .detail .first').addClass('active');
    });
});