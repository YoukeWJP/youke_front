require(['YOUKE.Services', 'YOUKE.Parse'], function(require, exports, module) {
    var $core = YOUKE.Core;
    var $scope = YOUKE.Scope;
    var $http = YOUKE.Services;
    var $parse = YOUKE.Parse;
    var $util = YOUKE.Util;
    console.log(window.echarts);
    console.log($core.getSrc());
    // 测试事件绑定 --- BEGIN
    $scope.testEvent1Click = function(e) {
        console.log(e);
        alert('testEvent1Click');
    };
    $scope.testEvent1Keypress = function() {
        alert('testEvent1Keypress');
    };
    $scope.testEvent2Click = function() {
        alert('testEvent2Click');
    };
    $scope.testEvent2Keypress = function() {
        alert('testEvent2Keypress');
    };
    // 测试事件绑定 --- END
    window.test = {
        cls: {
            red: true,
            green: false,
            blue: true
        },
        M: 'm',
        X: {
            A: [{
                B: 'test'
            }]
        },
        Y: 123,
        Z: {
            a: 'http://www.edaocha.com/userfiles/image/20150815/15161843a6a99dd4826247.jpg'
        }
    };
    $core.Ready(function() {
        console.log('XXXYYYYZZZ');
        //测试数据同步 --- BEGIN
        $parse.sync(test);
        //测试数据同步 --- END
        alert('看到弹框，说明运行正常~~');
        sessionStorage.setItem('test','NMB');
        // $core.nextPage('line');
    });
});