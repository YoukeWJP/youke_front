/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/29
 * Time: 20:58
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    //校验单项课程折扣中表格的折扣
    var checkTableDiscountFunc = function() {
        var flag = true;
        var $selector = $('#content .table input');
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
        if (!checkTableDiscountFunc()) {
            return;
        }
        var item = {};
        discountCourseSet(item, function() {
            $core.nextPage('Admin-DiscountMgr');
        });
    })
    .on('click', '.course-list i', function(){
        $('#mask-course').removeClass('dn');
    })
    // content --- BEGIN
    .on('click', '#content p.add', function(){
        $('#mask-course-discount').removeClass('dn');
    })
    .on('click', '#content .table i', function(){
        var $this = $(this);
        $this.closest('tr').remove();
    })
    .on('click', '.bottom .cancel', function(){
        if (!checkTableDiscountFunc()) {
            return;
        }
        $('#mask-course').addClass('dn');
        var item = {};
        discountCourseSet(item, function() {
            // $core.nextPage('Admin-DiscountMgr');
        });
    })
    // content --- END
    // mask-course-discount --- BEGIN
    .on('click', '#mask-course-discount .table i', function(){
        var $this = $(this);
        $this.toggleClass('checked');
        var idList = [],
            nameList = [];
        var obj = getSelectedCourse();
        for (var key in obj) {
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
        [].forEach.call($selector, function(item, index) {
            var $tr = item = $(item).closest('tr');
            var id = $tr.attr('data-id'),
                name = $.trim($tr.find('td:first-child').text());
            result[id] = name;
        });
        return result;
    }

    function discountCourseSet(item, cb) {
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
        console.log('discountcourseset');
    });
});