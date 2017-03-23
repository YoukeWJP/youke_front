define(['YOUKE.Adapter', 'YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Widget.Alert'], function() {
    var $core = YOUKE.Core,
        $adapter = YOUKE.Adapter,
        Alert = YOUKE.Widget.Alert,
        $comm = YOUKE.Comm,
        $util = YOUKE.Util;
    var apiConfig = $core.getApiConfig(),
        defaultHeaders = $.extend(true, {}, {
            'uid': $util.generateUUID(),
        }, $core.getHeaders());

    function formatURL(url) {
        var urls = url.split('|');
        return {
            u: urls[0],
            r: $adapter.result[urls[1]]
        };
    }

    function ajax(obj) {
        var url = obj.url;
        if (apiConfig && apiConfig[url]) {
            obj.url = apiConfig[url];
        } else {
            if (url.indexOf('/') === 0) {
                obj.url = $core.getSrc() + url.substring(1);
            } else {
                obj.url = $core.getSrc() + url;
            }
        }
        var _o = formatURL(obj.url);
        var resultFn = _o.r;
        obj.url = _o.u;
        // 如果header的Content-Type是application/json，则需要序列化
        if (defaultHeaders['Content-Type'].indexOf('application/json') !== -1 && $util.isObject(obj.data)) {
            obj.data = JSON.stringify(obj.data);
        }
        // 执行顺序beforeSend->success|error->complete
        obj.beforeSend = $util.isFunction(obj.beforeSend) ? obj.beforeSend : function() {};
        obj.complete = $util.isFunction(obj.complete) ? obj.complete : function() {};
        if ($util.isFunction(resultFn)) {
            var tmpFn = $.extend(true, {}, obj);
            obj.success = function(data) {
                if (data.code === $comm.HttpStatus.unlogin) {
                    $core.nextPage('Login-Login');
                } else if (data.code === $comm.HttpStatus.noauth) {
                    Alert.showError(data.message || '无权限');
                } else {
                    tmpFn.success(resultFn(data));
                }
            };
        }
        $.ajax(obj);
    }

    function formatHeader(obj, type) {
        var _o = $.extend(true, {}, {
            headers: defaultHeaders,
            dataType: 'json',
            type: type
        }, obj);
        ajax(_o);
    }
    var $http = {
        get: function(obj) {
            formatHeader(obj, 'GET');
        },
        post: function(obj) {
            formatHeader(obj, 'POST');
        }
    };
    NameSpace.Register('YOUKE.Services', $http);
});