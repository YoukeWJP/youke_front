/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/28
 * Time: 17:29
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Services', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Services;

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
    .on('click', '#setting', function() {
        $core.nextPage('Admin-SwitchSchool');
    })
    //基础设置相关操作 --- END
    //机构管理相关操作 --- BEGIN
    .on('click', '.content .edit', function() {
        $core.nextPage('Admin-ModifyOrg');
    })
    .on('click', '#orgLogo', function() {
        $('.mask-upload-logo').removeClass('dn');
    })
    .on('click', '.mask-upload-logo h3 i', function() {
        $('.mask-upload-logo').addClass('dn');
    })
    //机构管理相关操作 --- END
    //上传图片相关操作 --- BEGIN
    .on('change', '#file', function() {
        $('#mask-modify-logo').removeClass('dn');
        var file = this.files[0];
        cropper(file);
    })
    .on('click', '#mask-modify-logo h3 i,#mask-modify-logo .bar .cancel', function(){
        $('#mask-modify-logo').addClass('dn');
        initUploadModle();
    })
    .on('click', '#mask-modify-logo .bar .confirm', function(){
        var item = {};
        var $image = $('#mask-modify-logo .left img');
        var result = $image.cropper('getCroppedCanvas');
        var url = result.toDataURL('image/jpeg');
        $image.cropper('clear');
        $('#mask-modify-logo .normal img').attr('src', url);
        uploadImage(item, function(){
            $('#mask-modify-logo').addClass('dn');
        });
    })
    //上传图片相关操作 --- END
    ;

    function uploadImage(item, cb) {
        $http.post({
            url: '',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError('上传图片失败');
                }
            },
            error: function() {
                Alert.showError('上传图片失败');
            },
            complete: function () {
                initUploadModle();
            }
        });
    }

    function cropper(file) {
        var reader = new FileReader();
        // 将文件以Data URL形式进行读入页面
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            var el = e.srcElement || e.target;
            var $selector = $('#mask-modify-logo .modify .left img');
            $selector.attr('src', el.result);
            $selector.cropper({
                aspectRatio: 1 / 1,
                preview: '.img-preview',
                modal: false,
                crop: function(e) {
                    // Output the result data for cropping image.
                    console.log(e);
                    console.log(e.x);
                    console.log(e.y);
                    console.log(e.width);
                    console.log(e.height);
                    console.log(e.rotate);
                    console.log(e.scaleX);
                    console.log(e.scaleY);
                }
            });
        };
    }

    function initUploadModle() {
        console.log('111');
        console.log('xxx');
        console.log('222');
        $('#file').off('change').replaceWith('<input type="file" class="file" id="file">');
        $('#file').on('change', function() {
            var file = this.files[0];
            cropper(file);
        });
    }
    $core.Ready(function() {
        console.log('org');
    });
});