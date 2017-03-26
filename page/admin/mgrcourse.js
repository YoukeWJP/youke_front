/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/8/24
 * Time: 22:53
 */
require(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $comm = YOUKE.Comm,
        Alert = YOUKE.Widget.Alert,
        $http = YOUKE.Service;

    $(document)
    //顶部菜单栏相关操作 --- BEGIN
    .on('click', '.top .back', function() {
        window.history.go(-1);
    })
    //顶部菜单栏相关操作 --- END
    //  中间列表 --- BEGIN
    .on('click', '#nav li', function() {
        var $this = $(this),
            categoryid = $this.attr('data-categoryid');
        $this.addClass('active').siblings('li').removeClass('active');
        getCourseList(categoryid);
    })
    .on('click', '#nav .back', function() {
        var $selector = $('#nav li');
        var max = $selector.length,
            first = $selector.filter(':not(.dn)').filter(':first').index(),
            last = $selector.filter(':not(.dn)').filter(':last').index();
        if (first) {
            $selector.eq(first - 1).removeClass('dn');
            $selector.eq(last).addClass('dn');
        }
    })
    .on('click', '#nav .forward', function() {
        var $selector = $('#nav li');
        var max = $selector.length,
            first = $selector.filter(':not(.dn)').filter(':first').index(),
            last = $selector.filter(':not(.dn)').filter(':last').index();
        if(max > last + 1){
            $selector.eq(last + 1).removeClass('dn');
            $selector.eq(first).addClass('dn');
        }
    })
    .on('mouseover', '#content li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '#content li', function () {
        var $this = $(this),
            courseid = $this.attr('data-courseid');
        $this.addClass('active').siblings('li').removeClass('active');
        getCourseDetail(courseid, function(data) {
            $('#sidebar-right').addClass('dn');
            $('#sidebar-detail').removeClass('dn');
            var $selector = $('#sidebar-detail .content');
            $selector.find('.courseid').val(data.courseid);
            $selector.find('h3 span').text(data.course_name);
            $selector.find('.category').children('label').text($comm.CourseType[data.course_type]);
            $selector.find('.category [data-status="'+data.status+'"]').addClass('active');
            $selector.find('.price').text('￥' + data.price);
            $selector.find('.coursetype').text($comm.CourseType[data.course_type]);
            $selector.find('.totalhours').text(data.total_course_hours + '课时');
            $selector.find('.expiration').text(data.expiration_days + '天');
            $selector.find('.perunit').text(data.hours_per_unit + '课时');
            $selector.find('.describe').text(data.description);
        });
    })
    //  中间列表 --- END
    //  右侧导航菜单栏 --- BEGIN
    .on('click', '.sidebar-right ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('mouseover', '.sidebar-right ul li', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.sidebar-right li.add', function() {
        $core.nextPage('Admin-AddCourse');
    })
    .on('click', '.sidebar-right li.category', function() {
        $core.nextPage('Admin-MgrCategory');
    })
    //  右侧导航菜单栏 --- END
    //  右侧详情菜单栏 --- BEGIN
    .on('click', '#sidebar-detail .delete', function() {
        var course_name = $('#sidebar-detail h3 span').text(),
            courseid = $('#sidebar-detail .courseid').val();
        Alert.showConfirm('删除课程[<span style="color:red;">' + course_name + '</span>]后将不能恢复，<br/>确认删除？', function () {
            deleteCourse(courseid, function () {
                var categoryid = $('#nav li.active').attr('data-categoryid');
                getCourseList(categoryid);
            });
        });
    })
    .on('click', '#sidebar-detail .category span label', function() {
        var $this = $(this),
            courseid = $('#sidebar-detail .courseid').val(),
            operation = $this.attr('data-operation');
        switchCourseStatus({
            courseid: courseid,
            operation: operation
        }, function() {
            $this.addClass('active').siblings('label').removeClass('active');
            $('#content li[data-courseid="' + courseid + '"]').find('.icon').toggleClass('down');
        });
    })
    .on('click', '#sidebar-detail .edit', function() {
        var courseid = $('#sidebar-detail .courseid').val();
        $core.nextPage('Admin-EditCourse', {
            courseid: courseid
        });
    })
    .on('click', '#sidebar-detail h3 i', function() {
        $('#sidebar-detail').addClass('dn');
        $('#sidebar-right').removeClass('dn');
    })
    //  右侧详情菜单栏 --- END
    ;
    // 删除课程
    function deleteCourse(courseid, cb){
        $http.post({
            url: 'api/course/delete',
            data: {
                courseid: courseid
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    Alert.showSuccess();
                    $util.isFunction(cb) && cb();
                } else {
                    Alert.showError();
                }
            },
            error: function() {
                Alert.showError();
            }
        });
    }

    // 获取类别数据
    function getCategoryList(cb){
        $http.post({
            url: 'api/category/lists',
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var result = ['<li data-categoryid="" class="active">全部</li>'],
                        item,
                        tpl = '<li data-categoryid="{#categoryid#}" class="{#dn#}">{#category_name#}</li>';
                    for (var i = 0; i < data.data.length; i++) {
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#categoryid#}': item.categoryid,
                            '{#category_name#}': item.category_name,
                            '{#dn#}': i > 3 ? 'dn' : ''
                        }));
                    }
                    $('#nav ul').html(result.join(''));
                }
            },
            complete: function() {
                $util.isFunction(cb) && cb();
            }
        });
    }

    function getCourseList(categoryid) {
        $http.post({
            url: 'api/course/lists',
            data: {
                page : 1,
                pagesize : 10,
                status : '',
                categoryid : categoryid
            },
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    var result = [],
                        item,
                        tpl = '<li data-courseid="{#courseid#}" data-categoryid="{#categoryid#}" data-coursetype="{#course_type#}">'
                            +   '<span class="icon {#down#}"></span>'
                            +   '<span class="name">'
                            +       '<h3>{#course_name#}</h3>'
                            +       '<span>{#courseTypeName#}</span>'
                            +   '</span>'
                            +   '<span class="category">产品分类</span>'
                            +   '<span class="price">{#price#}</span>'
                            + '</li>';
                    for (var i = 0; i < data.data.length; i++) {
                        item = data.data[i];
                        result.push($util.strReplace(tpl, {
                            '{#courseid#}': item.courseid,
                            '{#categoryid#}': item.categoryid,
                            '{#course_type#}': item.course_type,
                            '{#down#}': item.status == '0' ? 'down' : '',
                            '{#course_name#}': item.course_name,
                            '{#courseTypeName#}': $comm.CourseType[item.course_type],
                            '{#price#}': '￥' + (item.price || '0.00'),
                        }));
                    }
                    $('#content ul').html(result.join(''));
                }
            }
        });
    }
    //获取单节课程详情
    function getCourseDetail(courseid, cb) {
        $http.get({
            url: 'api/course/info/courseid/' + courseid,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data.data);
                } else {
                    Alert.showError(data.message ||'获取课程信息失败');
                }

            },
            error: function() {
                Alert.showError();
            }
        });
    }

    //切换课程状态
    function switchCourseStatus(item, cb) {
        $http.post({
            url: 'api/course/switching',
            data: item,
            success: function(data) {
                if (data.code === $comm.HttpStatus.OK) {
                    $util.isFunction(cb) && cb(data.data);
                } else {
                    Alert.showError(data.message || '操作失败');
                }
            }
        });
    }
    $core.Ready(function() {
        console.log('mgrcourse');
        getCategoryList(function() {
            getCourseList();
        });
    });
});