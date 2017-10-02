import childprocess from 'child_process';
import colors from 'colors';
import path from 'path';
import _ from 'underscore';
import fs from 'fs';

const env = process.env.NODE_ENV;
const { exec } = childprocess;
const { extensions } = JSON.parse(fs.readFileSync('extensions.json'));
const rootDirectory = path.dirname(__dirname);
const command = `npm run ${env}`;
const extensionName = process.argv[2];

if(extensionName) {
    const p = exec(command, { cwd: `${rootDirectory}${path.sep}${extensionName}`});
    console.log(colors.green('Extension: ' + extensionName));
    p.stdout.on('data', data => console.log(data));
    p.stderr.on('data', data => console.log(data));
    p.on('close', code => console.log(code));

} else {
    const processes = extensions.map(e => exec(command, { cwd: `${rootDirectory}${path.sep}${e.name}`}));
    processes.forEach(p => {
        p.stdout.on('data', data => console.log(data));
        p.stderr.on('data', data => console.log(data));
        p.on('close', code => console.log(code));
    });
}

