const path = require('path');

module.exports = {
    entry: '.client/src/index.js',
    output: {
        filename: 'tp_bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
}