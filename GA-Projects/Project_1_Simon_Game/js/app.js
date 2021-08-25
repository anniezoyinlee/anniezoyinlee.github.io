let sequence = [];
let colors = [];
let level = 1;
let best = 1;
const sidebar = document.querySelector('.sidebar');
const difficulity = document.querySelector('.difficulity');
const hard = document.getElementById('hard');
const easy = document.getElementById('easy');
const start = document.getElementById('startBtn');
const restart = document.getElementById('restartBtn');
const colorblock = document.querySelector('.colorblock');
const topLevel = document.getElementById('toplevel');
const currentLevel = document.getElementById('currentlevel');

// creating color blocks
const createColors = (amount) => {
	for (i = 1; i <= amount; i++) {
		div = document.createElement('div');
		div.setAttribute('class', 'color');
		div.style.backgroundColor = getRGB();
		// for difficulity -> hard
		if (amount >= 9) {
			div.style.width = '27%';
		}
		colorblock.append(div);  
		colors.push(div);
		
	}
}

// Reference: getRGB w03d03/instructor_notes/palette_picker.md
const getRGB = () => {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	return `rgb(${red}, ${green}, ${blue})`;
}

// As a player, I want my game to show a sequence of different colors at random by changing the color blocks' opacity.
const createSequence = (amount) => { 
	for (i = 0; i < amount; i++) {
		const randomColor = colors[Math.round(Math.random() * (colors.length - 1))];
		sequence[i] = randomColor;
	}
	console.log(sequence);
}   

const showSequence = () => {
	for (i = 0; i < sequence.length; i++) {
		const block = sequence[i];
		// color block opacity changes to 1
		setTimeout(() => {
				block.classList.toggle('clicked');
		}, 1000 + (i * 2000));
		// color block opacity changes back to 0.4
		setTimeout(() => {
				block.classList.toggle('clicked');
		}, 2000 + (i * 2000));

		setTimeout(() => {
				colorblock.classList.remove('unclickable');
		}, 500 + (sequence.length * 2000));
	}
}

// As a player, I want to repeat the sequence of different colors by clicking on the color block, and the color block would change opacity just like what the game showed me.
const playerTurn = () => {
	for (i = 0; i < colors.length; i++) {
		colors[i].onclick = (ev) => {
			if (ev.currentTarget === sequence[0]) {
				sequence.shift();
				ev.currentTarget.classList.toggle('clicked');
				const playerClicked = document.querySelector('.clicked');
				colorblock.classList.add('unclickable');
				setTimeout(() => {
					console.log(playerClicked);
					playerClicked.classList.toggle('clicked');
				}, 500);
				setTimeout(() => {
					colorblock.classList.remove('unclickable');
				}, 505);

				// As a player, I want my game to show the next sequence of different colors after I repeat the sequence of colors.
				if (sequence.length === 0) {
					setTimeout(() => {
						goNextLevel();
					}, 600);
				}
			} else {
					// As a player, I would like to see the color block turn grey if I miss the repeat.
					ev.currentTarget.style.backgroundColor = 'grey';
					playerLose();
			}
		}
	}  
}

// As a player, I want to click on a button to start the game.
start.onclick = (ev) => {
	ev.currentTarget.remove();
	difficulity.style.display = 'flex';
}

// As a player, I would like to decide the difficulty of the game(more color blocks or more levels)
hard.onclick = (ev) => {
	playGame(9);
	ev.currentTarget.remove();
	difficulity.style.display = 'none';
	// create a restart button
	restart.style.display = 'block';
}

easy.onclick = (ev) => {
	playGame(4);
	ev.currentTarget.remove();
	difficulity.style.display = 'none';
	// create a restart button
	restart.style.display = 'block';
}

const playGame = (colorsAmount) => {
	createColors(colorsAmount);
	playLevel(level);
}

const playLevel = (level) => {
	colorblock.classList.add('unclickable');
	sequence = [];
	// As a player, I would like to know what is the highest level I ever at
	topLevel.innerText = 'Top Level: ' + best;
	// As a player, I would like to know which level I'm at
	currentLevel.innerText = 'Current Level: ' + level;
	createSequence(level);
	showSequence();
	playerTurn();
}

const goNextLevel = () => {
	if (level < 3) {
		alert('You completed level ' + level + '. Go to next Level!');
		level++;    
		playLevel(level);
	} else {
		// As a player, I would like to know that I win the game if I complete level 10.
		playerWin();
	}
}

const playerLose = () => {
	// As a player, I would like to see a message showing that I lose.
	alert('You missed it');
	if (best <= level && level > 1) {
			best = level - 1;
	}
	restartGame();
}

const playerWin = () => {
	alert('You win');
	if (best <= level) {
			best = level;
	}
	restartGame();
}

restart.onclick = () => {
	restartGame();
}

// As a player, I would like to be able to restart the game after I lose.
const restartGame = () => {
	colorblock.classList.add('unclickable');

	const restart = prompt('Do you want to restart the game?', 'yes/no');
	if (restart === 'yes') {
		for (item of colors) {
			item.style.backgroundColor = getRGB();
		}
		level = 1;
		setTimeout(() => {
				playLevel(level);
		}, 2000);
	}
}

// MVP Goals

// Issues:
// [Violation] 'click' handler
// Error with Permissions-Policy header: Unrecognized feature: 'interest-cohort'. -> only in github

// New Goals
// Add Target level for winning
// Show 'Your turn' after showing sequence 
// Win window
// Lose window
// restart prompt

// Stretch Goals

// As a player, I would like a pop-up screen to show which level I'm at before the level starts
// As a player, I would like to hear different sounds while the app showing the sequence of different colors
// As a player, I would like to see a rank with other players name and their highest level