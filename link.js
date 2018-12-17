var express = require('express');
var app = express();
const fetch = require('node-fetch');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
var config = require("./config.json");
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const adapter = new FileSync("db.json")
const db = low(adapter)

db.defaults({link : [], user: {}})
	.write()

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.static("./static/"))

app.post('/submit', function (req, res) {
	var table = {}
	table.title = req.body.title
	table.creator = req.body.creator
	table.link = req.body.url
	table.mail = req.body.mail.replace(".", "%°")
	table.image = req.body.image.replace(".", "%°")
	table.description = req.body.description.replace(".", "%°")
	table.itch = req.body.itch.replace(".", "%°")
	table.ng = req.body.ng.replace(".", "%°")
	table.gj = req.body.gj.replace(".", "%°")
	table.steam = req.body.steam.replace(".", "%°")
	table.ag = req.body.ag.replace(".", "%°")
	table.ld = req.body.ld.replace(".", "%°")
	table.gp = req.body.gp.replace(".", "%°")
	table.as = req.body.as.replace(".", "%°")
	table.git = req.body.git.replace(".", "%°")

	if (db.has("user." + req.body.mail.replace(".", "%°")).value() == false) {
		db.set("user." + req.body.mail.replace(".", "%°"), [req.body.url])
			.write()
	} else {
		db.get("user." + req.body.mail.replace(".", "%°"))
			.push(req.body.url)
			.write()
	}
	db.get("link")
		.push(table)
  		.write()

  	res.redirect("/" + req.body.url)
  	return
});

app.get("/verify", function(req, res) {
	if (db.has("link").find({ link: req.query.link}).value()) {
		res.sendStatus(409)
	} else {
		res.sendStatus(200)
	}
	return
})

app.post("/delete", function(req, res) {
	if (req.body.mail == db.get("link").find({ link: req.body.link}).value().mail.replace("%°", ".")) {
		db.get("link")
			.remove({ link: req.body.link})
			.write()
		var link = db.get("user." + req.body.mail.replace(".", "%°")).value();
		var pos = link.indexOf(req.body.link)
		var link = link.splice(pos, 0)
		db.set("user." + req.body.mail.replace(".", "%°"), link)
			.write()
		res.redirect("/user")
	} else {
		res.sendStatus(401)
	}
})

app.get("/usergame", function(req, res) {
	if (req.query.user == null) {
		res.sendStatus(400)
		return
	}

	var user = req.query.user.replace(".", "%°")

	if (db.has("user." + user).value() == false) {
		res.sendStatus(404)
		return
	}
	
	var user_game = db.get("user." + user).value();
	var response = []
	for (i=0; i < user_game.length; i++) {
		response.push(db.get("link").find({ link: user_game[i]}).value())
	}
	res.status(200).json(response)	
	return
}) 

app.get("/user", function(req, res) {
	res.sendFile(__dirname + "/static/user.html")
})

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/static/user.html")
})


app.get("/:code", function(req, res) {
	if (req.params.code == "favicon.ico") {return}
	if (db.has("link").fill({ link: req.params.code}).value()) {
		res.status(404).render("404", {title: req.params.code})
		return
	}
	tab = db.get("link").find({ link: req.params.code}).value()
	var tab2 = {
		title: tab.title, 
		creator: tab.creator, 
		image: tab.image.replace("%°", "."),
		description: tab.description.replace("%°", "."),
		itch: tab.itch.replace("%°", "."),
		ng: tab.ng.replace("%°", "."),
		gj: tab.gj.replace("%°", "."),
		steam: tab.steam.replace("%°", "."),
		ag: tab.ag.replace("%°", "."),
		ld: tab.ld.replace("%°", "."),
		gp: tab.gp.replace("%°", "."),
		as: tab.as.replace("%°", "."),
		git: tab.git.replace("%°", ".")
	}

	res.render("link", tab2)
})

app.listen(config.port, function() {
	console.log("Démarage du serveur sur le port " + config.port)
});