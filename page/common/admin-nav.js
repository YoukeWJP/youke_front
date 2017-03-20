/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/20
 * Time: 9:26
 */
require(['YOUKE.Util'], function() {
    var $core = YOUKE.Core,
        $util = YOUKE.Util;
    $(document)
    //左侧菜单栏相关操作 --- BEGIN
    .on('click', '#admin-nav .home', function() {
        $core.nextPage('Admin-Index');
    })
    .on('click', '#admin-nav .setting', function() {
        $core.nextPage('Admin-Org');
    })
    .on('click', '#admin-nav .fullscreen', function() {
        var $this = $(this);
        if ($this.hasClass('exit')) {
            $this.removeClass('exit');
            $util.exitFullscreen();
        } else {
            $this.addClass('exit');
            $util.fullScreen();
        }
    })
    .on('click', '#admin-nav .admin', function() {
        $core.nextPage('Admin-Home-PersonalInfo');
    })
    //左侧菜单栏相关操作 --- END
    ;

    $core.Ready(function() {
        console.log('admin-nav');
    });
});