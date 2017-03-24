/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/28
 * Time: 17:43
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    // keyCode码：http://www.cnblogs.com/jeffqing/archive/2012/06/28/2568911.html
    var keyCodeMap = {
        110: '.',
        190: '.',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        96: '0',
        97: '1',
        98: '2',
        99: '3',
        100: '4',
        101: '5',
        102: '6',
        103: '7',
        104: '8',
        105: '9'
    };
    $(document)
    //左侧相关操作 --- BEGIN
    .on('click', '#sidebar .title i', function() {
        $core.nextPage('Service-Index');
    })
    .on('click', '#sidebar .course i', function() {
        var $this = $(this);
        Alert.showConfirm('确认删除该课程么？', function() {
            $this.closest('li').remove();
        });
    })
    .on('click', '#sidebar .total-price .btn', function() {
        $('#mask-settle').removeClass('dn');
    })
    //左侧相关操作 --- END
    //右侧相关操作 --- BEGIN
    .on('click', '#body .nav ul li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#body .content ul li', function() {
        var $this = $(this);
        $this.toggleClass('active');
    })
    //右侧相关操作 --- END
    //结算相关操作 --- BEGIN
    .on('click', '#mask-settle h3 i', function() {
        $('#mask-settle').addClass('dn');
    })
    .on('click', '#mask-settle .way span', function() {
        var $this = $(this);
        $this.closest('.pay').find('.way span').removeClass('active');
        $this.addClass('active');
    })
    .on('click', '#mask-settle .summary', function() {
        $('#mask-favorable').removeClass('dn');
    })
    .on('click', '#mask-settle .btn-remark', function() {
        $('#mask-remark').removeClass('dn');
    })
    // 备注取消
    .on('click', '#mask-remark h3 i,#mask-remark .bar .btn-cancel', function() {
        $('#mask-remark').addClass('dn');
    })
    // 备注确定
    .on('click', '#mask-remark .bar .btn-confirm', function() {
        //TODO
        console.log('to do something');
        $('#mask-remark').addClass('dn');
    })
    .on('click', '#mask-favorable h3 i', function() {
        $('#mask-favorable').addClass('dn');
    })
    .on('click', '#mask-favorable .content li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#mask-favorable .other', function() {
        $('#mask-favorable-input .content .money').val('0');
        $('#mask-favorable-input .sum .money b').text('￥0');
        $('#mask-favorable-input').removeClass('dn');
    })
    .on('click', '#mask-favorable-input h3 i', function() {
        $('#mask-favorable-input').addClass('dn');
    })
    .on('click', '#mask-favorable-input li', function() {
        var $this = $(this);
        var maxLength = 12;
        $this.addClass('active').siblings('li').removeClass('active');
        var $selector = $('#mask-favorable-input .content .money');
        var money = $.trim($selector.val());
        var value = $this.attr('data-value');
        if (value === 'back') {
            if(money.length <= 1){
                $selector.val('0');
            } else {
                $selector.val(money.substring(0, money.length - 1));
            }
        } else if (value === '.') {
            if (money.replace(/\D/g, '').length >= maxLength) {
                return;
            }
            if (money !== '' && money.indexOf('.') === -1) {
                $selector.val(money + value);
            }
        } else {
            if (money.replace(/\D/g, '').length >= maxLength) {
                return;
            }
            if (money === '0') {
                if (value !== '0') {
                    $selector.val(value);
                }
            } else {
                $selector.val(money + value);
            }
        }
        $('#mask-favorable-input .sum .money b').text('￥' + $selector.val());
    })
    .on('keydown', function(e) {
        var $parent = $('#mask-favorable-input');
        var maxLength = 12;
        if ($parent.hasClass('dn')) {
            return;
        }
        $('#mask-favorable-input li').removeClass('active');
        var value = $util.getKeyCode(e);
        var $selector = $parent.find('.content .money');
        var money = $.trim($selector.val());
        if (value === 8) { //backspace
            if(money.length <= 1){
                $selector.val('0');
            } else {
                $selector.val(money.substring(0, money.length - 1));
            }
        } else if (value === 110 || value === 190) { //.
            if (money.replace(/\D/g, '').length >= maxLength) {
                return;
            }
            if (money !== '' && money.indexOf('.') === -1) {
                $selector.val(money + keyCodeMap[value]);
            }
        } else if ((value >= 48 && value <= 57) || (value >= 96 && value <= 105)) { //0~9:48~57为大键盘的，96~105是小键盘的
            if (money.replace(/\D/g, '').length >= maxLength) {
                return;
            }
            if (money === '0') {
                if (value !== 48 && value !== 96) {
                    $selector.val(keyCodeMap[value]);
                }
            } else {
                $selector.val(money + keyCodeMap[value]);
            }
        }
        $('#mask-favorable-input .sum .money b').text('￥' + $selector.val());
    })
    //结算相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('buynew');
        $('.footer .detail .first').addClass('active');
    });
});