define(function() {
    var toString = Object.prototype.toString;
    var ua = window.navigator.userAgent;
    var $Util = {
        xss: function(str, type) {
            //空过滤
            if (!str) {
                return str === 0 ? '0' : '';
            }
            str = str + '';
            type = type || 'htmlEp';
            switch (type) {
                case 'none': //过度方案
                    return str;
                case 'html': //过滤html字符串中的XSS
                    return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r) {
                        return '&#' + r.charCodeAt(0) + ';';
                    }).replace(/ /g, '&nbsp;').replace(/\r\n/g, '<br />').replace(/\n/g, '<br />').replace(/\r/g, '<br />');
                case 'htmlEp': //过滤DOM节点属性中的XSS
                    return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(r) {
                        return '&#' + r.charCodeAt(0) + ';';
                    });
                case 'url': //过滤url
                    return encodeURIComponent(str).replace(/\+/g, '%2B');
                case 'miniUrl':
                    return str.replace(/%/g, '%25');
                case 'script':
                    return str.replace(/[\\"']/g, function(r) {
                        return '\\' + r;
                    }).replace(/%/g, '\\x25').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\x01/g, '\\x01');
                case 'reg':
                    return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a) {
                        return '\\' + a;
                    });
                default:
                    return encodeURIComponent(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r) {
                        return '&#' + r.charCodeAt(0) + ';';
                    }).replace(/ /g, '&nbsp;').replace(/\r\n/g, '<br />').replace(/\n/g, '<br />').replace(/\r/g, '<br />');
            }
        },
        /**
         * flag:
         * 默认格式 2015-10-16 17:35:32
         * 1:2015-10-16
         * 2:2015-10
         */
        format: function(obj) {
            obj = obj || {};
            var _date, value = obj.value,
                flag = obj.flag;
            if (value) {
                _date = new Date(value);
            } else {
                _date = new Date();
            }
            var y = _date.getFullYear(),
                M = _date.getMonth() + 1,
                d = _date.getDate(),
                h = _date.getHours(),
                m = _date.getMinutes(),
                s = _date.getSeconds();
            if (flag === 1) {
                return String(y) + '-' + _addPrefix(M) + '-' + _addPrefix(d);
            } else if (flag === 2) {
                return String(y) + '-' + _addPrefix(M);
            } else {
                return String(y) + '-' + _addPrefix(M) + '-' + _addPrefix(d) + ' ' + _addPrefix(h) + ':' + _addPrefix(m) + ':' + _addPrefix(sec);
            }

            function _addPrefix(val) {
                return val >= 10 ? val : '0' + val;
            }
        },
        isObject: function(val) {
            return toString.call(val) === '[object Object]';
        },
        isArray: function(val) {
            return toString.call(val) === '[object Array]';
        },
        isFunction: function(cb) {
            return typeof cb === 'function';
        },
        isPhone: function(val) {
            var patrn = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
            return patrn.test(val);
        },
        isMobile: function(val) {
            var patrn = /^0?1[2|3|4|5|7|8]\d{9}$/;
            return patrn.test(val);
        },
        //判断是不是数字
        isNumber: function(val) {
            return isFinite(val);
        },
        //判断是不是整数
        isInt: function(val) {
            var patrn = /^[0-9]*$/g;
            return patrn.test(Math.abs(val));
        },
        //判断是不是有效名称
        isWord: function(val) {
            var patrn = /^[\w\-\u4E00-\u9FA5]*$/g; //匹配字母或数字或下划线或横杠或汉字
            return patrn.test(val);
        },
        //判断是不是有效的登录密码
        isValidLoginPwd: function(val) {
            var len = val.length;
            if (len > 16 || len < 6) {
                return false;
            }
            return true;
        },
        //判断是不是有效的验证码
        isValidSmsCode: function(val) {
            var patrn = /^\w*$/g;
            if (val.length != 6 || !patrn.test(val)) {
                return false;
            }
            return true;
        },
        //判断是不是URL链接地址
        isURL: function(val) {
            var regExp = /^http[s]?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
            return regExp.test(val);
        },
        //校验是否是正确的邮箱地址
        isEmail: function(val) {
            var regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return regExp.test(val);
        },
        //判断是不是PC
        isPC: function() {
            var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
            return agents.every(function(item, index) {
                return ua.indexOf(item) === -1;
            });
        },
        //浏览器检测 --- BEGIN
        isIE: function() {
            return !!window.ActiveXObject || 'ActiveXObject' in window;
        },
        isFireFox: function() {
            return !!ua.match(/Firefox\/([\d.]+)/);
        },
        isChrome: function() {
            return !!(ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/));
        },
        isSafari: function() {
            var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
            return !!(webkit && ua.match(/Mobile\//) && !this.isChrome());
        },
        isOpera: function() {
            return !!(ua.match(/opera.([\d.]+)/));
        },
        //浏览器检测 --- END
        //检测是不是DOM对象 --- BEGIN
        isDOMElement: function(ele) {
            return !!(ele && typeof window !== 'undefined' && (ele === window || ele.nodeType));
        },
        //检测是不是DOM对象 --- END
        generateUUID: function() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        // 获取当前URL的参数
        getParams: function() {
            var args = {};
            var query = window.location.search.substring(1) || '',
                pairs = query.split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos == -1) {
                    continue;
                }
                var name = pairs[i].substring(0, pos),
                    value = decodeURIComponent(pairs[i].substring(pos + 1));
                args[name] = value;
            }
            return args;
        },
        //获取URL中的值
        getQuery: function(name, url) {
            var u = url || window.location.search,
                reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
                r = u.substr(u.indexOf('\?') + 1).match(reg);
            return r != null ? r[2] : '';
        },
        //获取按键的编码
        getKeyCode: function(e) { //针对keydown/keyup事件
            e = e || window.event;
            return e.keyCode;
        },
        //获取字符的键码
        getCharCode: function(e) { //针对keypress事件
            e = e || window.event;
            if (typeof e.charCode === 'number') { //IE9以上和其他版本
                return e.charCode;
            } else { //IE8以及之前版本和Opera
                return e.keyCode;
            }
        },
        //获取鼠标所在位置(相对于文档，包含了滚动)
        //event是click事件的event(input,keyup/keydown,keypress事件无效)
        getMousePos: function(e) {
            e = e || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            return {
                'x': x,
                'y': y
            };
        },
        //获取元素element所在位置(相对于文档，包含了滚动)
        getElementPos: function(element) {
            var x = 0,
                y = 0;
            while (element != null) {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent;
            }
            return {
                x: x,
                y: y
            };
        },
        //一个中文按照两个字节算，返回长度
        strLenGB: function(str) {
            return str.replace(/[\u00FF-\uFFFF]/g, '  ').length;
        },
        //同时支持json格式的批量替换和原始的全部替换
        strReplace: function(str, re, rt) {
            if (rt != undefined) {
                _replace(re, rt);
            } else {
                for (var key in re) {
                    _replace(key, re[key]);
                }
            }
            return str;

            function _replace(a, b) {
                str = str.split(a).join(b || '');
            }
        },
        //读取COOKIE
        getCookie: function(name) {
            var reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)'),
                val = document.cookie.match(reg);
            return val ? (val[2] ? decodeURIComponent(val[2]) : '') : null;
        },
        //写入COOKIES
        //默认情况下cookie是暂时存在的，他们存储的值只在浏览器会话期间存在，当用户退出浏览器后这些值也会丢失
        setCookie: function(name, value, expires, path, domain, secure) {
            var exp = new Date();
            // use expires attribute, max-age is not supported by IE
            expires = expires || null;//expires不设置的时候，用户关闭浏览器值就会丢失
            path = path || '/';
            domain = domain || null;
            secure = secure || false;
            expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : '';
            document.cookie = name + '=' + encodeURIComponent(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        },
        //加载脚本，支持回调函数和编码
        loadScript: function(url, cb, charset) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            charset && (script.charset = charset);
            script.onload = function() {
                script.onload = null;
                typeof cb === 'function' && cb();
            };
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        // 判断图片是否加载完成
        loadImage: function(url, cb, loadError) {
            var image = new Image();
            image.onload = function() {
                image.onload = null;
                typeof cb === 'function' && cb(url);
            };
            image.onerror = function() {
                typeof loadError === 'function' && loadError(url);
            };
            image.src = url;
        },
        //加载外部CSS
        loadCSS: function(url, cb) {
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = function() {
                link.onload = null;
                typeof cb === 'function' && cb();
            };
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        //页面全屏
        fullScreen: function() {
            var el = document.documentElement,
                rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
                wscript;
            if (rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject !== 'undefined') {
                wscript = new ActiveXObject('WScript.Shell');
                if (wscript) {
                    wscript.SendKeys('{F11}');
                }
            }
        },
        //退出全屏
        exitFullscreen: function() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        },
        //阻止冒泡
        stop: function(e) {
            e = e || window.event;
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        },
        //阻止默认行为
        prevent: function(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        //解析style
        parseStyle: function(style) {
            style = style || '';
            var result = {},
                list = style.split(';');
            for (var i = 0; i < list.length; i++) {
                if (list[i]) {
                    var item = list[i].split(':');
                    result[item[0].trim()] = item[1].trim();
                }
            }
            return result;
        },
        //调试CSS用
        debugCSS: function() {
            [].forEach.call(document.getElementsByTagName('*'), function(a) {
                a.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16);
            });
        }
    };
    NameSpace.Register('YOUKE.Util', $Util);
});