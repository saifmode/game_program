// initialising canvas
	let canvas = document.querySelector('canvas');
	let c = canvas.getContext('2d');
	canvas.width = innerWidth;
	canvas.height = innerHeight;
// event listeners
	addEventListener('resize', () => {
	    canvas.width = innerWidth
	    canvas.height = innerHeight

	    init()
	});	
// functions
	let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); 
	let distance = (x1, y1, x2, y2) => {
		let xDistance = x2 - x1;
		let yDistance = y2 - y1;
		return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	}
	let randomObj = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
// objects
let gravity = -0.2;
let friction = 0.3;
let poppedFramesMax = 6;
let waitingTime = 60;
	//particles
		function Particle(x, y, radius, color, mass, orderToGo, rowNumber) {
			// this.variables
				this.x = x;
				this.y = y;
				this.velocity = {
					x: 0,
					y: 0.2
				}
				this.radius = radius;
				this.color = color;
				this.mass = mass;
				this.orderToGo = orderToGo;
				this.rowNumber = rowNumber;
				this.opacity = 0;
				this.popped = false;
				this.poppedFrames = 0;
				this.frameCount = 0;
				this.goodToGo = false;
				this.bounced = 0;
				this.introBounced = 0;
			// this.functions
				this.update = particleArray => {
					if (ballsIntroPlaying === true) {
						if (this.y - this.radius * 5 + this.velocity.y <= canvas.height - particleRows * this.radius * 14 + this.rowNumber * this.radius * 11) { // floating upward gravity
							if (this.rowNumber === 1) {
							this.velocity.y = 0;
							this.introBounced += 1;
							} else {
							this.velocity.y = -this.velocity.y * 0.2;
							this.introBounced += 0.5;
							}
						} else {
							this.velocity.y += gravity;
						}

						this.x += this.velocity.x;
						this.y += this.velocity.y;
					} else {
						this.frameCount += 1;
					}

					if (this.goodToGo === true) {
						if (this.y - this.radius * 5 - 42 + this.velocity.y <= 0) {
							this.velocity.y = -this.velocity.y * friction;
							this.bounced += 1;
						} else {
							this.velocity.y += gravity;
						}

						this.x += this.velocity.x;
						this.y += this.velocity.y;
					}

					this.draw();
				}

				this.draw = () => {
					// circle of circles
					if (this.popped === false) {
						c.beginPath();
						c.arc(this.x - (radius * 2), this.y - (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x - (radius * 0), this.y - (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x + (radius * 2), this.y - (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x - (radius * 4), this.y - (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();
						

						c.beginPath();
						c.arc(this.x + (radius * 4), this.y - (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();
						

						c.beginPath();
						c.arc(this.x - (radius * 4), this.y, this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();
						
						c.beginPath();
						c.arc(this.x + (radius * 4), this.y, this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x - (radius * 4), this.y + (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();
						

						c.beginPath();
						c.arc(this.x + (radius * 4), this.y + (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();
						
						c.beginPath();
						c.arc(this.x - (radius * 2), this.y + (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x - (radius * 0), this.y + (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x + (radius * 2), this.y +(radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();
					} else if (this.popped === true && this.poppedFrames < poppedFramesMax){
						c.beginPath();
						c.arc(this.x - (radius * 4), this.y - (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x + (radius * 4), this.y - (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();	
						c.closePath();

						c.beginPath();
						c.arc(this.x - (radius * 6), this.y - (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x + (radius * 6), this.y - (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();	
						c.closePath();

						c.beginPath();
						c.arc(this.x - (radius * 6), this.y + (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x + (radius * 6), this.y + (radius * 2), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();	
						c.closePath();

						c.beginPath();
						c.arc(this.x - (radius * 4), this.y + (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();
						c.closePath();

						c.beginPath();
						c.arc(this.x + (radius * 4), this.y + (radius * 4), this.radius, Math.PI * 2, false);
						c.fillStyle = this.color;
						c.fill();	
						c.closePath();

						this.poppedFrames += 1;
					}
				}
		}
// implementation
	let particleArray;
	let particleColumns = Math.min(19, Math.round(canvas.width / 33) - 2);
	let particleRows = 4
	let totalParticles = particleColumns * particleRows - particleRows;
	let listofNumbers = [];
	function init() {
		ballsIntroPlaying = true;
		particleArray = [];
		listOfNumbers = [];
		for (let i = 0; i < particleColumns - 1; i++) {
			listOfNumbers.push(i);
		}
		listofNumbers = shuffle(listOfNumbers);
		for (let j = 1; j < particleRows + 1; j++) {
			for (let i = 0; i < particleColumns - 1; i++) {
				let radius = 3;
				let x = (i+1) * radius * 12
				let y = canvas.height + (j * radius * 12) - radius * 6
				let color = 'white'
				let mass = 1;
				let orderToGo = listofNumbers[i] + ((j-1)*(particleColumns-1));
				let rowNumber = j;
				particleArray.push(new Particle(x, y, radius, color, mass, orderToGo, rowNumber));
			}
		}
	}
// animate
	function animate() {
		requestAnimationFrame(animate);
		c.fillStyle = '#8ddbe3';
		c.fillRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < particleArray.length; i ++) { // during bubbles' lifetimes
			particleArray[i].update(particleArray);

			if (ballsIntroPlaying === true) {
				if (particleArray.every(particle => particle.introBounced > 1) === true) {
					ballsIntroPlaying = false;
				}
			}

			if (ballsIntroPlaying === false) {
				if (particleArray[i].frameCount > particleArray[i].orderToGo * waitingTime + 30) {
					particleArray[i].goodToGo = true;
				}
				if (particleArray[i].bounced > 1) {
					particleArray[i].popped = true;
				}
				if (particleArray[i].poppedFrames >= poppedFramesMax) {
					particleArray.splice(i,1);
				}
			}
		}

		if (particleArray.length === 0) { // after bubbles' lifetimes
			init();
		}
	}
// function calls
	init();
	animate();