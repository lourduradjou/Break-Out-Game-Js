const grid = document.querySelector('.grid');
const blockWidth = 130;
const blockHeight = 20;
const width = 590;
const height = 500;
let currentPosition = [230, 25]; //current position of the userblock which is movable
let currentPositionBall = [270, 45]; //current position of the moving ball

let xDirection = -2;
let yDirection = 2;
const ballDiameter = 40;
const displayScore = document.querySelector('#score');
let score = 0;

class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis];
		this.bottomRight = [xAxis + blockWidth, yAxis];
		this.topLeft = [xAxis, yAxis + blockHeight];
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
	}
}

const blocks = [
	new Block(10, 470),
	new Block(150, 470),
	new Block(290, 470),
	new Block(430, 470),
	new Block(10, 440),
	new Block(150, 440),
	new Block(290, 440),
	new Block(430, 440),
	new Block(10, 410),
	new Block(150, 410),
	new Block(290, 410),
	new Block(430, 410),
];
function addBlock() {
	for (let i = 0; i < blocks.length; i++) {
		//we wanna create a block of div so first create a div and store it as block
		const block = document.createElement('div');
		//after creation of block add the block class into it to get the styles here
		block.classList.add('block');
		block.style.left = blocks[i].bottomLeft[0] + 'px';
		block.style.bottom = blocks[i].bottomLeft[1] + 'px';
		grid.appendChild(block);
	}
}
addBlock();

function drawBlock() {
	user.style.left = currentPosition[0] + 'px';
	user.style.bottom = currentPosition[1] + 'px';
}

function moveBlock(e) {
	switch (e.key) {
		case 'ArrowLeft':
			if (currentPosition[0] > 0) currentPosition[0] -= 10;
			drawBlock();
			break;
		case 'ArrowRight':
			if (currentPosition[0] < width - blockWidth)
				currentPosition[0] += 10;
			drawBlock();
			break;
	}
}

//we have to create a user block where he can move to left and right

const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawBlock();
document.addEventListener('keydown', moveBlock);

//adding the ball to the grid
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

const timerId = setInterval(moveBall, 20);

//Code for ball and its movement and collision
function drawBall() {
	ball.style.left = currentPositionBall[0] + 'px';
	ball.style.bottom = currentPositionBall[1] + 'px';
}

function moveBall() {
	//changeBallDirection()
	currentPositionBall[0] += xDirection;
	currentPositionBall[1] += yDirection;
	drawBall();
	checkForCollision();
}
function checkForCollision() {
	//check for block and ball collision
	for (let i = 0; i < blocks.length; i++) {
		if (
			currentPositionBall[0] > blocks[i].bottomLeft[0] &&
			currentPositionBall[0] < blocks[i].bottomRight[0] &&
			currentPositionBall[1] + ballDiameter > blocks[i].bottomLeft[1] &&
			currentPositionBall[1] < blocks[i].topLeft[1]
		) {
			const allBlocks = Array.from(document.querySelectorAll('.block'));
			allBlocks[i].classList.remove('block');
			//here the class is remove but the block will be there
			//so splice it from the blocks object
			blocks.splice(i, 1);
			changeBallDirection();
			score++;
			displayScore.innerHTML = score;

			//check for win
			if (blocks.length === 0) {
				clearInterval(timerId);
				displayScore.innerHTML = 'You Win';
				document.removeEventListener('keydown', moveBlock);
			}
		}
	}

	//check for user collision
	//if that ball comes under the position of the userblock
	if (
		currentPositionBall[0] > currentPosition[0] &&
		currentPositionBall[0] < currentPosition[0] + blockWidth &&
		currentPositionBall[1] > currentPosition[1] &&
		currentPositionBall[1] < currentPosition[1] + blockHeight
	) {
		changeBallDirection();
	}
	//check for wall collision
	if (
		currentPositionBall[0] >= width - ballDiameter ||
		currentPositionBall[1] >= height - ballDiameter ||
		currentPositionBall[0] <= 0 ||
		currentPositionBall[1] <= 0
	)
		changeBallDirection();

	//check for game over
	if (currentPositionBall[1] <= 0) {
		clearInterval(timerId);
		displayScore.innerHTML = 'You Lose!';
		document.removeEventListener('keydown', moveBlock);
	}
}

function changeBallDirection() {
	if (xDirection === 2 && yDirection === 2) {
		yDirection = -2;
		return;
	}
	if (xDirection === 2 && yDirection === -2) {
		xDirection = -2;
		return;
	}
	if (xDirection === -2 && yDirection === -2) {
		yDirection = 2;
		return;
	}
	if (xDirection === -2 && yDirection === 2) {
		xDirection = 2;
		return;
	}
}
