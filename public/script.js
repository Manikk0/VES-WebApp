function handleSubmit(e) {
    e.preventDefault();

	document.getElementById("imagearea_container").style.height = "";
	document.getElementById("errorMessage").style.display="none";
	if (document.getElementById("output")) {
		document.getElementById("output").remove();
	}

    var imageContainer = document.querySelector('.imagearea-1');
    const ves = this.querySelector("textarea").value;

    if (!ves) {
        return;
    }

	var loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'flex';
    const width = document.querySelector("section:nth-child(2)").clientWidth;

    const formular = new URLSearchParams();
    formular.append('ves', ves);
    formular.append('width', width);

    const url = this.action;
    const method = this.method;
    fetch(url, { method: method, body: formular })
        .then((res) => res.blob())
        .then((image) => {
            var img = new Image();
            img.onload = function () {
				loadingContainer.style.display = 'none';
                imageContainer.appendChild(img);

				var modal = document.getElementById("myModal");
                var modalImg = document.getElementById("img01");
                var captionText = document.getElementById("caption");
                img.style.cursor = "pointer";
                img.onclick = function () {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt;
                }

                var span = document.getElementsByClassName("close")[0];
                span.onclick = function () {
                    modal.style.display = "none";
                }

				document.getElementById("imagearea_container").style.height = "90%";
            };
            img.src = URL.createObjectURL(image);
			img.id = "output";
			img.classList.add("w-100", "h-100", "imagearea-2");
        });

    document.getElementById("errorMessage").style.display = "none";
}

function clearInput() {
    document.getElementById("ves_text").value = "";
	document.getElementById("imagearea_container").style.height = "";
	document.getElementById("errorMessage").style.display="none";
	if (document.getElementById("output")) {
		document.getElementById("output").remove();
	}
}

function downloadImage() {
	var imageElement = document.getElementById("output");
	if (imageElement && imageElement.src) {
		var imgSrc = imageElement.src;
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
	if (imageElement && imageElement.src) {
		var imageURL = imageElement.src;
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

document.querySelector("form").addEventListener("submit", handleSubmit);
document.getElementById('clear').addEventListener('click', clearInput);
document.getElementById('download').addEventListener('click', downloadImage);
document.getElementById('share').addEventListener('click', shareImage);