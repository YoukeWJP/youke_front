/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/18
 * Time: 14:26
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
        courseName: function() {
            var flag = false,
                $selector = $('#courseName');
            var value = $selector.val().trim();
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
            var value = $selector.val().trim();
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
            var flag = false,
                $selector = $('#totalHours');
            var value = $selector.val().trim();
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
            var value = $selector.val().trim();
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
            var flag = false,
                $selector = $('#hoursPerClass');
            var value = $selector.val().trim();
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
        comment: function() {
            var flag = false,
                $selector = $('#comment');
            var value = $selector.val().trim();
            if (!$util.strLenGB(value)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请填写描述');
            } else if (value > 200) {
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
        var item = {};
        createCourse(item, function() {
            //
        });
    }).on('click', '.top .confirm,.bottom .confirm', function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        var item = {};
        createCourse(item, function() {
            $core.nextPage('Admin-MgrCourse');
        });
    })
    // 输入校验 --- BEGIN
    .on('input', '#courseName', function() {
        checkFunc.courseName();
    }).on('input', '#price', function() {
        checkFunc.price();
    }).on('input', '#totalHours', function() {
        checkFunc.totalHours();
    }).on('input', '#expirationDate', function() {
        checkFunc.expirationDate();
    }).on('input', '#hoursPerClass', function() {
        checkFunc.hoursPerClass();
    }).on('input', '#comment', function() {
        checkFunc.comment();
    })
    // 输入校验 --- END
    .on('click', '#category>span', function() {
        $('#category ul').removeClass('dn');
    }).on('mouseover', '#category li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    }).on('click', '#category li', function() {
        var $this = $(this);
        var categoryId = $this.attr('data-categoryid'),
            categoryName = $this.text();
        $('#category>span').attr('data-categoryid', categoryId).text(categoryName).removeClass('error');
        $('#category ul').addClass('dn');
    }).on('click', '#course>span', function() {
        $('#course ul').removeClass('dn');
    }).on('mouseover', '#course li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    }).on('click', '#course li', function() {
        var $this = $(this);
        var courseId = $this.attr('data-coursetype'),
            coursetype = $this.text();
        $('#course>span').attr('data-coursetype', courseId).text(coursetype).removeClass('error');
        $('#course ul').addClass('dn');
    });
    // 获取类别数据
    function getCategory() {
        $http.get({
            url: 'category/list/' + CONST.cid,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var result = [],
                        item,
                        tpl = '<li data-categoryid="{#categoryId#}">{#categoryName#}</li>';
                    for (var i = 0; i < data.data.length; i++) {
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#categoryId#}': item.categoryId,
                            '{#categoryName#}': item.categoryName
                        }));
                    }
                    $('#category ul').html(result.join(''));
                }
            }
        });
    }

    function createCourse(item, cb) {
        $http.post({
            url: 'course/create',
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
        console.log('addcourse');
        getCategory();
    });
});