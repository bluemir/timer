const second = 1000;
const minite = 60 * second;

var $ = document.body.querySelector.bind(document.body)
var canvas = document.body.querySelector("canvas")
var ctx = canvas.getContext('2d');

var targetTime = Date.now()
$("button.set").addEventListener("click", () => {
	targetTime = Date.now() +$("input.time").value * minite;
});


// only need 5fps
// http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
var fps = 5;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

loop()
function loop() {
	requestAnimationFrame(loop)
	now = Date.now();
	delta = now - then;

	if (delta > interval) {
		// update time stuffs

		// Just `then = now` is not enough.
		// Lets say we set fps at 10 which means each frame must take 100ms
		// Now frame executes in 16ms (60fps) so the loop iterates 7 times (16*7 = 112ms) until
		// delta > interval === true
		// Eventually this lowers down the FPS as 112*10 = 1120ms (NOT 1000ms).
		// So we have to get rid of that extra 12ms by subtracting delta (112) % interval (100).
		// Hope that makes sense.

		then = now - (delta % interval);

		// ... Code for Drawing the Frame ...

		var left = targetTime - Date.now()
		// if want large scale change total
		draw(left>0?left:0, 60*minite)

		$("span.display").innerText = Math.floor(left / minite) + "m" + Math.floor(left%minite / second) +"s"
	}
}
function draw(left, total) {
	ctx.clearRect(0, 0, 300, 300)

	ctx.fillStyle = '#eeeeee';
	ctx.beginPath();
	ctx.arc(150, 150, 150, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();


	ctx.fillStyle = "red";
	ctx.beginPath()
	ctx.moveTo(150, 150)
	ctx.arc(150, 150, 150, -Math.PI/2 , Math.PI * 2 * (total-left)/total -Math.PI/2, true);
	ctx.lineTo(150, 150)
	ctx.fill();
	ctx.closePath();
}
