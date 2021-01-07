const path = require("path");

module.exports = {
	outputDir: path.resolve(__dirname, "../server/public"), // defaultne vue ulozi subory do dist v tomto projekte ale ja chcem staticke subory ulozit do server priecinka
	devServer: {
		proxy: {
			"/api": {
				target: "http://localhost:5000", // nemusim napr v postservice.js pouzivat tuto url ale same mi to v dev mode prida
			},
		},
	},
	pluginOptions: {
		quasar: {
			importStrategy: "kebab",
			rtlSupport: false,
		},
	},
	transpileDependencies: ["quasar"],
};
