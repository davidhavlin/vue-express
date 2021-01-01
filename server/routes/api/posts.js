const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// GET POSTS
router.get("/", async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

// ADD POST
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

// DELETE POST
router.delete("/:id", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

// UPDATE POST
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

async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect(
		`mongodb+srv://david:kazafat1234@vue-express.shjpn.mongodb.net/vue-express?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
		}
	);

	return client.db("vue-express").collection("posts");
}

module.exports = router;
