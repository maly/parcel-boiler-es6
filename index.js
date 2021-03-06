#!/usr/bin/env node

/*
npm init --scope=@adent
npm publish --access=public
*/

//https://icons8.com/preloaders/en/filtered-search/all/svg/

console.log("v6", process.argv, process.cwd(), __dirname);

const cwd = process.cwd();
//const async = require("async");
const fs = require("fs");

const { exec } = require("child_process");
const path = require("path");

const fileCopy = (name, name2) => {
  if (!name2) name2 = name;
  if (fs.existsSync(cwd + "/" + name2)) name2 = "--" + name2;
  let data = fs.readFileSync(__dirname + "/files/" + name, "utf-8");
  fs.writeFileSync(cwd + "/" + name2, data);
};

var pkg;
if (fs.existsSync(cwd + "/package.json")) {
  pkg = JSON.parse(fs.readFileSync(cwd + "/package.json"));
  pkg.scripts.dev = "parcel index.html";
  pkg.scripts.build =
    "parcel build index.html -d .deploy --public-url / --no-source-maps";
} else {
  pkg = {
    name: "any-name",
    version: "1.0.0",
    description: "",
    main: "index.js",
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
      dev: "parcel index.html",
      build:
        "parcel build index.html -d ../deploy --public-url / --no-source-maps",
    },
    author: "Martin Malý <maly@maly.cz>",
    license: "MIT",
    dependencies: {
      "@babel/plugin-transform-runtime": "^7.11.0",
      "@babel/runtime": "^7.11.2",
      "@fortawesome/fontawesome-free": "^5.14.0",
      bootstrap: "^4.5.2",
      "core-js": "^3.6.5",
      jquery: "^3.5.1",
      "jquery-ui-dist": "^1.12.1",
      "popper.js": "^1.16.1",
    },
    devDependencies: {
      "@babel/core": "^7.11.1",
      "@babel/preset-env": "^7.11.0",
      "babel-plugin-transform-runtime": "^6.23.0",
      cssnano: "^4.1.10",
          "parcel-plugin-compress": "^1.1.0",
    "parcel-plugin-nuke-dist": "^1.0.1",
    "parcel-plugin-static-files-copy": "^2.4.4",
    "parcel-plugin-text": "^0.9.6",
    "parcel-plugin-uglify": "^1.0.0",
    "posthtml-include": "^1.4.3",
    "uglify-js": "^3.10.1"
    },
  };
}

//console.log(pkg.scripts)
fs.writeFileSync(cwd + "/package.json", JSON.stringify(pkg, null, 4));

let dir = "./img";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
fileCopy("img/loader-drop.svg");
fileCopy("img/loader-balls.svg");
fileCopy("img/loader-ring.svg");

//Another files
fileCopy(".eslintrc.js");
fileCopy(".babelrc");
fileCopy(".posthtmlrc");
fileCopy(".parcel-plugin-textrc");
fileCopy("gitignore", ".gitignore");
fileCopy("main.js");
fileCopy("index.html");

//

/*
//main.js
var mainjs =
  '// npx parcel-boiler-es6\nwindow.$ = window.jQuery = require("./node_modules/jquery/dist/jquery.min.js");\n';
mainjs += 'require("./node_modules/bootstrap/dist/js/bootstrap.min");\n';
mainjs += 'require("jquery-ui-dist/jquery-ui.js");\n';
mainjs += "\n//HERE\n\n";
mainjs += "\n$(document).ready(() => {\n// on load\n})\n";

if (!fs.existsSync(cwd + "/main.js"))
  fs.writeFileSync(cwd + "/main.js", mainjs);
*/
/*
var indexhtml = "";
indexhtml += "<!DOCTYPE html>\n";
indexhtml += "<html>\n";
indexhtml += "<head>\n";
indexhtml += "    <meta charset=utf-8>\n";
indexhtml +=
  '    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n';
indexhtml += '    <meta name="description" content="">\n';
indexhtml += '    <meta name="author" content="">\n';

indexhtml +=
  '    <link href="./node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">\n';
indexhtml +=
  '    <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.css">\n';
indexhtml += "</head>\n";
indexhtml += "<body>\n\n<script src=main.js></script></body>\n</html>";

if (!fs.existsSync(cwd + "/index.html"))
  fs.writeFileSync(cwd + "/index.html", indexhtml);
*/

const donpm = function (npm) {
  exec(
    npm,
    {
      cwd: cwd,
    },
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log("OK", stdout);
      }
      return err, null;
    }
  );
};

donpm("npm i --save bootstrap");
donpm("npm i --save popper.js");
donpm("npm i --save jquery");
donpm("npm i --save jquery-ui-dist");
donpm("npm i --save @fortawesome/fontawesome-free");
donpm("npm i --save @babel/runtime @babel/plugin-transform-runtime core-js");
donpm(
  "npm i --save-dev @babel/core @babel/preset-env babel-plugin-transform-runtime cssnano"
);
donpm("npm i --save @adent/router");
donpm("npm i --save @adent/czech-flex");
donpm("npm i --save @adent/message-broker");

donpm("npm i --save-dev posthtml-include uglify-js");
donpm("npm i --save-dev parcel-plugin-nuke-dist parcel-plugin-compress parcel-plugin-static-files-copy parcel-plugin-text parcel-plugin-uglify posthtml-include");

/*

        "dependencies": {
          "@babel/plugin-transform-runtime": "^7.7.6",
          "@babel/runtime": "^7.8.3",
          "@fortawesome/fontawesome-free": "^5.9.0",
          "bootstrap": "^4.3.1",
          "core-js": "^3.6.4",
          "jquery": "^3.4.1",
          "jquery-ui-dist": "^1.12.1",
          "popper.js": "^1.15.0",
          "remove-accents": "^0.4.2"
        },
        "devDependencies": {
          "@babel/core": "^7.7.7",
          "@babel/preset-env": "^7.7.7",
          "babel-plugin-transform-runtime": "^6.23.0",
          "cssnano": "^4.1.10"
        }
*/
