const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middlewares
// app.use(bodyParser.json()); // stara moznost teraz mozem pouzivat rovno express
app.use(express.json());
app.use(cors()); // na cors blbosti z chromu

const posts = require("./routes/api/posts");
const users = require("./routes/users");

app.use("/api/posts", posts);

//PRODUCTION
if (process.env.NODE_ENV === "production") {
	// static folder
	app.use(express.static(__dirname + "/public"));

	// handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port: ${port}`));

// deploy na heroku
