/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/28
 * Time: 17:02
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
    })
    .on('click', '#org', function() {
        $core.nextPage('Admin-Org');
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
    .on('click', '#setting', function() {
        $core.nextPage('Admin-SwitchSchool');
    })
    //基础设置相关操作 --- END
    //支付方式列表相关操作 --- BEGIN
    .on('mouseover click', '.body .content ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#payList .status', function() {
        var $this = $(this),
            status = $this.closest('li').attr('data-status'),
            methodid = $this.closest('li').attr('data-methodid');
        // 1、开启  2、关闭
        var msg = status == '1' ? '关闭' : '开启',
            operation = status == '1' ? 'close' : 'open',
            payMethod = $this.siblings('.type').text();
        Alert.showConfirm('确认' + msg, '确认' + msg + '支付方式<span style="color:red;">' + payMethod + '</span>么？', function() {
            switchPaymentMethod({
                methodid: methodid,
                operation: operation
            }, function() {
                $this.text(status == '1' ? '开启' : '关闭').closest('li').toggleClass('close').attr('data-status', status == '1' ? '0' : '1');
            });
        });
    })
    //支付方式列表相关操作 --- END
    ;

    //获取支付方式列表 --- BEGIN
    function getPayList() {
        $http.post({
            url : 'api/setting/payment_methods',
            success : function(data){
                if (data.code === $comm.HttpStatus.OK) {
                    var result = [],
                        item,
                        tpl = '<li class="{#statusCls#}" data-methodid="{#methodid#}" data-status="{#status#}">'
                            +   '<span class="type">{#method_name#}</span>'
                            +   '<span class="status">{#statusName#}</span>'
                            + '</li>';
                    for (var i = 0; i < data.data.length; i++) {
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#statusCls#}': item.status == '1' ? '' : 'close',
                            '{#status#}': item.status,// 1、开启  2、关闭
                            '{#methodid#}': item.methodid,
                            '{#method_name#}': item.method_name,
                            '{#statusName#}': item.status == '1' ? '关闭' : '开启',
                        }));
                    }
                    $('#payList').html(result.join(''));
                }
            }
        });
    }
    //获取支付方式列表 --- END

    //开启/关闭支付方式
    function switchPaymentMethod(item, cb){
        $http.post({
            url: 'api/setting/payment_method_switching',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError(data.message || '操作失败');
                }
            }
        });
    }
    $core.Ready(function() {
        console.log('pay');
        if ($util.getCurrentRole() === $comm.Role.admin) {
            $('#setting').parents('li').removeClass('dn');
        }
        getPayList();
    });
});