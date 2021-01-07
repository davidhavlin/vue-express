<template>
	<div class="home">
		<h1>HOMEEEEE</h1>
		<post-component />
	</div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";
// @ is an alias to /src

export default {
	name: "Home",
	components: {
		PostComponent,
	},
};
</script>
