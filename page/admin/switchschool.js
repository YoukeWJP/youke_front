/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/15
 * Time: 21:53
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;
    var userInfo = JSON.parse(localStorage.getItem('ykUserInfo')) || {};
    var currentCampusId = userInfo.campusid;//当前校区ID

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
        var $this = $(this),
            id = $this.attr('id');
        $('#nav>li>ul>li').removeClass('active');
        $this.addClass('active').find('.child').removeClass('dn');
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
    .on('click', '#discount .child li', function() {
        var $this = $(this),
            id = $this.attr('id');
        $this.addClass('active').siblings('li').removeClass('active');
        if(id === 'discountMgr'){
            $core.nextPage('Admin-DiscountMgr');
        } else if(id === 'discountList'){
            $core.nextPage('Admin-DiscountList');
        }
    })
    .on('click', '#student-service', function() {
        $core.nextPage('Admin-StudentService');
    })
    //基础设置相关操作 --- END
    //校区列表相关操作 --- BEGIN
    .on('mouseover', '.body .content ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.body .content ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.body .content .title i', function() {
        $core.nextPage('Admin-AddSchool');
    })
    .on('click', '.body .content .operate', function() {
        var $this = $(this),
            campusid = $this.closest('li').attr('data-campusid');
        Alert.showConfirm('确认切换', '确认切换校区么？', function() {
            switchCampus(campusid, function(){
                $this.closest('li').addClass('selected').siblings('li').removeClass('selected');
            });
        });
    })
    //校区列表相关操作 --- END
    ;

    function getCampusList() {
        $http.get({
            url: 'api/campus/lists',
            success: function(data) {
                if(data.code === $comm.HttpStatus.OK) {
                    var tpl = '<li data-campusid="{#campusid#}" class="{#selected#}">'
                            +   '<span class="name">{#name#}</span>'
                            +   '<a href="javascript:void(0);" class="operate">'
                            +   '</a>'
                            + '</li>',
                        list = [];
                    for(var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        list.push($util.strReplace(tpl, {
                            '{#campusid#}' : item.campusid,
                            '{#name#}' : item.name,
                            '{#selected#}' : currentCampusId == item.campusid ? 'selected' : ''
                        }));
                    }
                    $('#schools').html(list.join(''));
                }
            }
        });
    }

    function switchCampus(campusid, cb) {
        $http.post({
            url: 'api/campus/switching',
            data: {
                campusid: campusid
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    currentCampusId = campusid;
                    userInfo.campusid = currentCampusId;
                    updateLocalStorage();
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError(data.message || '切换校区失败');
                }
            }
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('ykUserInfo', JSON.stringify(userInfo));
    }
    $core.Ready(function() {
        console.log('switchschool');
        getCampusList();
    });
});