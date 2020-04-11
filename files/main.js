// npx @adent/parcel-boiler-es6
window.$ = window.jQuery = require("./node_modules/jquery/dist/jquery.min.js");
require("./node_modules/bootstrap/dist/js/bootstrap.min");
require("jquery-ui-dist/jquery-ui.js");

//HERE

// --- HASH ROUTER BEGIN ---

const nihil = (f) => {
  console.log(f);
};

const paths = [
  ["/:section/:tip", nihil, { showSection: "newtip" }],
  ["/:section", nihil, { showSection: "newtip" }],
  ["*", nihil, { showSection: "index" }],
];

const ohc = require("@adent/router")(paths);

// router middleware
ohc((params) => {
  console.log(params);
});
// --- HASH ROUTER BEGIN ---

$(document).ready(() => {
  // on load

  //loaded
  $("#_loader").hide();
  $(".container.onload").show();
  // Router setup
  window.onhashchange = ohc;
  window.onhashchange();
});

//chrome scroll fix
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
