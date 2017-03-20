/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/7
 * Time: 11:23
 */
require(['YOUKE.Util'], function() {
    var $core = YOUKE.Core,
        $util = YOUKE.Util;

    $(document)
    //底部菜单栏相关操作 --- BEGIN
    .on('click', '#footer .menu', function() {
        $('#mask-settings').removeClass('dn');
    })
    .on('click', '#footer .detail .first', function() {
        var $this = $(this);
        $this.addClass('active').siblings('.item').removeClass('active');
        $core.nextPage('Service-Index');
    })
    .on('click', '#footer .detail .second', function() {
        var $this = $(this);
        $this.addClass('active').siblings('.item').removeClass('active');
        $core.nextPage('Service-StudentIndex');
    })
    .on('click', '#footer .detail .third', function() {
        var $this = $(this);
        $this.addClass('active').siblings('.item').removeClass('active');
        $core.nextPage('Service-Record');
    })
    //底部菜单栏相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('service-footer');
    });
});