// Detects the correct require path for the DALi node-addon on
// Ubuntu 14.04, and on Tizen 3.0 TV profile

var fs = require('fs');

// Counter variable.
var onTizen = false;
var dalilib = 'dali';
var desktopPrefix = process.env['DESKTOP_PREFIX'];
var daliRoot = '';

try {
    onTizen = fs.statSync('/etc/tizen-release').isFile();
} catch (e) {
    // Nothing to do
}

if (! onTizen ) {
    if (typeof desktopPrefix === 'undefined') {
        console.warn("Please source the DALi setenv Bash script before launching DALi.");
    } else {
        daliRoot = desktopPrefix.replace('/dali-env/opt', '');
        console.log("Ubuntu: Using daliroot=" + daliRoot);
        dalilib = daliRoot + '/dali-toolkit/node-addon/build/Release/dali'
    }
}
console.log("dalilib set to: " + dalilib)       
        
// Export our public API.
exports.onTizen = onTizen;
exports.dalilib = dalilib;
