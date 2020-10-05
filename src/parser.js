const fs = require('fs');

module.exports = function(rootFolder) {
    console.log(rootFolder);
    fs.readdir(rootFolder, (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
    });
}
