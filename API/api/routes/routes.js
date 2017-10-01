"use strict";
module.exports = function(app) {
  var proxy = require("../controllers/proxyController");

  // todoList Routes
  app.route("/foreignResources/")
    .get(proxy.getForeignResource)

  app.route("/foo/")
  .get(proxy.foo)

};