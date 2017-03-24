/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/8/24
 * Time: 22:53
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;
    var CONST = {
        cid : 1 //$util.getQuery('cid')
    };
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //  中间列表 --- BEGIN
    .on('click', '#nav li', function() {
        var $this = $(this),
            cid = $this.attr('data-categoryid');
        $this.addClass('active').siblings('li').removeClass('active');
        // getCategory(cid);
    })
    .on('click', '#nav .back', function() {
        var $selector = $('#nav li');
        var max = $selector.length,
            first = $selector.filter(':not(.dn)').filter(':first').index(),
            last = $selector.filter(':not(.dn)').filter(':last').index();
        if(first){
            $selector.eq(first - 1).removeClass('dn');
            $selector.eq(last).addClass('dn');
        }
    })
    .on('click', '#nav .forward', function() {
        var $selector = $('#nav li');
        var max = $selector.length,
            first = $selector.filter(':not(.dn)').filter(':first').index(),
            last = $selector.filter(':not(.dn)').filter(':last').index();
        if(max > last + 1){
            $selector.eq(last + 1).removeClass('dn');
            $selector.eq(first).addClass('dn');
        }
    })
    .on('mouseover', '#content li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#content li', function () {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        $('#sidebar-right').addClass('dn');
        $('#sidebar-detail').removeClass('dn');
    })
    //  中间列表 --- END
    //  右侧导航菜单栏 --- BEGIN
    .on('click', '.sidebar-right ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('mouseover', '.sidebar-right ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right li.add', function() {
        $core.nextPage('Admin-AddCourse');
    })
    .on('click', '.sidebar-right li.category', function() {
        $core.nextPage('Admin-MgrCategory');
    })
    //  右侧导航菜单栏 --- END
    //  右侧详情菜单栏 --- BEGIN
    .on('click', '#sidebar-detail .delete', function() {
        var course = $('#sidebar-detail h3').text(),
            cid = '1';
        Alert.showConfirm('删除课程[' + course + ']后将不能恢复，<br/>确认删除？', function () {
            deleteCourse(cid, function () {
                console.log('删除课程[%s]成功', course);
            });
        });
    })
    .on('click', '#sidebar-detail .edit', function() {
        $core.nextPage('Admin-EditCourse');
    })
    .on('click', '#sidebar-detail h3 i', function() {
        $('#sidebar-detail').addClass('dn');
        $('#sidebar-right').removeClass('dn');
    })
    //  右侧详情菜单栏 --- END
    ;
    // 删除课程
    function deleteCourse(cid, cb){
        $http.post({
            url: 'course/archive',
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

    // 获取类别数据
    function getCategory(cid){
        cid = cid || CONST.cid;
        $http.get({
            url : 'category/list/' + cid,
            success : function (data) {
                if(data.code === $comm.HttpStatus.OK) {
                    var result = ['<li data-categoryid="0" class="active">全部</li>'],
                        item,
                        tpl = '<li data-categoryid="{#categoryId#}" class="{#dn#}">{#categoryName#}</li>';
                    for(var i = 0; i < data.data.length; i++){
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#categoryId#}' : item.categoryId,
                            '{#categoryName#}' : item.categoryName,
                            '{#dn#}' : i > 3 ? 'dn' : ''
                        }));
                    }
                    $('#nav ul').html(result.join(''));
                }
            }
        });
    }
    $core.Ready(function() {
        console.log('mgrcourse');
        getCategory();
    });
});