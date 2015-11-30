module.exports = function() {
    var clientApp = 'src/';
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: ''
    };
    var nodeModules = 'node_modules';

    var config = {
        clientApp: 'src/',
        images: 'images/**/*.*',
        index: 'index.html',
        appIndex: './src/index.html',
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
