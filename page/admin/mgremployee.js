/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/13
 * Time: 16:17
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    $('body').on('click', '.sidebar-nav .setting', function (e) {
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
    }).on('click', '#org', function() {
        $core.nextPage('Admin-Org');
    }).on('click', '#pay', function() {
        $core.nextPage('Admin-Pay');
    }).on('click', '#discount .child li', function() {
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
    .on('click', '#setting', function() {
        $core.nextPage('Admin-SwitchSchool');
    })
    //基础设置相关操作 --- END
    //员工管理列表相关操作 --- BEGIN
    .on('mouseover', '.body .content ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.body .content ul li', function() {
        var $this = $(this),
            uid = $this.attr('data-uid'),
            nicename = $this.attr('data-nicename'),
            sex = $this.attr('data-sex'),
            role = $this.attr('data-role'),
            username = $this.attr('data-username'),
            created = $this.attr('data-created'),
            $selector = $('#sidebar-right .student-detail');
        $('#sidebar-right .uid').val(uid);
        $selector.find('.info .first').text(nicename);
        $selector.find('.info .second').text(sex == '1' ? '男' : '女');
        $selector.find('.info .third span').text($util.format({
            value: created,
            flag: 1
        }));
        $selector.find('.position span').text(role);
        $selector.find('.mobile').text(username);
        $this.addClass('active').siblings('li').removeClass('active');
        $('.sidebar-right').removeClass('dn');
    })
    .on('click', '.sidebar-right .desc', function() {
        $('.sidebar-right').addClass('dn');
    })
    .on('click', '.sidebar-right .delete', function() {
        var uid = $('#sidebar-right .uid').val(),
            nicename = $('#sidebar-right .student-detail .info .first').text();
        Alert.showConfirm('确认删除员工，<br/><span style="color:red;">' + nicename + '</span>？', function() {
            deleteEmployee(uid, function() {
                $('#sidebar-right').addClass('dn');
                $('#employeeList li').filter('[data-uid="' + uid + '"]').remove();
            });
        });
    })
    .on('click', '.body .content .title i', function() {
        $core.nextPage('Admin-AddEmployee');
    })
    //员工管理列表相关操作 --- END
    //重置登录密码 --- BEGIN
    .on('click', '.sidebar-right .reset-pwd', function() {
        var uid = $('#sidebar-right .uid').val();
        Alert.showConfirm('确认重置', '重置密码需要清除当前密码，<br/>并重新设置为<span style="color:red;">123456</span>，确定重置？', function() {
            resetLoginPwd(uid);
        });
    })
    //重置登录密码 --- END
    ;
    //重置登录密码
    function resetLoginPwd(uid) {
        $http.post({
            url: 'api/employee/reset_password',
            data: {
                uid: uid
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess(data.message);
                } else {
                    Alert.showError(data.message);
                }
            }
        });
    }
    //删除员工
    function deleteEmployee(uid, cb) {
        $http.post({
            url: 'api/employee/delete',
            data: {
                uid: uid
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess(data.message);
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError(data.message);
                }
            }
        });
    }

    // 获取员工列表
    function getEmployeeList() {
        $http.post({
            url: 'api/employee/lists',
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var result = [],
                        item,
                        tpl = '<li data-uid="{#uid#}" data-nicename="{#nicename#}" data-sex="{#sex#}" data-role="{#role#}" data-created="{#created#}" data-username="{#username#}">'
                            +   '<span class="name">{#nicename#}</span>'
                            +   '<span class="position">{#role#}</span>'
                            +   '<a href="javascript:void(0);" class="date">'
                            +       '<span class="time">{#created#}</span>'
                            +       '<span class="desc">加入</span>'
                            +       '<i></i>'
                            +   '</a>'
                            + '</li>';
                    if (data.data && data.data.length) {
                        for (var i = 0; i < data.data.length; i++) {
                            item = data.data[i];
                            result.push($util.strReplace(tpl, {
                                '{#uid#}': item.uid,
                                '{#nicename#}': item.nicename,
                                '{#sex#}': item.sex,
                                '{#username#}': item.username,
                                '{#role#}': item.role_info.name,
                                '{#created#}': $util.format({
                                    value: item.created,
                                    flag: 1
                                })
                            }));
                        }
                        $('#employeeList').html(result.join(''));
                    }
                }
            }
        });
    }
    $core.Ready(function() {
        console.log('index');
        if ($util.getCurrentRole() === $comm.Role.admin) {
            $('#setting').parents('li').removeClass('dn');
        }
        getEmployeeList();
    });
});