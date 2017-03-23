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
            'student'           :           'student',      //学生
            'instructor'        :           'instructor',   //教员
            'principal'         :           'principal',    //校长
            'admin'             :           'admin',        //管理员
            'superuser'         :           'superuser'     //超级用户
        }
    };
    NameSpace.Register('YOUKE.Comm', $Comm);
});