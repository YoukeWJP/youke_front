/**
 *
 * 解析页面指令的函数
 *
 */
define(['YOUKE.Util', 'YOUKE.Filter'], function() {
    var $scope = YOUKE.Scope,
        $util = YOUKE.Util,
        $filter = YOUKE.Filter;
    var _vm = null,
        cacheV = {};

    function init() {
        var vClass = $('[v-class]'),
            vData = $('[v-data]'),
            vOn = $('[v-on]');
        cacheV = {
            vClass: vClass,
            vData: vData,
            vOn: vOn
        };
        _initEvent();
    }
    //处理v-on的属性
    function __parse_von(dom) {
        var evtValue = dom.attr('v-on');
        var evtList = evtValue.split(',');
        var evtType = [],
            evtFn = [],
            evtPrevent = [],
            evtStop = [],
            prevent = false,
            stop = false;
        evtList.forEach(function(item) {
            var evtObj = item.split('|');
            var evtState = item.split('.');
            prevent = evtState.indexOf('prevent') > -1;
            stop = evtState.indexOf('stop') > -1;
            evtType.push(evtObj[0]);
            var tmp = evtObj[1] || '';
            if (!prevent && !stop) {
                evtFn.push(tmp);
            } else {
                evtFn.push(tmp.substring(0, tmp.indexOf('.')));
            }
            evtPrevent.push(prevent);
            evtStop.push(stop);
        });
        return {
            evtType: evtType,
            evtFn: evtFn,
            evtDom: dom,
            evtPrevent: evtPrevent,
            evtStop: evtStop
        };
    }

    function _initEvent() {
        var doms = cacheV.vOn;
        for (var i = 0; i < doms.length; i++) {
            var dom = $(doms[i]),
                _obj = __parse_von(dom);
            var evtDom = _obj.evtDom,
                evtType = _obj.evtType,
                evtFn = _obj.evtFn,
                evtPrevent = _obj.evtPrevent,
                evtStop = _obj.evtStop;
            for (var j = 0; j < evtType.length; j++) {
                (function(eType, eFn, ePrevent, eStop) { //闭包避免参数的影响
                    evtDom.off(eType).on(eType, function(e) {
                        if ($util.isFunction($scope[eFn])) {
                            if (ePrevent === true) {
                                e.preventDefault();
                            }
                            if (eStop === true) {
                                e.stopPropagation();
                            }
                            $scope[eFn](e);
                        }
                    });
                })(evtType[j], evtFn[j], evtPrevent[j], evtStop[j]);
            }
        }
    }
    //同步
    function sync(data) {
        _vm = data;
        _syncClass();
        _syncData();
    }
    //同步类
    function _syncClass() {
        var doms = cacheV.vClass;
        for (var i = 0; i < doms.length; i++) {
            var value,
                dom = $(doms[i]),
                attr = '_vm.' + dom.attr('v-class');
            try {
                value = eval(attr);
            } catch (e) {
                value = undefined;
            }
            if (typeof value === 'string') { //如果是字符串
                dom.addClass(value);
            } else if ($util.isObject(value)) { //如果是对象
                var _tmpClass = '';
                for (var key in value) {
                    if (value.hasOwnProperty(key) && value[key] === true) {
                        _tmpClass += key + ' ';
                    }
                }
                dom.addClass(_tmpClass);
            } else if ($util.isArray(value)) { //如果是数组
                dom.addClass(value.join(' '));
            }
        }
    }
    //同步数据
    function _syncData() {
        var doms = cacheV.vData;
        for (var i = 0; i < doms.length; i++) {
            var value, dom = $(doms[i]);
            var tagName = dom[0].tagName,
                attrList = ('_vm.' + dom.attr('v-data')).split('|');
            try {
                value = eval(attrList[0]);
            } catch (e) {
                value = undefined;
            }
            attrList.forEach(function(item) {
                if (value == undefined) {
                    return false;
                }
                if ($util.isFunction($filter[item])) {
                    value = $filter[item](value);
                }
            });
            if (value != undefined) {
                if (tagName === 'IMG') {
                    dom.attr('src', value);
                } else if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
                    dom.val(value);
                } else {
                    dom.text(value);
                }
            }
        }
    }
    var $Parse = {
        sync: sync
    };
    init();
    NameSpace.Register('YOUKE.Parse', $Parse);
});