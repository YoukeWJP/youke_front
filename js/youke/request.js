define(['YOUKE.Util', 'YOUKE.Comm', 'YOUKE.Service', 'YOUKE.Widget.Alert'], function() {
    var $http = YOUKE.Service,
        $util = YOUKE.Util;
    var $request = {
        logout: function(cb) {
            $http.get({
                url: 'api/auth/logout',
                complete: function() {
                    $util.isFunction(cb) && cb();
                }
            });
        }
    };
    NameSpace.Register('YOUKE.Request', $request);
});