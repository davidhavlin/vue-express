<template>
	<q-page>
		<h1 class="text-h4 text-center">Latest Posts</h1>

		<div class="row">
			<div
				v-for="post in posts"
				:key="post._id"
				class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm "
			>
				<single-post @fetchPosts="posts = $event" :post="post">
					<q-icon
						@click="removePost(post._id)"
						size="sm"
						name="far fa-trash-alt"
						class="text-pink cursor-pointer q-mr-sm"
					/>
				</single-post>
			</div>
		</div>

		<!-- formular dat inde -->
		<div class="row justify-center q-pa-lg">
			<div class="col-xs-12 col-md-6">
				<q-form
					@submit="handleSubmit"
					@reset="handleReset"
					class="q-gutter-md"
					color="yellow"
					ref="form"
				>
					<q-input
						filled
						v-model="title"
						color="teal-14"
						label="Your Title *"
						label-color="teal-8"
						hint="Title of your article"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type something',
						]"
					/>
					<q-input
						filled
						v-model="author"
						color="teal-14"
						label="Your Name *"
						label-color="teal-8"
						hint="Name of Author"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type something',
							(val) => (val && val.length < 20) || 'Your name is too long',
						]"
					/>

					<q-input
						label="Your Post text *"
						label-color="teal-8"
						color="teal-14"
						v-model="text"
						filled
						type="textarea"
						hint="Text of your post"
					/>

					<div>
						<q-btn
							unelevated
							label="Submit"
							type="submit"
							color="teal-14"
							bg-color="red"
						/>

						<q-btn
							label="Reset"
							type="reset"
							color="teal-8"
							flat
							class="q-ml-sm"
						/>
					</div>
				</q-form>
			</div>
		</div>
	</q-page>
</template>

<script>
import singlePost from "./posts/single-post.vue";
import { mapActions } from "vuex";

export default {
	components: { singlePost },
	name: "PostComponent",
	data() {
		return {
			error: "",
			title: "",
			author: "",
			text: "",
		};
	},
	computed: {
		posts() {
			return this.$store.state.posts.posts;
		},
	},

	methods: {
		...mapActions(["addPost", "deletePost"]),

		handleSubmit() {
			const post = {
				title: this.title,
				author: this.author,
				text: this.text,
			};
			this.addPost(post);
			this.handleReset();
		},
		removePost(id) {
			this.deletePost(id);
		},

		handleReset() {
			// this.$refs.form.reset();
			this.title = null;
			this.text = null;
			this.author = null;
		},
	},
};
</script>

<style scoped></style>
