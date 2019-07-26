#!/usr/bin/env node

console.log('v6', process.argv, process.cwd(), __dirname);
const cwd = process.cwd();
const async = require("async");
const fs = require("fs");

const {
    exec
} = require('child_process');
const path = require('path');

var pkg = JSON.parse(fs.readFileSync(cwd + "/package.json"));
//console.log(pkg.scripts)
pkg.scripts.dev = "parcel index.html";
pkg.scripts.build = "rm build/* ; parcel build index.html -d build --public-url /offline/ --no-source-maps";
fs.writeFileSync(cwd + "/package.json", JSON.stringify(pkg, null, 4))

//main.js
var mainjs = '// npx parcel-boiler-es6\nwindow.$ = window.jQuery = require("./node_modules/jquery/dist/jquery.min.js");\n'
mainjs += 'require("./node_modules/bootstrap/dist/js/bootstrap.min");\n'
mainjs += 'require("jquery-ui-dist/jquery-ui.js");\n'

if (!fs.existsSync(cwd + "/main.js")) fs.writeFileSync(cwd + "/main.js", mainjs)

var indexhtml = '';
indexhtml += '<!DOCTYPE html>\n'
indexhtml += '<html>\n'
indexhtml += '<head>\n'
indexhtml += '    <meta charset=utf-8>\n'
indexhtml += '    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n'
indexhtml += '    <meta name="description" content="">\n'
indexhtml += '    <meta name="author" content="">\n'

indexhtml += '    <link href="./node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">\n'
indexhtml += '    <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.css">\n'
indexhtml += '</head>\n'
indexhtml += '<body>\n\n<script src=main.js></script></body>\n</html>'

if (!fs.existsSync(cwd + "/index.html")) fs.writeFileSync(cwd + "/index.html", indexhtml)

const donpm = function (npm) {

    exec(npm, {
        cwd: cwd
    }, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
        } else {
            console.log("OK", stdout)
        }
        return (err, null)
    })
}


donpm('npm i --save bootstrap');
donpm('npm i --save popper.js');
donpm('npm i --save jquery');
donpm('npm i --save jquery-ui-dist');
donpm('npm i --save @fortawesome/fontawesome-free');
donpm('npm i --save babel-core babel-runtime babel-plugin-transform-runtime');