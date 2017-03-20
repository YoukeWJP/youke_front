define(function() {
    var $Adapter = {
        result: {
            defaultResult: function(data) {
                return data;
            }
        }
    };
    NameSpace.Register('YOUKE.Adapter', $Adapter);
});