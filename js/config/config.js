YOUKE.Core.config({
    env: {
        sever: 'dev'
    },
    services: {
        dev: 'http://116.62.57.92:8080/youke/api/',
        test: 'http://youke.auauu.com/',
        release: ''
    },
    loadConfig: {
        baseUrl: '../../',
        //paths下的文件必须显示的以.js结尾，以便自动化处理
        paths: {
            //THIRD --- BEGIN
            'YOUKE.Moment'                   :           'js/third-party/moment.min.js',
            //THIRD --- END

            //YOUKE --- BEGIN
            'YOUKE.Util'                     :           'js/youke/util.js',
            'YOUKE.Comm'                     :           'js/youke/comm.js',
            'YOUKE.Parse'                    :           'js/youke/parse.js',
            'YOUKE.Filter'                   :           'js/youke/filter.js',
            'YOUKE.Adapter'                  :           'js/youke/adapter.js',
            'YOUKE.Service'                  :           'js/youke/service.js',
            'YOUKE.Request'                  :           'js/youke/request.js',
            //YOUKE --- END

            //Widget --- BEGIN
            'YOUKE.Widget.Alert'             :           'js/widget/alert.js'
            //Widget --- END
        }
    },
    headers: {
        'Accept'                             :           '*/*',
        'Accept-Language'                    :           'en;q=1, fr;q=0.9, de;q=0.8, zh-Hans;q=0.7, zh-Hant;q=0.6, ja;q=0.5',
        'Content-Type'                       :           'application/x-www-form-urlencoded'
        // 'Content-Type'                       :           'application/json'
    },
    apiConfig: {
        'category/update'                    :           '../../data/admin/success.json',
        'category/archive'                   :           '../../data/admin/success.json',
        'category/list/1'                    :           '../../data/admin/getCategory.json',

        'org/update'                         :           '../../data/admin/success.json',
        'org/list/1'                         :           '../../data/admin/getOrgInfo.json',

        'course/create'                      :           '../../data/admin/success.json',
        'course/list/type'                   :           '../../data/admin/getCourse.json'
    },
    route: {
        //登录相关 --- BEGIN
        'Login-Login'                        :           '../../page/login/login.html',
        'Login-Register'                     :           '../../page/login/register.html',
        'Login-Resetpwd'                     :           '../../page/login/resetpwd.html',
        //登录相关 --- END


        //个人资料相关 --- BEGIN
        'Admin-Home-PersonalInfo'            :           '../../page/adminhome/personalinfo.html',
        'Admin-Home-About'                   :           '../../page/adminhome/about.html',
        //个人资料相关 --- END

        //---Admin管理端---BEGIN
        // Admin主页
        'Admin-Index'                        :           '../../page/admin/index.html',
        'Admin-BuyNew'                       :           '../../page/admin/buynew.html',

        // Admin报表
        'Admin-Daily'                        :           '../../page/admin/daily.html',
        'Admin-Weekly'                       :           '../../page/admin/weekly.html',
        'Admin-Monthly'                      :           '../../page/admin/monthly.html',

        // Admin销售清单
        'Admin-SalesDetail'                  :           '../../page/admin/salesdetail.html',

        // Admin学员管理
        'Admin-IndexStudent'                 :           '../../page/admin/indexstudent.html',
        'Admin-EditStudent'                  :           '../../page/admin/editstudent.html',
        'Admin-MgrStudent'                   :           '../../page/admin/mgrstudent.html',
        'Admin-BirthStudent'                 :           '../../page/admin/birthstudent.html',

        // Admin课程管理
        'Admin-MgrCourse'                    :           '../../page/admin/mgrcourse.html',
        'Admin-AddCourse'                    :           '../../page/admin/addcourse.html',
        'Admin-EditCourse'                   :           '../../page/admin/editcourse.html',
        'Admin-MgrCategory'                  :           '../../page/admin/mgrcategory.html',

        // Admin设置
        'Admin-Org'                          :           '../../page/admin/org.html',
        'Admin-ModifyOrg'                    :           '../../page/admin/modifyorg.html',
        'Admin-Pay'                          :           '../../page/admin/pay.html',
        'Admin-MgrEmployee'                  :           '../../page/admin/mgremployee.html',
        'Admin-AddEmployee'                  :           '../../page/admin/addemployee.html',
        'Admin-StudentService'               :           '../../page/admin/studentservice.html',
        'Admin-SwitchSchool'                 :           '../../page/admin/switchschool.html',
        'Admin-AddSchool'                    :           '../../page/admin/addschool.html',

        // Admin折扣与优惠---BEGIN
        'Admin-OldDiscount'                  :           '../../page/admin/olddiscount.html',//@Deprecated
        'Admin-DiscountCourseSet'            :           '../../page/admin/discountcourseset.html',
        'Admin-DiscountList'                 :           '../../page/admin/discountlist.html',
        'Admin-DiscountMgr'                  :           '../../page/admin/discountmgr.html',
        'Admin-DiscountSelfDefine'           :           '../../page/admin/discountselfdefine.html',
        'Admin-DiscountSelfDefineEdit'       :           '../../page/admin/discountselfdefineedit.html',
        'Admin-DiscountSingle'               :           '../../page/admin/discountsingle.html',
        'Admin-DiscountSingleEdit'           :           '../../page/admin/discountsingleedit.html',
        'Admin-DiscountTotal'                :           '../../page/admin/discounttotal.html',
        'Admin-DiscountTotalEdit'            :           '../../page/admin/discounttotaledit.html',
        // Admin折扣与优惠---END
        //---Admin管理端---END


        //---Service客户端---BEGIN
        'Service-Index'                      :           '../../page/service/index.html',
        'Service-BuyNew'                     :           '../../page/service/buynew.html',
        'Service-AddStudent'                 :           '../../page/service/addstudent.html',
        'Service-StudentIndex'               :           '../../page/service/studentindex.html',
        'Service-MgrStudent'                 :           '../../page/service/mgrstudent.html',
        'Service-StudentBirthday'            :           '../../page/service/studentbirthday.html',
        'Service-Record'                     :           '../../page/service/record.html',
        'Service-Settle'                     :           '../../page/service/settle.html',
        'Service-Settings'                   :           '../../page/service/settings.html',
        //---Service客户端---END


        //---Student学员管理 --- BEGIN
        'Student-Index'                      :           '../../page/student/index.html',
        'Student-EditStudent'                :           '../../page/student/editstudent.html',
        'Student-MgrStudent'                 :           '../../page/student/mgrstudent.html',
        //---Student学员管理 --- END

        //---运维页面，超级管理员专用 --- BEGIN
        // 'Super-Index'                        :           '../../page/super/index.html',
        //---运维页面，超级管理员专用 --- END

        'Demo'                               :           '../../page/demo/demo.html',
        'Bar'                                :           '../../page/demo/bar.html',
        'Line'                               :           '../../page/demo/line.html',
        'Pie'                                :           '../../page/demo/pie.html'
    }
});