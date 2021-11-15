//INCLUDE THE FOLLOWING VARIABLES RIGHT AT THE START OF THE CODE

let mario;
let canjump = true;

let dk;
let dId;



const DIR_LEFT = -1;
const DIR_NONE = 0;
const DIR_RIGHT = 1;
var direction = DIR_NONE;



//include th c_player class and the standstill class anywhere -----SOME COORDINATES IN THE STANDSTILL CLASS MAY NEED TO BE CHANGES
class c_player {
	constructor(x, y, width, height, label) { //Sets the object qualities
		let options = {
			isStatic: false,
			restitution: 1,
			friction: 0.3,
			density: 0.09
			
		}
		//create the body
		this.body = Matter.Bodies.rectangle(x, y, width, height, options);
		Matter.World.add(world, this.body); //add to the matter world
		
		this.x = x; //store the passed variables in the object
		this.y = y;
		this.width = width;
		this.height = height;
		this.jumpheight = 23;
		this.jumped = false;
	}

	body() {
		return this.body;
	}

	left() {
		Matter.Body.setVelocity(this.body, {x: -2, y: this.body.velocity.y}); //Sets instructions for when left key is pressed
	}

	right(){
		Matter.Body.setVelocity(this.body, {x: 2, y: this.body.velocity.y}); //Sets instructions for when right key is pressed 
	}

	space(){
		//Matter.Body.setVelocity(this.body, {x: 0, y: -20}); //Sets instructions for when the space key is pressed
			Matter.Body.applyForce(this.body, this.body.position, {x: 0, y: -4});
			// this.jumped = true
			// var jumpy = setTimeout(this.jumped = true ,3000)
			// clearTimeout(jumpy)
	}

	stop(){
		
		Matter.Body.setVelocity(this.body, {x: 0, y: this.body.velocity.y}); //Stops the object from moving 

	}

	show() {
		//this.rotate();

		let pos = this.body.position; //create an shortcut alias 
		let angle = this.body.angle;


		push(); //p5 translation 
			stroke("#000000");
			fill('#ff0400');
			rectMode(CENTER); //switch centre to be centre rather than left, top
			translate(pos.x, pos.y);
			rotate(angle);
			rect(0, 0, this.width, this.height);
		pop();
	}
}




// function score(points) {
// 	let effectspeed = 60;
// 	let animatespeed = 500;

// 	$("#scoreboard").finish();
// 	document.getElementById('points').innerHTML = "+" + points;
// 	$('#scoreboard').removeAttr('style'); //remove any applied styles
// 	$("#scoreboard").fadeIn(effectspeed, function() {
// 		$("#scoreboard").animate({
// 			top: '+=50px',
// 			opacity: 0
// 		}, animatespeed);
// 	});





 //THE PLAYER AND STANDSTILL CLASSES CAN BE PUT ANYHWERE WITHIN THE CODE



class standstill {
	constructor(x, y, width, height, label) { //Sets the object qualities
		let options = {
			restitution: 1,
			friction: 0.3,
			density: 0.09,
			isStatic: true,
			
		}
		//create the body
		this.body = Matter.Bodies.rectangle(x, y, width, height, options);
		Matter.World.add(world, this.body); //add to the matter world
		
		this.x = x; //store the passed variables in the object
		this.y = y;
		this.width = width;
		this.height = height;
	}

	body() {
		return this.body;
	}
	show() {
		//this.rotate();

		let pos = this.body.position; //create an shortcut alias 
		let angle = this.body.angle;


		push(); //p5 translation 
			stroke("#000000");
			fill('#ffbdf7');
			rectMode(CENTER); //switch centre to be centre rather than left, top
			translate(pos.x, pos.y);
			rotate(angle);
			rect(0, 0, this.width, this.height);
		pop();
	}
}



function keyPressed() {
	if (keyCode === 32 && canjump == true) {
		mario.space()
		console.log("jump")
		canjump = false
		setTimeout(
			()=>{
				canjump = true //Creating a timeout so the block can only jump once ever seconf
			},1000
		)
		}
	
}









mario = new c_player(100, vp_height-100,40, 40);
dId = new standstill(80, 137, 40, 40);
dk = new standstill( 130, 138, 40, 40);                            //INCLUDE THESE THREE LINES WITHIN THE SETUP FUNCTION 





function keyPressed() {                            //PUT KEYPRESSES FUCNTION AFTER SETUP FUNCTION, DO NOT PUT WITHIN DRAW FUNCTION
	if (keyCode === 32 && canjump == true) {
		mario.space()
		console.log("jump")
		canjump = false
		setTimeout(
			()=>{
				canjump = true //Creating a timeout so the block can only jump once ever seconf
			},1000
		)
		}
	
}





mario.show()                     //INCLUDE THE KEYMANAGER STUFF WITHIN THE DRAW FUNCTION 
	dk.show()                     
	dId.show()
	mario.body.angle = 0;

	var isPressed = false;
	if (keyManager[37]){ //left arrow
		console.log("Left");
		isPressed = true;
		mario.left();
		direction = DIR_LEFT;
	}    
	if (keyManager[39]) { //right arrow
		console.log("Right");
		isPressed = true;
		mario.right();
		direction = DIR_RIGHT;
	}
	// if (keyManager[32]) { //space key
	// 	console.log("space");
	// 	mario.space();
	// }
	if(!isPressed){
		mario.stop();


	}



var keyManager = {};       //PUT THIS RIGHT AT THE END OF THE CODE- ALLOWS KEYS TO WORK
window.addEventListener("keydown", (event) => { keyManager[event.keyCode] = true; });
window.addEventListener("keyup", (event) => { keyManager[event.keyCode] = false; });
