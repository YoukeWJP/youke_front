/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/19
 * Time: 10:34
 */
require(['YOUKE.Util', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    // 停课校验
    var checkStopCourse = {
        amount: function() {
            var flag = false,
                $selector = $('#mask-course-stop [name="amount"]');
            var amount = $.trim($selector.val());
            if (!amount.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入退款金额');
            } else if (!isFinite(amount)) {
                $selector.addClass('error');
                Alert.showTips($selector, '减少的课时必须为数字');
            } else if (amount <= 0) {
                $selector.addClass('error');
                Alert.showTips($selector, '减少的课时必须大于0');
            } else if (!$util.isInt(amount)) {
                $selector.addClass('error');
                Alert.showTips($selector, '减少的课时必须为整数');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        comment: function() {
            var flag = false,
                $selector = $('#mask-course-stop [name="comment"]');
            var comment = $.trim($selector.val());
            if (!comment.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '说明不能为空');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        }
    };
    // 扣费校验
    var checkReduce = {
        amount: function() {
            var flag = false,
                $selector = $('#mask-course-reduce [name="amount"]');
            var amount = $.trim($selector.val());
            if (!amount.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入减少的课时');
            } else if (!isFinite(amount)) {
                $selector.addClass('error');
                Alert.showTips($selector, '减少的课时必须为数字');
            } else if (amount <= 0) {
                $selector.addClass('error');
                Alert.showTips($selector, '减少的课时必须大于0');
            } else if (!$util.isInt(amount)) {
                $selector.addClass('error');
                Alert.showTips($selector, '减少的课时必须为整数');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        comment: function() {
            var flag = false,
                $selector = $('#mask-course-reduce [name="comment"]');
            var comment = $.trim($selector.val());
            if (!comment.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '说明不能为空');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
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
    //中间列表相关操作 --- BEGIN
    .on('mouseover', '#student-birthday .content li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#student-birthday .nav li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#student-birthday .content li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        $('#sidebar-right-list,#signin-list,#course-detail').addClass('dn');
        $('#sidebar-right-student-detail').removeClass('dn');
    })
    //中间列表相关操作 --- END
    //右侧菜单栏相关操作 --- BEGIN
    .on('mouseover', '#sidebar-right-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#sidebar-right-list .first', function() {
        $core.nextPage('Admin-IndexStudent');
    })
    .on('click', '#sidebar-right-list .second', function() {
        $core.nextPage('Admin-MgrStudent');
    })
    //右侧菜单栏相关操作 --- END
    //生日详情相关操作 --- BEGIN
    .on('click', '#sidebar-right-student-detail .title i,#sidebar-right-student-detail .title label', function() {
        $('#sidebar-right-student-detail,#signin-list,#course-detail').addClass('dn');
        $('#sidebar-right-list').removeClass('dn');
    })
    .on('click', '#sidebar-right-student-detail .slide', function() {
        var $this = $(this);
        $this.toggleClass('up').toggleClass('down');
        if($this.hasClass('up')) {
            $('.student-info .detail').removeClass('dn');
        } else if($this.hasClass('down')){
            $('.student-info .detail').addClass('dn');
        }
    })
    .on('click', '#sidebar-right-student-detail .btn-buy', function() {
        $core.nextPage('Admin-BuyNew');
    })
    //生日详情相关操作 --- END
    .on('click', '#sidebar-right-student-detail .content .remark i', function() {
        var $selector = $(this).closest('h3').siblings('.detail');
        var remark = $selector.text();
        Alert.showText(remark, function(msg) {
            $selector.text(msg);
            $('#sidebar-right-student-detail .student-info [data-type="remark"] span').text(msg);
        });
    })
    .on('click', '#signin-list .title label', function() {
        $('#signin-list').addClass('dn');
    })
    //签到按钮
    .on('click', '#sidebar-right-student-detail .content .btn-signin span', function() {
        $('#mask-course-signin').removeClass('dn');
    })
    .on('click', '#mask-course-signin .dialog h3 i', function() {
        $('#mask-course-signin').addClass('dn');
    })
    .on('click', '#mask-course-signin li', function() {
        var $this = $(this);
        var content = $this.text();
        $this.addClass('active').siblings('li').removeClass('active');
        if (!$this.hasClass('self-define')) {
            Alert.showConfirm('签到确认', '签到内容<br/>课程名称：' + content, function() {
                //TODO
            });
        }
    })
    //签到详情
    .on('click', '#sidebar-right-student-detail .content .signin', function() {
        $('#course-detail').addClass('dn');
        $('#signin-list').removeClass('dn');
    })
    .on('click', '#course-detail .title label', function() {
        $('#course-detail').addClass('dn');
    })
    .on('click', '#sidebar-right-student-detail .content .course-info', function() {
        $('#signin-list').addClass('dn');
        $('#course-detail').removeClass('dn');
    })
    .on('click', '#course-detail .operate span', function() {
        var $this = $(this);
        $this.addClass('active').siblings('span').removeClass('active');
        if ($this.hasClass('first')) {
            //TODO
            $core.nextPage('Service-BuyNew');
        } else if ($this.hasClass('second')) {
            $('#mask-course-reduce').removeClass('dn');
        } else if ($this.hasClass('third')) {
            $('#mask-course-stop').removeClass('dn');
        }
    })
    // 课程扣费
    .on('click', '#mask-course-reduce .dialog h3 i', function() {
        $('#mask-course-reduce').addClass('dn');
    })
    .on('click', '#mask-course-reduce .btn-confirm', function() {
        for (var key in checkReduce) {
            if (!checkReduce[key]()) {
                return;
            }
        }
        $('#mask-course-reduce').addClass('dn');
    })
    // 课程停课
    .on('click', '#mask-course-stop .dialog h3 i', function() {
        $('#mask-course-stop').addClass('dn');
    })
    .on('click', '#mask-course-stop .btn-confirm', function() {
        for (var key in checkStopCourse) {
            if (!checkStopCourse[key]()) {
                return;
            }
        }
        $('#mask-course-stop').addClass('dn');
    })
    .on('click', '#mask-course-stop .pay span', function(e) {
        $util.stop(e);
        var $this = $(this);
        $this.siblings('ul').removeClass('dn');
    })
    .on('mouseover', '#mask-course-stop .pay li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#mask-course-stop .pay li', function() {
        var $this = $(this);
        var text = $this.text();
        $this.closest('ul').addClass('dn');
        $('#mask-course-stop .pay span').text(text);
    })
    .on('click', function() {
        $('#mask-course-stop .pay ul').addClass('dn');
    })
    ;

    $core.Ready(function() {
        console.log('birthstudent');
    });
});