/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/18
 * Time: 17:10
 */
require(['YOUKE.Util', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;
    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //中间列表相关操作 --- BEGIN
    .on('mouseover', '.student-info .content li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.student-info .content li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        $('.sidebar-right-student-detail').removeClass('dn');
    })
    //中间列表相关操作 --- END
    //右侧菜单栏相关操作 --- BEGIN
    .on('mouseover', '.sidebar-right-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right-list .first', function() {
        $core.nextPage('Admin-IndexStudent');
    })
    .on('click', '.sidebar-right-list .third', function() {
        $('.mask-batch-import-preview,.mask-batch-import-result').addClass('dn');
        $('.mask-batch-import').removeClass('dn');
    })
    //右侧菜单栏相关操作 --- END
    //生日详情相关操作 --- BEGIN
    .on('click', '.sidebar-right-student-detail .title i,.sidebar-right-student-detail .title label', function() {
        $('.sidebar-right-student-detail').addClass('dn');
    })
    .on('click', '.sidebar-right-student-detail .slide', function() {
        var $this = $(this);
        $this.toggleClass('up').toggleClass('down');
        if($this.hasClass('up')) {
            $('.student-info .detail').removeClass('dn');
        } else if($this.hasClass('down')){
            $('.student-info .detail').addClass('dn');
        }
    })
    //生日详情相关操作 --- END
    //批量导入相关操作 --- BEGIN
    .on('click', '.mask-batch-import h3 i', function() {
        $('.mask-batch-import').addClass('dn');
    })
    .on('change', '#uploadfile', function() {
        var file = this.files[0];
        if (checkFile(file)) {
            //do something //文件解析操作
            $('.mask-batch-import-preview').removeClass('dn');
        }
    })
    .on('click', '.mask-batch-import-preview h3 i', function() {
        $('.mask-batch-import-preview').addClass('dn');
    })
    .on('click', '.mask-batch-import-preview .btn', function() {
        //do something //文件上传操作，真正的存入数据库
        $('.mask-batch-import-result').removeClass('dn');
    })
    .on('click', '.mask-batch-import-result h3 i,.mask-batch-import-result .import-result-btn', function() {
        $('.mask-batch-import-result').addClass('dn');
    })
    //批量导入相关操作 --- END
    ;

    function checkFile(file) {
        if (!file) {
            return false;
        }
        var supportType = ['xlsx', 'xls'];
        var filename = file.name || '';
        var type = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        if (supportType.indexOf(type) === -1) {
            Alert.showError('只支持xlsx和xls格式的文件');
            return false;
        }
        return true;
    }

    $core.Ready(function() {
        console.log('mgrstudent');
    });
});