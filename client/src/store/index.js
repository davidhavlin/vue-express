import Vue from "vue";
import Vuex from "vuex";
import posts from "./modules/posts";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		count: 0,
	},
	mutations: {
		increment(state) {
			state.count++;
		},
	},
	modules: {
		posts,
	},
});

export default store;
