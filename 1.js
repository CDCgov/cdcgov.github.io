username = 'mathieucaroff';

w = window;
Promise.all(
	Array.from(Array(Math.ceil(1 + 184 / 30)).keys()).map((p) =>
		fetch(`//api.github.com/users/{username}/repos?page=${p}`).then((r) => r.json()),
	),
).then((all) => {
	w.jo = [].concat(...all);
});