import axios from "axios";

const url = `api/posts/`;

class PostService {
	// get posts
	static getPosts() {
		return new Promise((resolve, reject) => {
			axios
				.get(url)
				.then((res) => {
					const data = res.data;
					resolve(
						data.map((post) => ({
							...post,
							created_at: new Date(post.created_at),
							updated_at: new Date(post.updated_at),
						}))
					);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// create post
	static insertPost(title, author, text) {
		return axios.post(url, {
			title, // to iste ako title: title
			author,
			text,
		});
	}

	// update post
	static updatePost(id, title, text) {
		return axios.put(url + id, {
			title, // to iste ako title: title
			text,
		});
	}

	// delete post
	static deletePost(id) {
		return axios.delete(url + id);
	}
}

export default PostService;
