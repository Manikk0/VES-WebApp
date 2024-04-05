function handleSubmit(e) {
	e.preventDefault();

	const ves = this.querySelector("textarea").value;
	const width = document.querySelector("section:nth-child(2)").clientWidth;

	const formular = new URLSearchParams();
	formular.append('ves', ves);
	formular.append('width', width);

	const url = this.action;
	const method = this.method;
	fetch(url, {method: method, body: formular})
		.then((res) => res.blob())
		.then((image) => {
			document.querySelector("#output").src = URL.createObjectURL(image);
		})
}
document.querySelector("form").addEventListener("submit", handleSubmit);