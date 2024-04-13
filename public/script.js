function handleSubmit(e) {
	e.preventDefault();

	var imageContainer = document.querySelector('.imagearea-1');
	const ves = this.querySelector("textarea").value;

	if (!ves) {
		return;
	}

	imageContainer.appendChild(imageToRemove);
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
		
	var modal = document.getElementById("myModal");
	var img = document.getElementById("output");
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");
	img.style.cursor = "pointer";
	img.onclick = function(){
		modal.style.display = "block";
		modalImg.src = this.src;
		captionText.innerHTML = this.alt;
	}
	
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() { 
		modal.style.display = "none";
	}

	document.getElementById("errorMessage").style.display="none";
}

function clearInput() {
    document.getElementById("ves_text").value = "";
	document.getElementById("output").removeAttribute("src");
	document.getElementById("errorMessage").style.display="none";

	var imageToRemove_new = document.getElementById('output');
    var imageContainer = document.querySelector('.imagearea-1');
	imageContainer.removeChild(imageToRemove_new);
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

function shareImage() {
	var imageElement = document.getElementById('output');
	var imageURL = imageElement.src;
	if (imageURL) {
		var tempInput = document.createElement('input');
		tempInput.setAttribute('type', 'text');
		tempInput.setAttribute('value', imageURL);
		document.body.appendChild(tempInput);

		tempInput.select();
		tempInput.setSelectionRange(0, 99999);
		document.execCommand('copy');
		document.body.removeChild(tempInput);
		
		alert('Link bol skopírovaný');
	} else {
		document.getElementById("errorMessage").style.display="block";
	}
}

const imageToRemove = document.getElementById('output');
document.querySelector("form").addEventListener("submit", handleSubmit);
document.getElementById('clear').addEventListener('click', clearInput);
document.getElementById('download').addEventListener('click', downloadImage);
document.getElementById('share').addEventListener('click', shareImage);