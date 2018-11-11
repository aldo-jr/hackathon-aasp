var express = require("express");
var app = express();

/* serves main page */
app.get("/", function(req, res) {
  res.sendfile('index.html')
});
app.get("/compromisso", function(req, res) {
  res.sendfile('compromisso.html')
});
app.get("/consulta", function(req, res) {
  res.sendfile('consulta.html')
});
/* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
    console.log('static file request : ' + req.params);
    res.sendfile( __dirname + req.params[0]); 
});

var port = process.env.PORT || 5001;
app.listen(port, function() {
  console.log("Listening on " + port);
});