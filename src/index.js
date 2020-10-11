#!/usr/bin/env node
const projectParser = require('./parser');
const clientlibs = projectParser(__dirname + '/../sample-projects/aem-guides-wknd-master');
console.log(JSON.stringify(clientlibs));
