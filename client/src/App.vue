<template>
	<q-layout>
		<q-page-container>
			<div id="nav">
				<router-link to="/">Homee</router-link> |
				<router-link to="/about">About</router-link>
			</div>
			<q-page padding>
				<router-view />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	name: "LayoutDefault",

	created() {
		// fetchnem posty;
		this.$store.dispatch("fetchPosts");
	},
};
</script>

<style></style>
