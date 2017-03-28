/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/14
 * Time: 13:59
 */
define(function() {
    var $Comm = {
        HttpStatus: {
            'OK'                :           200,             //成功
            'unlogin'           :           40015,           //未登录
            'noauth'            :           40016,           //无权限
        },
        Role: {
            'student'           :           'student',       //学生
            'instructor'        :           'instructor',    //教员
            'principal'         :           'principal',     //校长
            'admin'             :           'admin',         //管理员
            'superuser'         :           'superuser'      //超级用户
        },
        // 课程类型
        CourseType: {
            '1'                 :           '按课时',
            '2'                 :           '按有效期'
        },
        // 进入购买页面的referer
        Referer: {
            '10'                :           'Service-Index',            //小妹端主页
            '11'                :           'Service-MgrStudent',       //小妹端学员管理
            '12'                :           'Service-StudentBirthday',  //小妹端学员生日
            '21'                :           'Admin-MgrStudent',         //管理端学员管理
            '22'                :           'Admin-BirthStudent'        //管理端学员生日
        }
    };
    NameSpace.Register('YOUKE.Comm', $Comm);
});