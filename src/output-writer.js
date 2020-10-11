const fs = require('fs');

const outputDir = __dirname + '/../output';
const outputFile = outputDir + '/output.json';

/*
    * Creates an output folder in case it does not exist or clears in other case.
*/
const clearOrCreateOutputDir = function() {
    const outputDirExists = fs.existsSync(outputDir);
    const outputFileExists = fs.existsSync(outputFile);
    if (outputDirExists) {
        if (outputFileExists) {
            fs.unlinkSync(outputFile);
        }
    } else {
        fs.mkdirSync(outputDir);
    }
}

module.exports = function(json) {
    clearOrCreateOutputDir();
    fs.writeFile(outputFile, JSON.stringify(json), function (err) {
        if (err) return console.log(err);
    });
}
