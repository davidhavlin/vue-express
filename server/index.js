const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middlewares
// app.use(bodyParser.json()); // stara moznost teraz mozem pouzivat rovno express
app.use(express.json());
app.use(cors()); // na cors blbosti z chromu

const port = process.env.PORT || 5000;

const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

app.listen(port, () => console.log(`server started on port: ${port}`));
