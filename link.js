var express = require('express');
var app = express();
const fetch = require('node-fetch');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
var config = require("./config.json");
var bodyParser = require('body-parser')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.googleToken);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const adapter = new FileSync("db.json")
const db = low(adapter)

db.defaults({link : []})
	.write()

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.static("./static/"))

app.post("/updategame", function (req, res) {
	verify(req.body.token).catch(console.error);
	tab = db.get("link").find({ link: req.body.url}).value()
	if (tab.mail != req.body.mail.replace(".", "%°")) {
		res.sendStatus(403)
		return
	}

	var table = {}
	table.title = req.body.title
	table.creator = req.body.creator
	table.link = tab.link
	table.mail = tab.mail
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
	table.number = tab.number

	db.get("link")
		.find({ link: req.body.url})
		.assign(table)
		.write()
	res.redirect("/" + req.body.url)
})

app.post('/submit', function (req, res) {
	verify(req.body.token).catch(console.error);
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
	table.number = 0

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
	verify(req.body.token).catch(console.error);
	if (req.body.mail == db.get("link").find({ link: req.body.link}).value().mail.replace("%°", ".")) {
		db.get("link")
			.remove({ link: req.body.link})
			.write()
		res.status(200).redirect("/user")
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

	if (db.has("link").find({"mail": user}).value() == false) {
		res.sendStatus(404)
		return
	}
	
	var user_game = db.get("link").filter({"mail": user}).value();
	var response = []
	for (i=0; i < user_game.length; i++) {
		response.push(db.get("link").find({ link: user_game[i].link}).value())
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

app.get("/update", function(req, res) {
	if (req.query.link == null) {
		res.sendStatus(404)
		return
	}

	tab = db.get("link").find({ link: req.query.link}).value()
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
		git: tab.git.replace("%°", "."),
		link: tab.link
	}

	res.render("update", tab2)
})

app.get("/:code", function(req, res) {
	if (req.params.code == "favicon.ico") {return}
	if (db.has("link").find({ link: req.params.code}).value()) {
		res.status(404).render("404", {title: req.params.code})
		return
	}
	db.get("link")
		.find({ link: req.params.code})
		.assign({ number: db.get("link").find({ link: req.params.code}).value().number + 1})
		.write()

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
		git: tab.git.replace("%°", "."),
		number: tab.number
	}

	res.render("link", tab2)
})

app.listen(config.port, function() {
	console.log("Démarage du serveur sur le port " + config.port)
});

async function verify(pToken) {
	const ticket = await client.verifyIdToken({
		idToken: pToken,
		audience: config.googleToken,  // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	const userid = payload['sub'];
	// If request specified a G Suite domain:
	//const domain = payload['hd'];
  }