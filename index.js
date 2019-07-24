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
/*

donpm('npm i --save bootstrap');
donpm('npm i --save popper.js');
donpm('npm i --save jquery');
donpm('npm i --save jquery-ui-dist');
donpm('npm i --save @fortawesome/fontawesome-free');

*/