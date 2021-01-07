<template>
	<q-card flat class="bg-teal-7 q-pb-xl text-white my-card full-height">
		<q-card-section>
			<div v-if="!updating" class="text-h6">{{ post.title }}</div>
			<q-input v-else outlined dense v-model="title" dark class="q-mb-md" />
			<div class="text-subtitle2 text-teal-3">by {{ post.author }}</div>
		</q-card-section>

		<q-separator />

		<q-card-section>
			<small
				>{{ getDate(post.created_at) }}
				<q-tooltip content-class="text-teal-10 bg-teal-3" :offset="[10, 10]">
					Created date
				</q-tooltip>
			</small>
			<small
				class="q-ml-sm text-teal-10"
				v-if="post.updated_at.toString() !== 'Invalid Date'"
				>{{ getDate(post.updated_at) }}
				<q-tooltip content-class="bg-teal-10" :offset="[10, 10]">
					Last updated date
				</q-tooltip>
			</small>
		</q-card-section>

		<q-card-section class="q-pt-none">
			<div v-if="!updating">
				{{ post.text }}
			</div>
			<q-input v-else outlined dense v-model="text" dark class="q-mb-md" />
		</q-card-section>

		<q-card-actions class="bg-teal-8 q-pa-sm justify-end absolute-bottom">
			<slot></slot>
			<q-icon
				v-if="updating === false"
				@click="startEditing()"
				size="sm"
				name="far fa-edit"
				class="text-light-blue cursor-pointer"
			/>
			<q-btn
				color="light-blue"
				size="sm"
				unelevated
				dense
				@click="updatePost(post._id)"
				v-if="updating"
				>Edit</q-btn
			>
		</q-card-actions>
	</q-card>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
		},
	},
	data() {
		return {
			updating: false,
			title: this.post.title,
			text: this.post.text,
		};
	},
	methods: {
		getDate(date) {
			return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
		},

		startEditing() {
			this.updating = true;
		},

		async updatePost(id) {
			if (this.post.title === this.title && this.post.text === this.text) {
				this.updating = false;
				return;
			}
			this.updating = false;

			const post = {
				id,
				title: this.title,
				text: this.text,
			};

			this.$store.dispatch("updatePost", post);
		},
	},
};
</script>

<style scoped></style>
