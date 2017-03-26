/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/18
 * Time: 14:26
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;
    var courseid = $util.getQuery('courseid');
    var checkFunc = {
        courseName: function() {
            var flag = false,
                $selector = $('#courseName');
            var value = $.trim($selector.val());
            if (!value.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入产品名称');
            } else if (!$util.isWord(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '产品名称不能包含特殊字符');
            } else {
                flag = true;
                $selector.removeClass('error');
                Alert.hideTips();
            }
            return flag;
        },
        categoryType: function() {
            var flag = false,
                $selector = $('#category>span');
            var value = $selector.attr('data-categoryid');
            if (value === '' || value == null) {
                $selector.addClass('error');
                Alert.showTips($selector, '请选择产品类型');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        courseType: function() {
            var flag = false,
                $selector = $('#course>span');
            var value = $selector.attr('data-coursetype');
            if (value === '' || value == null) {
                $selector.addClass('error');
                Alert.showTips($selector, '请选择课程类型');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        price: function() {
            var flag = false,
                $selector = $('#price');
            var value = $.trim($selector.val());
            if (!value.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入价格');
            } else if (value < 0) {
                $selector.addClass('error');
                Alert.showTips($selector, '价格不能小于零');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        totalHours: function() {
            if ($('#course>span').attr('data-coursetype')) { //如果是按照有效期
                return true;
            }
            var flag = false,
                $selector = $('#totalHours');
            var value = $.trim($selector.val());
            if (!value.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入总课时');
            } else if (value < 0) {
                $selector.addClass('error');
                Alert.showTips($selector, '总课时不能为负数');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        expirationDate: function() {
            var flag = false,
                $selector = $('#expirationDate');
            var value = $.trim($selector.val());
            if (value.length && value < 0) {
                $selector.addClass('error');
                Alert.showTips($selector, '有效天数不能小于零');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        hoursPerClass: function() {
            if ($('#course>span').attr('data-coursetype')) { //如果是按照有效期
                return true;
            }
            var flag = false,
                $selector = $('#hoursPerClass');
            var value = $.trim($selector.val());
            if (!value.length) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入单课消耗');
            } else if (value < 0) {
                $selector.addClass('error');
                Alert.showTips($selector, '单课消耗不能小于零');
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
            var value = $.trim($selector.val()),
                len = $util.strLenGB(value);
            if (!len) {
                $selector.addClass('error');
                Alert.showTips($selector, '请填写描述');
            } else if (len > 200) {
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
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        $core.nextPage('Admin-MgrCourse');
    })
    //顶部菜单栏相关操作 --- END
    .on('click', '.bottom .cancel', function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        var item = getPostData();
        addCourse(item, function() {
            //
        });
    })
    .on('click', '.top .confirm,.bottom .confirm', function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        var item = getPostData();
        addCourse(item, function() {
            $core.nextPage('Admin-MgrCourse');
        });
    })
    // 输入校验 --- BEGIN
    .on('input', '#courseName', function() {
        checkFunc.courseName();
    })
    .on('input', '#price', function() {
        checkFunc.price();
    })
    .on('input', '#totalHours', function() {
        checkFunc.totalHours();
    })
    .on('input', '#expirationDate', function() {
        checkFunc.expirationDate();
    })
    .on('input', '#hoursPerClass', function() {
        checkFunc.hoursPerClass();
    })
    .on('input', '#description', function() {
        checkFunc.description();
    })
    // 输入校验 --- END
    .on('click', '#category>span', function() {
        $('#category ul').removeClass('dn');
    })
    .on('mouseover', '#category li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#category li', function() {
        var $this = $(this);
        var categoryId = $this.attr('data-categoryid'),
            categoryName = $this.text();
        $('#category>span').attr('data-categoryid', categoryId).text(categoryName).removeClass('error');
        $('#category ul').addClass('dn');
    })
    .on('click', '#course>span', function() {
        $('#course ul').removeClass('dn');
    })
    .on('mouseover', '#course li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#course li', function() {
        var $this = $(this);
        var courseId = $this.attr('data-coursetype'),
            coursetype = $this.text();
        $('#course>span').attr('data-coursetype', courseId).text(coursetype).removeClass('error');
        $('#course ul').addClass('dn');
        if(courseId === '2') {//按有效期
            $('#totalHours,#hoursPerClass').closest('li').addClass('dn');
        } else {
            $('#totalHours,#hoursPerClass').closest('li').removeClass('dn');
        }
    });
    // 获取提交的数据
    function getPostData() {
        var item = {};
        item.courseid = courseid;
        item.course_name = $.trim($('#courseName').val());
        item.categoryid = $('#category span').attr('data-categoryid');
        // course_type 1、按课时 2、按有效期
        item.course_type = $('#course span').attr('data-coursetype');
        item.price = $.trim($('#price').val());
        if (item.course_type == '1') {
            item.total_course_hours = $.trim($('#totalHours').val());
            item.hours_per_unit = $.trim($('#hoursPerClass').val());
        } else {
            item.total_course_hours = '';
            item.hours_per_unit = '';
        }
        item.expiration_days = $.trim($('#expirationDate').val());
        item.description = $.trim($('#description').val());
        return item;
    }

    // 获取类别数据
    function getCategory(cb) {
        $http.get({
            url: 'api/category/lists',
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var result = [],
                        item,
                        tpl = '<li data-categoryid="{#categoryid#}">{#category_name#}</li>';
                    for (var i = 0; i < data.data.length; i++) {
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#categoryid#}': item.categoryid,
                            '{#category_name#}': item.category_name
                        }));
                    }
                    $('#category ul').html(result.join(''));
                }
            },
            complete: function() {
                $util.isFunction(cb) && cb();
            }
        });
    }

    //创建新课程
    function addCourse(item, cb) {
        $http.post({
            url : 'api/course/update',
            data: item,
            success : function (data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError(data.message || '创建新课程失败');
                }
            }
        });
    }
    //获取单节课程详情
    function getCourseDetail(courseid, cb) {
        $http.get({
            url: 'api/course/info/courseid/' + courseid,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data.data);
                } else {
                    Alert.showError(data.message || '获取课程信息失败');
                }

            },
            error: function() {
                Alert.showError();
            }
        });
    }
    $core.Ready(function() {
        getCategory(function() {
            getCourseDetail(courseid, function(data) {
                var course_type = data.course_type;
                if (data.course_type == '1') {//如果是按照课时
                    $('#totalHours,#hoursPerClass').closest('li').removeClass('dn');
                }
                $('#courseName').val(data.course_name);
                $('#category span').attr({
                    'data-categoryid': data.categoryid
                }).text(data.category_name);
                $('#course span').attr({
                    'data-coursetype': course_type
                }).text($comm.CourseType[course_type]);
                $('#price').val(data.price);
                $('#totalHours').val(data.total_course_hours);
                $('#expirationDate').val(data.expiration_days);
                $('#hoursPerClass').val(data.hours_per_unit);
                $('#description').val(data.description);
            });
        });
    });
});