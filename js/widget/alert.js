/**
 * Created by wjp@youkeonline.cn
 * Author: YoukeWJP
 * Date: 2016/9/14
 * Time: 10:06
 */
define(['YOUKE.Util'], function () {
    var $util = YOUKE.Util;
    //../../images/icons_service/exit-white.png
    var urlBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjI3RjM5QzE2MDlCMTFFNjkwQUE5OTgzQTMwMkQwQjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjI3RjM5QzI2MDlCMTFFNjkwQUE5OTgzQTMwMkQwQjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMjdGMzlCRjYwOUIxMUU2OTBBQTk5ODNBMzAyRDBCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMjdGMzlDMDYwOUIxMUU2OTBBQTk5ODNBMzAyRDBCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkQTGF8AAAClSURBVHjanJMxDoAgDEWJg4NX9AScjpgQHFz0Uk7GWkIVQkoBf/JZ4H2FtkqRAGBGG/SoCvJ76AWt8w0P3xBkuRCCLURpDgYuhIHvLwSXDXhZAnM41eIDJvReOODIxQ+8vyiFyHByz9YQW6wUhRwC7HJ4yDIu9Kn+qPLa1fu3wmwFJHgV3iSEUP9LjSRVx7S2MhfimblnmNKQCHeO80Sz88GPAAMAX9i3zWs6j/4AAAAASUVORK5CYII=';
    var getStyle = function (bgColor) {
        bgColor = bgColor || '#000000';
        var style = 'box-sizing: border-box;'
                  + 'position: absolute;'
                  + 'top: 100px;'
                  + 'left: 50%;'
                  + 'width: 310px;'
                  + 'height: 40px;'
                  + 'line-height: 40px;'
                  + 'padding-left: 30px;'
                  + 'margin-left: -155px;'
                  + 'color: #FFFFFF;'
                  + 'background: ' + bgColor + ';'
                  + 'z-index: 9999;';
        return style;
    };
    var $Alert = {
        /**
         * @param msg 提示信息
         * @param milsec 倒计时毫秒数
         */
        showSuccess : function (msg, milsec) {
            msg = msg || '操作成功';
            milsec = milsec || 1500;
            var styleDiv = getStyle(),
                styleI = 'position: absolute;'
                       + 'background: url('+ urlBase64 + ') no-repeat;'
                       + 'width: 16px;'
                       + 'height: 16px;'
                       + 'top: 12px;'
                       + 'right: 16px;',
                tpl = '<div id="_alert" style="' + styleDiv + '">' + msg + '<i style="' + styleI + '"></i></div>';
            var cb = function () {
                $('body').off('.alert');
                $('#_alert').remove();
            };
            $('body').append(tpl).on('click.alert', '#_alert', cb);
            var timeout = setTimeout(function () {
                cb();
                clearTimeout(timeout);
            }, milsec);
        },
        /**
         * @param msg 提示信息
         * @param milsec 倒计时毫秒数
         */
        showError : function (msg, milsec) {
            msg = msg || '操作失败';
            milsec = milsec || 1500;
            var styleDiv = getStyle('#B65050'),
                styleI = 'position: absolute;'
                       + 'background: url('+ urlBase64 + ') no-repeat;'
                       + 'width: 16px;'
                       + 'height: 16px;'
                       + 'top: 12px;'
                       + 'right: 16px;',
                tpl = '<div id="_alert-error" style="' + styleDiv + '">' + msg + '<i style="' + styleI + '"></i></div>';
            var cb = function () {
                $('body').off('.alert-error');
                $('#_alert-error').remove();
            };
            $('body').append(tpl).on('click.alert-error', '#_alert-error', cb);
            var timeout = setTimeout(function () {
                cb();
                clearTimeout(timeout);
            }, milsec);
        },
        showConfirm: function () {
            var msg, cb, title, len = arguments.length;
            if(len < 3) {
                title = '确认删除';
                msg = arguments[0] || '';
                cb = arguments[1];
            } else if(len === 3) {
                title = arguments[0];
                msg = arguments[1];
                cb = arguments[2];
            }
            var tpl = '<div id="_confirm-delete" style="z-index:999;position:fixed;top:0;right:0;bottom:0;left:0;background: rgba(0,0,0,0.4);">'
                    + '<div style="position:absolute;left:50%;top:50%;width:344px;height:240px;margin-left:-172px;margin-top:-120px;background: #F6F6F6;font-family:Microsoft Yahei;">'
                    + '<h3 style="width:100%;height:50px;line-height:50px;background:#444;color:#FFF;margin-top:0;margin-bottom:0;font-size:16px;"><span style="margin-left:15px;font-weight:normal;">' + title + '</span><i id="_exit" style="float:right;width:16px;height:16px;margin-right:12px;margin-top:17px;background:url(' + urlBase64 + ') no-repeat;"></i></h3>'
                    + '<div style="height:136px;text-align:center;line-height:25px;"><div style="padding-top:45px;margin-left:15px;margin-right:15px;">'+ msg +'</div></div>'
                    + '<div style="position:absolute;width:100%;bottom:0;">'
                    +   '<a href="javascript:void(0);" id="_cancel" style="float:left;text-decoration:none;text-align:center;height:54px;line-height:54px;width:50%;color:#444;background:#DDD;">取消</a>'
                    +   '<a href="javascript:void(0);" id="_confirm" style="float:left;text-decoration:none;text-align:center;height:54px;line-height:54px;width:50%;color:#FFF;background:#307EAC;">确定</a>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
            $('body').append(tpl).on('click.confirm-delete', '#_exit,#_cancel', function () {
                $('body').off('.confirm-delete');
                $('#_confirm-delete').remove();
            }).on('click.confirm-delete', '#_confirm', function () {
                $util.isFunction(cb) && cb();
                $('body').off('.confirm-delete');
                $('#_confirm-delete').remove();
            });
        },
        /**
         * 提示信息
         * @param  {[jQuery|Element]} element  DOM元素，可以是jQuery对象，也可以是原生Element对象
         * @param  {[String]}         msg      提示信息
         */
        showTips: function(element, msg){
            if(!element){
                return;
            }
            element = element[0] || element;
            if(!$util.isDOMElement(element)){
                return;
            }
            msg = msg || '';
            var clientRect = element.getBoundingClientRect();
            var top = clientRect.top,
                left = clientRect.left,
                height = clientRect.height,
                width = clientRect.width;
            var style = 'position: absolute;'
                      + 'left: ' + (left + width + 10) +'px;'
                      + 'top: ' + (top + (height - 28) / 2) +'px;'
                      + 'background: #E9CFCF;'
                      + 'color: #B40700;'
                      + 'min-width: 200px;'
                      + 'height: 28px;'
                      + 'line-height: 28px;'
                      + 'border: 1px solid #C56E71;'
                      + 'border-radius: 2px;'
                      + 'font-size: 12px;'
                      + 'text-align: center;'
                      + 'z-index: 9999;';
            var htm = '<span id="_alert-tips" style="' + style + '">' + msg + '</span>';
            if($('#_alert-tips').length) {
                $('#_alert-tips').remove();
            }
            $('body').append(htm);
            var timeout = setTimeout(function () {
                $('#_alert-tips').remove();
                clearTimeout(timeout);
            }, 2000);
        },
        // 删除提示信息
        hideTips: function(){
            $('#_alert-tips').remove();
        }
    };
    NameSpace.Register('YOUKE.Widget.Alert', $Alert);
});