// ==UserScript==
// @name         Hololive Easy Template
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Trying
// @author       TellowKrinkle
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==
if (window.top !== window.self) {
	window.addEventListener('load', () => {
		let templates;
		const opacity = 1;
		const camera = document.querySelector("mona-lisa-embed").shadowRoot.querySelector("mona-lisa-camera");
		const canvas = camera.querySelector("mona-lisa-canvas");
		const container = canvas.shadowRoot.querySelector('.container');
		function addImage(src, posX, posY) {
			let img = document.createElement("img");
			img.onload = () => {
				const width = img.width;
				const height = img.height;
				const canvas = document.createElement("canvas");
				canvas.width = width * 3;
				canvas.height = height * 3;
				canvas.style = `position: absolute; left: ${posX}px; top: ${posY}px; image-rendering: pixelated; width: ${width}px; height: ${height}px;`;
				const ctx = canvas.getContext("2d");
				ctx.globalAlpha = opacity;
				for (let y = 0; y < height; y++) {
					for (let x = 0; x < width; x++) {
						ctx.drawImage(img, x, y, 1, 1, x * 3 + 1, y * 3 + 1, 1, 1);
					}
				}
				container.appendChild(canvas);
			};
			img.src = src;
		}
		function setTemplate(document) {
			templates = document
		}
		function httpGetAsync(theUrl, callback)
			{
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.onreadystatechange = function() { 
					if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
						callback(xmlHttp.responseText);
				}
				xmlHttp.open("GET", theUrl, true); // true for asynchronous 
				xmlHttp.send(null);
			}

		templates = httpGetAsync("https://raw.githubusercontent.com/DutchEllie/holotemplate/main/all-templates.csv", setTemplate)
		console.log(templates)
		/* parse CSV here */
		
	}, false);
}

