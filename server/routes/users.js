const express = require("express");
const mongodb = require("mongodb");
const dotenv = require("dotenv").config();

const router = express.Router();

// GET
router.get("/", async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

// ADD USER
router.post("/", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		title: req.body.title,
		author: req.body.author,
		text: req.body.text,
		created_at: new Date(),
		updated_at: null,
	});
	res.status(201).send();
});

// DELETE USER
router.delete("/:id", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

// UPDATE USER
router.put("/:id", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{
			$set: {
				title: req.body.title,
				text: req.body.text,
				updated_at: new Date(),
			},
		}
	);
	res.status(200).send();
});

async function loadUsersCollection() {
	const client = await mongodb.MongoClient.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
	});

	return client.db("vue-express").collection("users");
}

module.exports = router;
