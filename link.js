var express = require('express');
var app = express();
const fetch = require('node-fetch');
var config = require("./config.json")

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.static("static"))

app.listen(config.port, function() {
	console.log("Démarage du serveur sur le port " + config.port)
});