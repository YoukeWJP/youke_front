!(function() {
    window.NameSpace = {
        Register: function(name, cls) {
            var context = window,
                arr = name.split('.');
            for (var i = 0, len = arr.length; i < len; i++) {
                var str = arr[i];
                if (!context[str]) {
                    context[str] = {};
                }
                if (i < len - 1) {
                    context = context[str];
                } else {
                    context[str] = cls;
                }
            }
        }
    };
    var configObj = null,
        time = new Date().getTime();
    window[time] = {};
    var $Scope = window[time];
    var config = function(obj) {
        // 兼容处理：gulp替换必须带有.js后缀，但是requirejs不能带有.js后缀 --- BEGIN
        var dot = 0,
            _obj = {};
        for (var key in obj.paths) {
            dot = obj.paths[key].lastIndexOf('.js');
            if (obj.paths[key].substring(dot) === '.js') {
                _obj[key] = obj.paths[key].substring(0, dot);
            } else {
                _obj[key] = obj.paths[key];
            }
        }
        obj.paths = _obj;
        // 兼容处理：gulp替换必须带有.js后缀，但是requirejs不能带有.js后缀 --- END
        require(obj);
    };
    var initPage = function(cb) {
        var includes = $('include');
        var index = 0,
            len = includes.length;
        __loadTemp();

        function __loadTemp() {
            var src = $(includes[index]).attr('src');
            if (index < len) {
                $.ajax({
                    url: src,
                    dataType: 'html',
                    success: function(htm) {
                        $(includes[index]).replaceWith(htm);
                    },
                    complete: function() {
                        index++;
                        __loadTemp();
                    }
                });
            } else {
                typeof cb === 'function' && cb();
            }
        }
    };
    var ready = function(cb) {
        $(function() {
            initPage(cb);
        });
    };
    var $Core = {
        Ready: function(cb, flag) {
            ready(cb);
        },
        config: function(obj) {
            configObj = obj;
            config(obj.loadConfig);
        },
        getEnv: function() {
            return configObj.env;
        },
        getService: function() {
            return configObj.services;
        },
        getSrc: function() {
            var env = configObj.env,
                serve = configObj.services,
                sev = env.sever.toLowerCase();
            var src = serve[sev] || window.location.origin;
            if (src.lastIndexOf('/') === src.length - 1) {
                return src;
            }
            return src + '/';
        },
        getHeaders: function() {
            return configObj.headers;
        },
        getApiConfig: function() {
            return configObj.apiConfig;
        },
        nextPage: function(str, param) {
            if (!str) {
                return;
            }
            var route = configObj.route;
            var search = '',
                list = [];
            if (route && route[str]) {
                str = route[str];
            }
            if (Object.prototype.toString.call(param) === '[object Object]') {
                for (var key in param) {
                    list.push(key + '=' + param[key]);
                }
                if (list.length) {
                    search = '?' + list.join('&');
                }
            }
            window.location.href = str + search;
        }
    };
    NameSpace.Register('YOUKE.Core', $Core);
    NameSpace.Register('YOUKE.Scope', $Scope);
}());