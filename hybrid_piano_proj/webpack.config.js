const path = require('path');

module.exports = {
    entry: './piano_inventory/front_end/piano_inventory/index.js',
    output: {
        filename: 'indexBundle.js',
        path: path.resolve(__dirname, './piano_inventory/static/piano_inventory'),
    }
}