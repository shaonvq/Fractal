// Part 1 of 5: Setting up the SVG

function degToRad(degrees) {
  return -(degrees * Math.PI / 180);
}

	var leftoffset = 10; // initial value
	var rightoffset = 10; // initial value
	var leftslider = document.getElementById("leftSlider");
	var rightslider = document.getElementById("rightSlider");
	leftslider.oninput = function() {
	  leftoffset = this.value;
	}
	rightslider.oninput = function() {
	  rightoffset = this.value;
	}


function renderFractal() {

  // create the SVG element and set its attributes
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 1000 1000"); // set the view box
  svg.setAttribute("width", "100%"); // set the width to 100%
  svg.setAttribute("height", "100%"); // set the height to 100%

  // add the SVG element to the DOM
  const container = document.getElementById("fractal-container");
  container.appendChild(svg);

  // set the initial values for the fractal generation
  const startX = 500; // x coordinate of the starting point
  const startY = 1000; // y coordinate of the starting point
  const startLength = 300; // length of the starting line
  const startAngle = degToRad(90); // angle of the starting line in radians

  // generate the fractal using a recursive function
  generateBranches(svg, startX, startY, startLength, startAngle, 0);
}

async function generateBranches(svg, x, y, length, angle, depth) {
  // set the stroke color and width based on the depth
  const strokeColor = "black";
  const strokeWidth = length / 10;
  const maxdepth = 11;

  if (depth > maxdepth) {
	return;

  }
  
  const newLength = length * .7;
  // calculate the end point of the line
  const endX = x + length * Math.cos(angle);

  const endY = y + length * Math.sin(angle);

  // create a line element and set its attributes
const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttribute("x1", x);
line.setAttribute("y1", y);
line.setAttribute("x2", endX);
line.setAttribute("y2", endY);
line.setAttribute("stroke", strokeColor);
line.setAttribute("stroke-width", strokeWidth);
line.style.transition = "";
line.style.strokeDasharray = length;
line.style.strokeDashoffset = length;
line.getBoundingClientRect();
line.style.transition = "stroke-dashoffset 1.5s ease-in-out";
// apply CSS animations to make the line sway
line.style.transformOrigin = `${x}px ${y}px`; // set the transform origin to the start of the line
line.style.animation = "sway 2s ease-in-out infinite alternate";
setTimeout(() => {
  line.style.strokeDashoffset = 0;
}, 1500); // add a 100ms delay before starting the transition

  // add the line element to the SVG
  svg.appendChild(line);



  setTimeout(() => {
  // generate the two branches asynchronously
  generateBranches(svg, endX, endY, newLength, angle + Math.PI / leftoffset, depth + 1, maxdepth);

  generateBranches(svg, endX, endY, newLength, angle - Math.PI / rightoffset, depth + 1, maxdepth);
  }, 1500); // add a 100ms delay before starting the transition
  // wait for both branches to finish growing before continuing

	//await Promise.all([branch1, branch3]);

}



// Part 3 of 5: Calling the renderFractal function
renderFractal();


// Part 5 of 5: Adding event listeners
const svg = document.querySelector("svg");







// Part 5 of 6: Adding a button to generate a new fractal with a random color
function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}
const startX = 5;
const startY= 5;
const startLength = 10;
const startAngle = 45;


// Create a new button element
const button = document.createElement("button");

// Set the text content of the button
button.textContent = "Create new fractal";

function removeSVGs() {
  const svgs = document.getElementsByTagName('svg');
  for (let i = svgs.length - 1; i >= 0; i--) {
    svgs[i].parentNode.removeChild(svgs[i]);
  }
}

// Attach a click event listener to the button, which calls the myFunction function
button.addEventListener("click", () => {removeSVGs();renderFractal();});

// Add the button to the body of the document
document.body.prepend(button);