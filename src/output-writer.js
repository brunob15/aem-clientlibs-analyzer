const fs = require('fs');

const outputDir = __dirname + '/../output';
const outputFile = outputDir + '/output.txt';

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

module.exports = function(lines) {
    clearOrCreateOutputDir();

    lines.forEach(line => {
        line = `${line}\n`;
        fs.appendFile(outputFile, line, function (err) {
            if (err) return console.log(err);
        });
    });
}
