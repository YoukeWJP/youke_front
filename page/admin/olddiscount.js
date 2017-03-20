/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/21
 * Time: 17:14
 */
require(['YOUKE.Util', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;
    var checkPreFunc = {
        discountNum : function () {
            var flag = false,
                $selector = $('#discountNum'),
                discountNum = $('#discountNum').val();
            if(discountNum === ''){
                $selector.addClass('error');
            } else if(discountNum > 10 || discountNum < 0){
                $selector.addClass('error');
            } else if(!$util.isInt(discountNum)){
                $selector.addClass('error');
            } else {
                flag = true;
                $selector.removeClass('error');
            }
            return flag;
        },
        discountName: function () {
            var flag = false,
                $selector = $('#discountName'),
                discountName = $('#discountName').val();
            if(discountName === ''){
                $selector.addClass('error');
            } else if(!$util.isWord(discountName)){
                $selector.addClass('error');
            } else {
                flag = true;
                $selector.removeClass('error');
            }
            return flag;
        }
    };
    var checkDefineFunc = {
        discountAmount: function () {
            var flag = false,
                $selector = $('#discountAmount'),
                discountAmount = $('#discountAmount').val();
            if(discountAmount === ''){
                $selector.addClass('error');
            } else if(discountAmount < 0){
                $selector.addClass('error');
            } else {
                flag = true;
                $selector.removeClass('error');
            }
            return flag;
        },
        discountPercent: function () {
            var flag = false,
                $selector = $('#discountPercent'),
                discountPercent = $('#discountPercent').val();
            if(discountPercent === ''){
                $selector.addClass('error');
            } else if(discountPercent > 100 || discountPercent < 0){
                $selector.addClass('error');
            } else {
                flag = true;
                $selector.removeClass('error');
            }
            return flag;
        }
    };

    $('body').on('click', '.sidebar .setting', function (e) {
        $util.stop(e);
    });
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //基础设置相关操作 --- BEGIN
    .on('click', '#nav>li>ul>li', function() {
        $('#nav>li>ul>li').removeClass('active');
        $(this).addClass('active');
    })
    .on('click', '#org', function() {
        $core.nextPage('Admin-Org');
    })
    .on('click', '#pay', function() {
        $core.nextPage('Admin-Pay');
    })
    .on('click', '#employee', function() {
        $core.nextPage('Admin-MgrEmployee');
    })
    //基础设置相关操作 --- END
    //折扣相关操作(预定义折扣) --- BEGIN
    .on('click', '#content .icon', function() {
        $('.mask-set-discount').removeClass('dn');
    })
    .on('mouseover', '#content .pre-discount li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#content .pre-discount li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.mask-set-discount h3 i, .mask-set-discount .btn-cancel', function() {
        $('.mask-set-discount').addClass('dn');
    })
    .on('click', '#content .pre-discount i', function () {
        Alert.showConfirm('删除该折扣项？', function () {
            console.log('删除该折扣项成功');
        });
    })
    //选择参与折扣的产品类型 --- BEGIN
    .on('click', '.mask-set-discount .involve.category i', function () {
        $('.mask-category-discount').removeClass('dn');
    })
    .on('click', '.mask-category-discount h3 i,.mask-category-discount .btn-cancel', function () {
        $('.mask-category-discount').addClass('dn');
    })
    .on('click', '.mask-category-discount .category-list li', function () {
        $(this).toggleClass('active');
        var result = [],
            $selector = $('.mask-category-discount .category-list li.active');
        for(var i = 0; i < $selector.length; i++) {
            result.push($selector.eq(i).text());
        }
        $('.mask-category-discount .selected>span').text(result.join('、'));
    })
    .on('click', '.mask-category-discount .btn-confirm', function () {
        var obj = {},
            $selector = $('.mask-category-discount .category-list li.active');
        for(var i = 0; i < $selector.length; i++){
            var id = i,
                name = $selector.eq(i).text();
            obj[id] = name;
        }
        var result = [],
            tpl = '<li data-id="{#id#}">{#name#}</li>';
        for(var key in obj){
            result.push($util.strReplace(tpl, {
                '{#id#}' : key,
                '{#name#}' : obj[key]
            }))
        }
        $('.mask-set-discount .list.category').html(result.join(''));
        $('.mask-category-discount').addClass('dn');
    })
    //选择参与折扣的产品类型 --- END
    //选择参与折扣的产品课程 --- BEGIN
    .on('click', '.mask-set-discount .involve.mt-10 i', function () {
        $('.mask-course-discount').removeClass('dn');
    })
    .on('click', '.mask-course-discount h3 i,.mask-course-discount .btn-cancel', function () {
        $('.mask-course-discount').addClass('dn');
    })
    .on('click', '.mask-course-discount .course i', function () {
        $(this).toggleClass('checked');
        var result = [],
            $selector = $('.mask-course-discount .course i.checked');
        for(var i = 0; i < $selector.length; i++) {
            result.push($selector.eq(i).closest('tr').find('td:first-child').text());
        }
        $('.mask-course-discount .selected>span').text(result.join('、'));
    })
    .on('click', '.mask-course-discount .btn-confirm', function () {
        var obj = {},
            $selector = $('.mask-course-discount .course i.checked');
        for(var i = 0; i < $selector.length; i++){
            var $td = $selector.eq(i).closest('tr').find('td');
            var id = i,
                name = $td.eq(0).text(),
                price = $td.eq(1).text();
            obj[id] = {
                name : name,
                price: price
            }
        }
        var result = [],
            tpl = '<li data-id="{#id#}"><label>{#name#}</label><span>{#price#}</span></li>';
        for(var key in obj){
            result.push($util.strReplace(tpl, {
                '{#id#}' : key,
                '{#name#}' : obj[key].name,
                '{#price#}' : obj[key].price
            }))
        }
        $('.mask-set-discount .list.course').html(result.join(''));
        $('.mask-course-discount').addClass('dn');
    })
    .on('input', '#discountNum', function () {
        checkPreFunc.discountNum();
    })
    .on('input', '#discountName', function () {
        checkPreFunc.discountName();
    })
    .on('click', '.mask-set-discount .btn-confirm', function () {
        for(var key in checkPreFunc){
            if(!checkPreFunc[key]()){
                return;
            }
        }
        $('.mask-set-discount').addClass('dn');
    })
    //选择参与折扣的产品课程 --- END
    //折扣相关操作(预定义折扣) --- END
    //折扣相关操作(自定义折扣) --- BEGIN
    .on('click', '.define-discount i', function() {
        var $this = $(this);
        if(!$this.hasClass('checked')){
            $this.addClass('checked');
            $('.mask-define-discount').removeClass('dn');
        } else {
            $this.removeClass('checked');
            $('.mask-define-discount').addClass('dn');
            $('.define-discount ul').html('');
        }
    })
    .on('click', '.mask-define-discount h3 i, .mask-define-discount .btn-cancel', function() {
        $('.mask-define-discount').addClass('dn');
    })
    .on('input', '#discountAmount', function () {
        checkDefineFunc.discountAmount();
    })
    .on('input', '#discountPercent', function () {
        checkDefineFunc.discountPercent();
    })
    .on('click', '.mask-define-discount .btn-confirm', function() {
        for(var key in checkDefineFunc){
            if(!checkDefineFunc[key]()){
                return;
            }
        }
        console.log('设置自定义折扣金额成功');
        $('.mask-define-discount').addClass('dn');
    })
    ;
    //折扣相关操作(自定义折扣) --- END
    $core.Ready(function() {
        console.log('olddiscount');
    });
});