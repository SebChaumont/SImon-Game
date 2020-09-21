let gameStarted = false;
let level = 0;
const buttonColors = ['red', 'blue', 'green', 'yellow']; // btn color used as ids
let gameSequence = []; // array that will store the Algorithm sequence the user must repeat
let playerSequence = []; // array that will store the player's input(s)

// Event listener to start game when ENTER key is pressed
$(document).on('keydown', function (e) {
	if (e.which == '13' && !gameStarted) {
		gameStarted = true;
		nextSequence();
	}
});

// player's interaction
$('.btn').click(function () {
	let userSelectedColor = $(this).attr('id');
	playerSequence.push(userSelectedColor);
	animatedPress(userSelectedColor);
	playSound(userSelectedColor);
	checkAnswer();
});

// simple function to play sound of button
function playSound(name) {
	var audio = new Audio('sounds/' + name + '.mp3');
	audio.play();
}

//function to animate the button pressed by the player
function animatedPress(currentColor) {
	$('#' + currentColor).addClass('pressed');
	setTimeout(() => {
		$('#' + currentColor).removeClass('pressed');
	}, 100);
}

// function used to add a new color to the gameSequence
function nextSequence() {
	playerSequence = [];
	level++;
	$('#level-title').text('Level ' + level);
	let randomNumber = Math.floor(Math.random() * 4); // random number from 0 to 3
	let randomChosenColor = buttonColors[randomNumber]; // saving the random color into a variable
	gameSequence.push(randomChosenColor); //pushing this new random color into the gameSequence array
	animateSequence();
}

// play algo sequence to the player
function animateSequence() {
	for (let i = 0; i < gameSequence.length; i++) {
		let colorToHighlight = gameSequence[i];
		setTimeout(() => {
			$('#' + colorToHighlight)
				.fadeIn(100)
				.fadeOut(100)
				.fadeIn(100);
			playSound(colorToHighlight);
		}, 750 * i);
	}
}

// comparing both sequences every time the player click on a button. If there's a mismatch between arrrays, at any time, gameOver() is called.
function checkAnswer() {
	if (gameSequence.length === playerSequence.length) {
		if (JSON.stringify(gameSequence) === JSON.stringify(playerSequence)) {
			setTimeout(() => {
				nextSequence(); //succes
			}, 1000);
		} else {
			setTimeout(() => {
				gameOver(); // fail
			}, 100);
		}
	} else if (playerSequence.length !== gameSequence.length) {
		for (let i = 0; i < playerSequence.length; i++) {
			if (playerSequence[i] !== gameSequence[i]) {
				gameOver();
			}
		}
	}
}
// function triggered when checkedAnswer is evaluated to false.
function gameOver() {
	playSound('wrong');
	$('body').addClass('game-over');
	$('#level-title').text('Game Over, Press Any Key to Restart');
	setTimeout(() => {
		$('body').removeClass('game-over');
	}, 200);
	startOver();
}
// reseting all game vars and bools
function startOver() {
	level = 0;
	gameSequence = [];
	playerSequence = [];
	gameStarted = false;
	checkedAnswer = false;
}
