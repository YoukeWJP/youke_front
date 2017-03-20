/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/11/3
 * Time: 11:23
 */
require([], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope;

    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //左侧菜单相关操作 --- BEGIN
    .on('click', '#person-info .home', function() {
        $core.nextPage('Admin-Index');
    })
    .on('mouseover', '#person-info li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#person-info li.info', function() {
        $core.nextPage('Admin-Home-PersonalInfo');
    })
    //左侧菜单相关操作 --- END

    $core.Ready(function() {
        console.log('about');
    });
});