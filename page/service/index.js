/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/7
 * Time: 10:49
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
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
    $('body').on('click', '#footer .detail .first', function (e) {
        $util.stop(e);
        $(this).addClass('active').siblings('.item').removeClass('active');
    });

    $(document)
    .on('click', '#add-new', function() {
        $core.nextPage('Service-AddStudent');
    })
    .on('click', '#btn-search', function() {
        getStudentInfo(function(){
            //TODO
        });
    })
    // 学员详情 --- BEGIN
    .on('click', '#student-list li', function() {
        $('#sidebar-student-list').addClass('dn');
        $('#sidebar-student-detail').removeClass('dn');
    })
    .on('click', '#sidebar-student-detail .slide', function() {
        var $this = $(this);
        if ($this.hasClass('up')) {
            $this.removeClass('up').addClass('down');
            $('#sidebar-student-detail .student-info .detail').addClass('dn');
        } else if ($this.hasClass('down')) {
            $this.removeClass('down').addClass('up');
            $('#sidebar-student-detail .student-info .detail').removeClass('dn');
        }
    })
    .on('click', '#sidebar-student-detail .title span', function() {
        $('#sidebar-student-detail').addClass('dn');
        $('#signin-list').addClass('dn');
        $('#course-detail').addClass('dn');
        $('#sidebar-student-list').removeClass('dn');
    })
    //课程详情
    .on('click', '#sidebar-student-detail .content .course-info', function() {
        $('#signin-list').addClass('dn');
        $('#course-detail').removeClass('dn');
    })
    //备注
    .on('click', '#sidebar-student-detail .content .remark i', function() {
        var $selector = $(this).closest('h3').siblings('.detail');
        var remark = $selector.text();
        Alert.showText(remark, function(msg) {
            $selector.text(msg);
            $('#sidebar-student-detail .student-info [data-type="remark"] span').text(msg);
        });
    })
    //签到按钮
    .on('click', '#sidebar-student-detail .content .btn-signin span', function() {
        $('#mask-course-signin').removeClass('dn');
    })
    //签到详情
    .on('click', '#sidebar-student-detail .content .signin', function() {
        $('#course-detail').addClass('dn');
        $('#signin-list').removeClass('dn');
    })
    .on('click', '#sidebar-student-detail .btn-buy', function() {
        $core.nextPage('Service-BuyNew');
    })
    .on('click', '#signin-list .title label', function() {
        $('#signin-list').addClass('dn');
    })
    .on('click', '#course-detail .title label', function() {
        $('#course-detail').addClass('dn');
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
    .on('click', '#mask-course-signin .dialog h3 i', function() {
        $('#mask-course-signin').addClass('dn');
    })
    .on('click', '#mask-course-signin li', function() {
        var $this = $(this);
        var content = $this.text();
        $this.addClass('active').siblings('li').removeClass('active');
        if (!$this.hasClass('self-define')) {
            Alert.showConfirm('签到确认', '签到内容<br/>课程名称：' + content, function() {
                $('#mask-course-signin,#sidebar-student-detail,#student-list').addClass('dn');
                $('#sidebar-student-list,#add-new').removeClass('dn');
            });
        }
    })
    // 学员详情 --- END
    .on('keydown', function(e) {
        if ($util.getKeyCode(e) === 13) { //按了回车键
            $('#btn-search').trigger('click');
        }
    })
    ;

    function getStudentInfo(cb) {
        $http.get({
            url: 'getStudentInfo',
            data: {
                id: $.trim($('#condition').val())
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    if (data.data.length) {
                        $util.isFunction(cb) && cb(data.data);
                    } else {
                        $('#student-list').addClass('dn');
                        $('#add-new').removeClass('dn');
                    }
                } else {
                    Alert.showError();
                }
            },
            error: function() {
                Alert.showError();
                //TODO 这里最后要删掉 --- BEGIN
                $('#add-new').addClass('dn');
                $('#student-list').removeClass('dn');
                //TODO 这里最后要删掉 --- END
            }
        });
    }

    // 根据查询到的数据，填充ul
    function generateStudentList(list){
        var tpl = '<li>'
                +      '<h3 class="title">'
                +            'ID&nbsp;:&nbsp;'
                +            '<span class="id">{#id#}</span>'
                +      '</h3>'
                +      '<div class="info">'
                +          '<p class="name">学员名</p>'
                +          '<p class="sex woman">男</p>'
                +          '<p class="phone">'
                +               '<span>电话：</span>'
                +               '<span class="num">13800138000</span>'
                +          '</p>'
                +      '</div>'
                + '</li>';
        var item,
            result = [];
        for (var i = 0, len = list.length; i < len; i++) {
            item = list[i];
            result.push($util.strReplace(tpl, {
                '{#id#}': item.id
            }));
        }
        $('#student-list').html(result.join(''));
    }

    $core.Ready(function() {
        console.log('index');
        $('.footer .detail .first').addClass('active');
    });
});