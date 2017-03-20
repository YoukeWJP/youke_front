/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/8/24
 * Time: 13:27
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    // 修改产品分类的校验 --- BEGIN
    var checkUpdate = {
        categoryName : function () {
            var flag = false,
                $selector = $('#mask-edit-category .category-name');
            var categoryName = $selector.val().trim();
            if(!categoryName){
                $selector.addClass('error');
                Alert.showTips($selector, '请输入分类名称');
            } else if(!$util.isWord(categoryName)) {
                $selector.addClass('error');
                Alert.showTips($selector, '分类名称不能包含特殊字符');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        rankScore : function () {
            var flag = false,
                $selector = $('#mask-edit-category .rank');
            var rankScore = $selector.val().trim();
            if(!rankScore.length){
                $selector.addClass('error');
                Alert.showTips($selector, '请输入排序顺序值');
            } else if(rankScore > 10000 || rankScore < -10000) {
                $selector.addClass('error');
                Alert.showTips($selector, '排序顺序值范围-10000~10000');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        }
    };
    // 修改产品分类的校验 --- END
    // 新建产品分类的校验 --- BEGIN
    var checkCreate = {
        categoryName : function () {
            var flag = false,
                $selector = $('#mask-add-category .category-name');
            var categoryName = $selector.val().trim();
            if(!categoryName){
                $selector.addClass('error');
                Alert.showTips($selector, '请输入分类名称');
            } else if(!$util.isWord(categoryName)) {
                $selector.addClass('error');
                Alert.showTips($selector, '分类名称不能包含特殊字符');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        },
        rankScore : function () {
            var flag = false,
                $selector = $('#mask-add-category .rank');
            var rankScore = $selector.val().trim();
            if(!rankScore.length){
                $selector.addClass('error');
                Alert.showTips($selector, '请输入排序顺序值');
            } else if(rankScore > 10000 || rankScore < -10000) {
                $selector.addClass('error');
                Alert.showTips($selector, '排序顺序值范围-10000~10000');
            } else {
                flag = true;
                Alert.hideTips();
                $selector.removeClass('error');
            }
            return flag;
        }
    };
    // 新建产品分类的校验 --- END
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //增加课程分类 --- BEGIN
    .on('click', '#mask-add-category .add i,#mask-add-category .btn-cancel', function() {
        $('#mask-add-category').addClass('dn');
    })
    .on('click', '.sidebar-right li.add', function() {
        var $selector = $('#mask-add-category');
        $selector.find('.category-name').val('');
        $selector.find('.rank').val('');
        $selector.find('.text i').text('');
        $selector.removeClass('dn');
    })
    .on('input', '#mask-add-category .category-name', function() {
        checkCreate.categoryName();
        $('#mask-add-category .text i').text($.trim($(this).val()));
    })
    .on('input', '#mask-add-category .rank', function() {
        checkCreate.rankScore();
    })
    .on('click', '#mask-add-category .color li', function() {
        var $this = $(this),
            $selector = $('#mask-add-category');
        var bgColor = $this.attr('style');
        $selector.find('.text i').attr({
            'style': bgColor
        });
    })
    .on('click', '#mask-add-category .bar .btn-confirm', function() {
        for (var key in checkCreate) {
            if (!checkCreate[key]()) {
                return;
            }
        }
        var $selector = $('#mask-add-category');
        var item = {};
        item.categoryName = $.trim($selector.find('.category-name').val());
        item.rankScore = $.trim($selector.find('.rank').val());
        item.bgcolor = $util.parseStyle($selector.find('.text i').attr('style'))['background'];
        createCategory(item, function() {
            $selector.addClass('dn');
        });
    })
    //增加课程分类 --- END
    //修改课程分类 --- BEGIN
    .on('click', '.main .content li', function() {
        var $this = $(this),
            $selector = $('#mask-edit-category');
        var bgColor = $this.attr('style'),
            categoryName = $this.text();
        $selector.find('.category-name').val(categoryName);
        $selector.find('.text i').attr({
            'style' : bgColor
        }).text(categoryName);
        $selector.removeClass('dn');
    })
    .on('click', '#mask-edit-category .edit i,#mask-edit-category .btn-cancel', function() {
        $('#mask-edit-category').addClass('dn');
    })
    .on('click', '#mask-edit-category .color li', function() {
        var bgColor = $(this).attr('style');
        $('#mask-edit-category .text i').attr('style', bgColor);
    })
    .on('click', '#mask-edit-category .btn-delete', function() {
        var cid = '';
        Alert.showConfirm('确认删除该产品分类吗？', function() {
            deleteCategory(cid, function() {
                $('#mask-edit-category').addClass('dn');
            });
        });
    })
    .on('input', '#mask-edit-category .category-name', function() {
        checkUpdate.categoryName();
        $('#mask-edit-category .text i').text($.trim($(this).val()));
    })
    .on('input', '#mask-edit-category .rank', function() {
        checkUpdate.rankScore();
    })
    .on('click', '#mask-edit-category .btn-confirm', function() {
        for (var key in checkUpdate) {
            if (!checkUpdate[key]()) {
                return;
            }
        }
        var $selector = $('#mask-edit-category');
        var item = {};
        item.categoryName = $.trim($selector.find('.category-name').val());
        item.rankScore = $.trim($selector.find('.rank').val());
        item.bgcolor = $util.parseStyle($selector.find('.text i').attr('style'))['background'];
        updateCategory(item, function() {
            $('#mask-edit-category').addClass('dn');
        });
    })
    //修改课程分类 --- END
    .on('click', '.sidebar-right ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('mouseover', '.sidebar-right ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right li.back', function () {
        $core.nextPage('Admin-MgrCourse');
    });

    // 增加类别
    function createCategory(item, cb) {
        $http.post({
            url: 'category/create',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data.data);
                } else {
                    Alert.showError(data.message || '添加课程类别失败');
                }
            }
        });
    }

    // 获取类别数据
    function getCategory(){
        $http.get({
            url : 'category/list/' + 1,
            success : function (data) {
                if(data.code === $comm.HttpStatus.OK) {
                    var result = [],
                        item,
                        tpl = '<li style="background: {#bgcolor#}">{#categoryName#}</li>';
                    for(var i = 0; i < data.data.length; i++){
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#bgcolor#}' : item.bgcolor || '#187EAD',
                            '{#categoryName#}' : item.categoryName
                        }));
                    }
                    $('#categoryList').html(result.join(''));
                }
            }
        });
    }

    // 删除类别
    function deleteCategory(cid, cb){
        $http.post({
            url: 'category/archive',
            data: {
                cid : cid
            },
            success: function (data) {
                if(data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                } else {
                    Alert.showError();
                }
                $util.isFunction(cb) && cb();
            },
            error : function () {
                Alert.showError();
            }
        });
    }

    // 更新类别数据
    function updateCategory(item, cb) {
        $http.post({
            url: 'category/update',
            data: item,
            success: function (data) {
                if(data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                } else {
                    Alert.showError();
                }
                $util.isFunction(cb) && cb();
            },
            error : function () {
                Alert.showError();
            }
        });
    }
    $core.Ready(function() {
        console.log('mgrcategory');
        getCategory();
    });
});