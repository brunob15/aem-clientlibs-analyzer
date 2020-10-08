const fs = require('fs');
const glob = require('glob');
const writeOutput = require('./output-writer');

const filename = '.content.xml';

const isClientlib = function(fileContent) {
    return fileContent.includes('jcr:primaryType="cq:ClientLibraryFolder"');
}

const clientlibReducer = function(clientlibs, file) {
    const content = fs.readFileSync(file, 'utf8');
    
    if (isClientlib(content)) {
        const categories =
            content
                .match(/categories="\[([\S ]+)\]"/)[1]
                .split(',')
                .map(cat => cat.trim());

        const clientlib = {
            categories
        };
        clientlibs.push(clientlib);
        return clientlibs;
    }
    return clientlibs;
}

const findAllClientlibs = function() {
    const options = {
        matchBase: true
    };

    let clientlibs = [];
    glob(filename, options, function (err, files) {
        clientlibs = files.reduce(clientlibReducer, []);
        console.log(clientlibs);
    });
}

module.exports = function(rootFolder) {
    findAllClientlibs();
    fs.readdir(rootFolder, (err, files) => {
        const filesInDir = [];
        files.forEach(file => {
            filesInDir.push(file);
        });
        writeOutput(filesInDir);
    });
}
