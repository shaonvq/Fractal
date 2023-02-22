const container = document.getElementById("webContainer");
var maxSpokesSlider = document.getElementById("Slider");
var maxSpiralSlider = document.getElementById("spiralSlider");


function degToRad(degrees) {
  return -(degrees * Math.PI / 180);
}

var maxSpokes = 10;
var maxSpirals = 9;

maxSpokesSlider.oninput = function() {
  maxSpokes = this.value;
}
maxSpiralSlider.oninput = function() {
  maxSpirals = this.value;
}



function renderWeb(maxSpokes) {

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("viewBox", "0 0 1000 1000"); // set the view box
	svg.setAttribute("width", "100%"); // set the width to 100%
	svg.setAttribute("height", "100%"); // set the height to 100%
	container.appendChild(svg);

	async function createSpoke(degrees, length) {
		const x2 = 500 + length * Math.cos(degToRad(degrees));
		const y2 = 500 + length * Math.sin(degToRad(degrees));
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		await new Promise(resolve => {
			line.setAttribute("x1", 500);
			line.setAttribute("y1", 500);
			line.setAttribute("stroke-width",1  );
			line.setAttribute("stroke", "black");
			svg.appendChild(line);
			line.style.strokeDasharray = length;
			line.style.strokeDashoffset = length;
			line.getBoundingClientRect();
			line.style.transition = `stroke-dashoffset ${1.5/maxSpokes}s ease-in-out`;
			line.setAttribute("x2", x2);
			line.setAttribute("y2", y2);
			line.style.strokeDashoffset = 0;
			line.addEventListener("transitionend", () => {
			resolve();
			});
		});
	}

	async function createSpokes(maxSpokes) {
		maxSpokesSlider.oninput = function() {
		  maxSpokes = this.value;
		  svg.remove();
		  renderWeb(maxSpokes);
		};

		const length = 500;
		const degrees = 90;
		for (let i = 0; i < maxSpokes; i++) {
		  const newdegrees = degrees - 360 / maxSpokes * i;
		  await createSpoke(newdegrees, length);
		}
	}
  
	async function createSpiral(maxSpokes){
		maxSpiralSlider.oninput = function() {
		  maxSpirals = this.value;
		  svg.remove();
		  renderWeb(maxSpokes);
		}

		var length = 500;
		var x1 = 500;
		var y1 = 0;
		var degrees = 90;
		var depth = 1;
		const spiralMargin = 500/maxSpirals;
		for (let i = 0; i < maxSpirals; i++) {
			

			await createSpiralpart(x1,y1,degrees,maxSpokes,length,depth);
			y1 = y1 + spiralMargin;
			length = length - spiralMargin;
		}
	}
	
	function createSpiralpart(x1,y1,degrees,maxSpokes,length,depth){

		if(depth > maxSpokes){
			
			return;
		}
		var newdegrees = degrees - 360 / maxSpokes ;

		
		const x2 = 500 + length * Math.cos(degToRad(newdegrees));
		const y2 = 500 + length * Math.sin(degToRad(newdegrees));
		
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line")

		line.setAttribute("x1", x1);
		line.setAttribute("y1", y1);
		line.setAttribute("stroke-width",1  );
		line.setAttribute("stroke", "black");
		svg.appendChild(line);
		line.style.strokeDasharray = Math.abs(x2-x1) + Math.abs(y2-y1);
		line.style.strokeDashoffset = Math.abs(x2-x1) + Math.abs(y2-y1);
		line.getBoundingClientRect();
		line.style.transition = `stroke-dashoffset ${1.5/maxSpokes}s ease-in-out`;
		line.setAttribute("x2", x2);
		line.setAttribute("y2", y2);
		line.style.strokeDashoffset = 0;
		line.addEventListener("transitionend", () => {
			createSpiralpart(x2,y2,newdegrees,maxSpokes,length,depth+1);
		});

		
		
	}
	createSpokes(maxSpokes);
	createSpiral(maxSpokes);
}

renderWeb(maxSpokes);