module.exports = function() {
    var clientApp = 'app/';
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: ''
    };
    var nodeModules = 'node_modules';

    var config = {
        images: 'images/**/*.*',
        index: 'index.html',
        appIndex: './app/index.html',
        // app js, with no specs
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.js',
            '**/*.module.js',
            '**/*.js'
        ],

    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: bower.json,
            directory: bower.directory,
            ignorePath: bower.ignorePath
        };
        return options;
    };
    return config;
};
