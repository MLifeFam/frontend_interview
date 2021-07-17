const sidebar = require("./sidebar");

module.exports = {
	title: "프론트엔드 개발자를 위한 개발 지식",
	description: "HTML,CSS,Javascript,네트워크 등 프론트엔드 개발자가 꼭 알아야 할 기술 지식에 대해 알아봅니다.",
	head: [
		["meta", { name: "theme-color", content: "#3eaf7c" }],
		["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
		["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
	],
	themeConfig: {
		// repo: "",
		// editLinks: false,
		// docsDir: "",
		// editLinkText: "",
		// nav: [
		// 	{
		// 		text: "Home",
		// 		link: "/",
		// 	},
		// 	{
		// 		text: "Githup",
		// 		link: "https://github.com/MLifeFam/frontend_interview",
		// 	},
		// ],
		// sidebar,
		// smoothScroll: true,
		nav: [
			{
				text: "Home",
				link: "/",
			},
			{
				text: "Githup",
				link: "https://github.com/MLifeFam/frontend_interview",
			},
		],
		sidebar: sidebar.getSidebar(),
	},
	/**
	 * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
	 */
	plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
