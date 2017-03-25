/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/8/24
 * Time: 13:27
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

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
        item.category_name = $.trim($selector.find('.category-name').val());
        item.listorder = $.trim($selector.find('.rank').val());
        item.bgcolor = $util.parseStyle($selector.find('.text i').attr('style'))['background'];
        addOrUpdateCategory(item, function() {
            $selector.addClass('dn');
            getCategoryList();
        });
    })
    //增加课程分类 --- END
    //修改课程分类 --- BEGIN
    .on('click', '.main .content li', function() {
        var $this = $(this),
            $selector = $('#mask-edit-category');
        var bgColor = $this.attr('style'),
            categoryName = $this.text(),
            categoryid = $this.attr('data-categoryid'),
            listorder = $this.attr('data-listorder');
        $selector.find('.category-name').val(categoryName);
        $selector.find('.categoryid').val(categoryid);
        $selector.find('.rank').val(listorder);
        $selector.find('.text i').attr({
            'style': bgColor
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
        var categoryid = $.trim($('#mask-edit-category .categoryid').val());
        Alert.showConfirm('确认删除该产品分类吗？', function() {
            deleteCategory(categoryid, function() {
                $('#mask-edit-category').addClass('dn');
                getCategoryList();
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
        item.categoryid = $.trim($selector.find('.categoryid').val());
        item.category_name = $.trim($selector.find('.category-name').val());
        item.listorder = $.trim($selector.find('.rank').val());
        item.description = '';
        item.bgcolor = $util.parseStyle($selector.find('.text i').attr('style'))['background'];
        addOrUpdateCategory(item, function() {
            $('#mask-edit-category').addClass('dn');
            getCategoryList();
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

    // 获取类别数据
    function getCategoryList(){
        $http.post({
            url: 'api/category/lists',
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var result = [],
                        item,
                        tpl = '<li style="background: {#bgcolor#}" data-listorder="{#listorder#}" data-categoryid="{#categoryid#}">{#category_name#}</li>';
                    for (var i = 0; i < data.data.length; i++) {
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#bgcolor#}': item.bgcolor || '#187EAD',
                            '{#listorder#}': item.listorder,
                            '{#categoryid#}': item.categoryid,
                            '{#category_name#}': item.category_name
                        }));
                    }
                    $('#categoryList').html(result.join(''));
                }
            }
        });
    }

    // 删除类别
    function deleteCategory(categoryid, cb){
        $http.post({
            url: 'api/category/delete',
            data: {
                categoryid: categoryid
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                } else {
                    Alert.showError();
                }
                $util.isFunction(cb) && cb();
            },
            error: function() {
                Alert.showError();
            }
        });
    }

    // 新增或者更新类别数据
    function addOrUpdateCategory(item, cb) {
        $http.post({
            url: 'api/category/update',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                } else {
                    Alert.showError();
                }
                $util.isFunction(cb) && cb();
            },
            error: function() {
                Alert.showError();
            }
        });
    }
    $core.Ready(function() {
        console.log('mgrcategory');
        getCategoryList();
    });
});