/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/10/18
 * Time: 19:06
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

    $('body').on('click', '#footer .detail .second', function (e) {
        $util.stop(e);
        $(this).addClass('active').siblings('.item').removeClass('active');
        $core.nextPage('Service-StudentIndex');
    });

    $(document)
    .on('mouseover click', '#sidebar-right-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    //  学员列表相关操作  --- BEGIN
    .on('click', '#student-list li', function() {
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
        $('#sidebar-right-list').addClass('dn');
        $('#sidebar-right-student-detail').removeClass('dn');
    })
    .on('mouseover', '#student-list li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    //  学员列表相关操作  --- END
    //  右侧列表相关操作  --- BEGIN
    .on('click', '#sidebar-right-list li.first', function() {
        $core.nextPage('Service-StudentIndex');
    })
    .on('click', '#sidebar-right-list li.third', function() {
        $('#mask-batch-import').removeClass('dn');
    })
    .on('click', '#sidebar-right-student-detail h3.title i,#sidebar-right-student-detail h3.title span', function() {
        $('#sidebar-right-student-detail').addClass('dn');
        $('#sidebar-right-list').removeClass('dn');
    })
    .on('click', '#sidebar-right-student-detail .student-birth .slide', function() {
        var $this = $(this);
        if($this.hasClass('down')){
            $this.removeClass('down').addClass('up');
            $this.closest('.student-birth').siblings('.detail').removeClass('dn');
        } else if($this.hasClass('up')){
            $this.removeClass('up').addClass('down');
            $this.closest('.student-birth').siblings('.detail').addClass('dn');
        }
    })
    //  右侧列表相关操作  --- END
    //  导入文件相关操作  --- BEGIN
    .on('click', '#mask-batch-import h3 i.close', function() {
        $('#mask-batch-import').addClass('dn');
    })
    .on('change', '#uploadfile', function() {
        console.log(this);
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
    //  导入文件相关操作  --- END
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
        $('.footer .detail .second').addClass('active');
    });
});