const fs = require('fs');
const glob = require('glob');
const writeOutput = require('./output-writer');

const filename = '.content.xml';
const GLOB_OPTIONS = {
    matchBase: true
};
const CATEGORIES = 'categories';
const EMBED = 'embed';
const DEPENDENCIES = 'dependencies';

/*
    * Checks if a XML file is a client library
    * @fileContent: content of the XML file
*/
const isClientlib = function(fileContent) {
    return fileContent.includes('jcr:primaryType="cq:ClientLibraryFolder"');
}

/*
    * Parses the XML file to get the value of a specified attribute.
    * @content: content of the XML file
    * @attribute: name of the attribute to extract
*/
const extractAttributeFromXML = function(content, attribute) {
    const pattern = new RegExp(`${attribute}="\\[([\\S ]+)\\]"`);
    const match = content.match(pattern);
    return match ? match[1].split(',').map(val => val.trim()) : null;
}

/*
    * Processes a .content.xml file.
    * If the file represents a client library then if extracts its
    * properties, builds an object and appends it to the list.
    * 
    * @clientlibs: array containing all clientlibs detected
    * @file: name of the file to be parsed
*/
const addIfClientlib = function(clientlibs, file) {
    const content = fs.readFileSync(file, 'utf8');
    
    if (isClientlib(content)) {
        const categories = extractAttributeFromXML(content, CATEGORIES);
        const embeds = extractAttributeFromXML(content, EMBED);
        const dependencies = extractAttributeFromXML(content, DEPENDENCIES);

        const clientlib = {
            path: file,
            ...(categories && { categories }),
            ...(embeds && { embeds }),
            ...(dependencies && { dependencies })
        };
        clientlibs.push(clientlib);
    }
    return clientlibs;
}

/*
    * Looks for all .content.xml files within a folder
    * and extract the content of those which are client libraries.
    * The result is an array of objects containing the information
    * of all the clientlibraries.
*/
const findAllClientlibs = function() {
    const files = glob.sync(filename, GLOB_OPTIONS);
    return files.reduce(addIfClientlib, []);
}

module.exports = function() {
    const clientlibs = findAllClientlibs();
    writeOutput(clientlibs);
};
