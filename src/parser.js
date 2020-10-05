const fs = require('fs');
const outputDir = __dirname + '/../output';
const outputFile = outputDir + '/output.txt';

const writeOutput = function(output) {
    output = `${output}\n`;
    fs.appendFile(outputFile, output, function (err) {
        if (err) return console.log(err);
    });
}

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

module.exports = function(rootFolder) {
    clearOrCreateOutputDir();
    fs.readdir(rootFolder, (err, files) => {
        files.forEach(file => {
            writeOutput(file);
        });
    });
}
