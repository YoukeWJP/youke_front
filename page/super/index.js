/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/15
 * Time: 15:54
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;
    var $table = $('#table'),
        selections = [];

    // 格式化table返回的数据(数据兼容处理)
    function formatTableData(data) {
        if (data.length === 1 && data[0] === null) {
            data = [];
        } else {
            for (var i = 0; i < data.length; i++) {
                data[i].id = i + 1;
            }
        }
        return data;
    }

    function initTable(tableData) {
        $table.bootstrapTable({
            cache: false,
            striped: false,
            pagination: false,
            pageSize: 10,
            pageNumber: 1,
            pageList: [10, 20, 50, 100],
            search: false,
            showColumns: false,
            showRefresh: false,
            showExport: false,
            showToggle: false,
            detailView: false,
            clickToSelect: true,
            data: tableData,
            columns: [
                [{
                    title: 'ID',
                    field: 'id',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: false,
                    formatter: function(id) {
                        return id;
                    }
                }, {
                    title: '详情',
                    colspan: 5,
                    align: 'center',
                    valign: 'middle'
                }],
                [{
                    field: 'username',
                    title: '账号',
                    sortable: false,
                    editable: false,
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'role',
                    title: '角色',
                    sortable: false,
                    editable: false,
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '状态',
                    sortable: false,
                    align: 'center',
                    valign: 'middle',
                    formatter: function(status) {
                        return {
                            'normal': '启用',
                            'suspend': '禁用'
                        }[status] || '---';
                    }
                }, {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: operateFormatter
                }]
            ]
        });
        // sometimes footer render error.
        setTimeout(function() {
            $table.bootstrapTable('resetView');
        }, 200);
    }

    $(window).resize(function() {
        $table.bootstrapTable('resetView', {
            height: getHeight()
        });
    });

    function operateFormatter(value, row, index) {
        if (row.status === 'normal') { //如果是启用
            return '<a class="btn btn-danger" href="javascript:void(0)" title="禁用">禁用</a>';
        } else if (row.status === 'suspend') {
            return '<a class="btn btn-success" href="javascript:void(0)" title="启用">启用</a>';
        }
        return '';
    }

    window.operateEvents = {
        'click .btn-success': function(e, value, row, index) {
            Alert.showConfirm('确认启用', '确认启用该账号么？', function() {
                var username = row.username;
                if (username) {
                    enableAccount(username, function() {
                        queryadmin(function(data) {
                            $table.bootstrapTable('load', formatTableData(data));
                        });
                    });
                }
            });
        },
        'click .btn-danger': function(e, value, row, index) {
            Alert.showConfirm('确认禁用', '确认禁用该账号么？', function() {
                var username = row.username;
                disableAccount(username, function() {
                    queryadmin(function(data) {
                        $table.bootstrapTable('load', formatTableData(data));
                    });
                });
            });
        }
    };

    function getHeight() {
        return $(window).height() - $('h1').outerHeight(true);
    }

    var checkFunc = {
        accountName: function() {
            var flag = false,
                $selector = $('#accountName'),
                accountName = $selector.val();
            if (!accountName) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入账号名');
            } else if (!$util.isMobile(accountName)) {
                $selector.addClass('error');
                Alert.showTips($selector, '账户名必须是手机号码');
            } else {
                $selector.removeClass('error');
                Alert.hideTips();
                flag = true;
            }
            return flag;
        },
        password: function() {
            var flag = false,
                $selector = $('#password'),
                password = $selector.val();
            if (!password) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入密码');
            } else if (!$util.isValidLoginPwd(password)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的密码(6到16位)');
            } else {
                $selector.removeClass('error');
                Alert.hideTips();
                flag = true;
            }
            return flag;
        },
        confirmPassword: function() {
            var flag = false,
                $selector = $('#confirmPassword'),
                password = $('#password').val(),
                confirmPassword = $selector.val();
            if (!confirmPassword) {
                $selector.addClass('error');
                Alert.showTips($selector, '请确认密码');
            } else if (!$util.isValidLoginPwd(confirmPassword)) {
                $selector.addClass('error');
                Alert.showTips($selector, '请输入正确的密码(6到16位)');
            } else if (confirmPassword !== password) {
                $selector.addClass('error');
                Alert.showTips($selector, '两次密码输入不同');
            } else {
                $selector.removeClass('error');
                Alert.hideTips();
                flag = true;
            }
            return flag;
        }
    };

    $(document)
    .on('click', '#add', function() {
        $('#mask').show();
    })
    .on('click', '#mask h3', function() {
        $('#mask').hide();
    })
    .on('click', '#search', function() {
        queryadmin(function(data) {
            $table.bootstrapTable('load', formatTableData(data));
        });
    })
    .on('click', '#confirm', function() {
        for (var key in checkFunc) {
            if (!checkFunc[key]()) {
                return;
            }
        }
        createAccount(function() {
            queryadmin(function(data) {
                $table.bootstrapTable('load', formatTableData(data));
            });
            $('#mask').hide();
            Alert.showSuccess('创建账号成功');
        });
    })
    .on('input', '#accountName', function() {
        checkFunc.accountName();
    })
    .on('input', '#password', function() {
        checkFunc.password();
    })
    .on('input', '#confirmPassword', function() {
        checkFunc.confirmPassword();
    })
    ;

    //创建账号
    function createAccount(cb) {
        $http.post({
            url: 'account/create',
            data: {
                username: $('#accountName').val().trim(),
                password: $('#password').val().trim(),
                role: 'admin'
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data);
                } else {
                    Alert.showError('创建账号失败');
                }
            }
        });
    }

    //查询账号
    function queryadmin(cb) {
        $http.post({
            url: 'op/queryadmin',
            data: {
                username: $('#username').val().trim(),
                status: $('#status').val().trim()
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data.data);
                }
            }
        });
    }

    //启用账号
    function enableAccount(username, cb) {
        $http.post({
            url: 'op/activate/' + username,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data.data);
                }
            }
        });
    }

    //禁用账号
    function disableAccount(username, cb) {
        $http.post({
            url: 'op/suspend/' + username,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data.data);
                }
            }
        });
    }

    $core.Ready(function() {
        console.log('index');
        queryadmin(function(data) {
            initTable(formatTableData(data));
        });
    });
});