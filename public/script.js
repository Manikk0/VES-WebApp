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
		
	document.getElementById("errorMessage").style.display="none";
}

function clearInput() {
    document.getElementById("ves_text").value = "";
	document.getElementById("output").removeAttribute("src");
	document.getElementById("errorMessage").style.display="none";
}

function downloadImage() {
	var imgSrc = document.getElementById("output").src;
	if (imgSrc) {
		var link = document.createElement('a');
		link.href = imgSrc;
		link.download = 'image.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		document.getElementById("errorMessage").style.display="block";
	}
}

document.querySelector("form").addEventListener("submit", handleSubmit);
document.getElementById('clear').addEventListener('click', clearInput);
document.getElementById('download').addEventListener('click', downloadImage);