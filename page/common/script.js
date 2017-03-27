!(function(){
	var result = [],
      dependency = ['../../js/third-party/jquery.min.js',
                    '../../js/third-party/require.min.js',
                    '../../js/youke/core.js',
                    '../../js/config/config.js'];
    for (var i = 0; i < dependency.length; i++) {
        result.push('<script src="' + dependency[i] + '"></script>');
    }
    document.write(result.join(''));

    if (!window.location.origin) {//兼容IE8~10
        window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
}());