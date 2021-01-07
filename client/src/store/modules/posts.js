import PostService from "@/PostService";
import { Loading } from "quasar";

export default {
	state: {
		posts: [],
		postsError: "",
	},

	getters: {
		allPosts(state) {
			return state.posts;
		},
	},

	mutations: {
		changePosts(state, posts) {
			state.posts = posts;
		},
		postsError(state, error) {
			state.postsError = error;
		},
	},

	actions: {
		async fetchPosts(context) {
			try {
				const posts = await PostService.getPosts();
				context.commit("changePosts", posts);
			} catch (error) {
				context.commit("postsError", error.message);
			}
		},

		async addPost(context, post) {
			Loading.show({
				message: "Adding article..",
			});
			await PostService.insertPost(post.title, post.author, post.text);
			const posts = await PostService.getPosts();
			context.commit("changePosts", posts);

			Loading.hide();
		},

		async deletePost(context, id) {
			Loading.show({
				message: "Removing article...",
			});
			await PostService.deletePost(id);
			const posts = await PostService.getPosts();
			context.commit("changePosts", posts);
			Loading.hide();
		},

		async updatePost(context, upPost) {
			Loading.show({
				message: "Updating article...",
			});
			// this.startLoading("Updating article...");
			await PostService.updatePost(upPost.id, upPost.title, upPost.text);
			const posts = await PostService.getPosts();
			context.commit("changePosts", posts);
			// this.updating = false;
			Loading.hide();
		},
	},
};
