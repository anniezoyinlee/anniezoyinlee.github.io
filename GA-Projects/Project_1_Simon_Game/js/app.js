let colors = [];
let sequence = [];
let level = 1;
let best = 1;
let target;
const sidebar = document.querySelector('.sidebar');
const difficulity = document.querySelector('.difficulity');
const title = document.querySelector('.title');
const levelDisplay = document.querySelector('.levelDisplay');
const status = document.querySelector('.status')
const hard = document.getElementById('hard');
const easy = document.getElementById('easy');
const start = document.getElementById('startBtn');
const restart = document.getElementById('restartBtn');
const colorblock = document.querySelector('.colorblock');
const targetLevel = document.getElementById('targetLevel');
const bestLevel = document.getElementById('bestLevel');
const currentLevel = document.getElementById('currentlevel');

// creating color blocks
// amount -> number
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
// level -> number
const createSequence = (level) => { 
	for (i = 0; i < level; i++) {
		const randomColor = colors[Math.round(Math.random() * (colors.length - 1))];
		sequence[i] = randomColor;
	}
}   

const showSequence = () => {
	colorblock.style.border = 'red 2px dashed';
	for (i = 0; i < sequence.length; i++) {
		const block = sequence[i];
		// color block opacity changes to 1
		setTimeout(() => {
				block.classList.toggle('clicked');
		}, 1500 + (i * 2000));
		// color block opacity changes back to 0.4
		setTimeout(() => {
				block.classList.toggle('clicked');
		}, 2000 + (i * 2000));

		setTimeout(() => {
				colorblock.classList.remove('unclickable');
				colorblock.style.border = 'gold 2px dashed';
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
easy.onclick = (ev) => {
	target = 5;
	playGame(4);

	// remove difficulity buttons
	ev.currentTarget.remove();
	difficulity.style.display = 'none';

	// show status and restart button
	sidebar.style.display = 'flex';
}

hard.onclick = (ev) => {
	target = 10;
	playGame(9);

	// remove difficulity buttons
	ev.currentTarget.remove();
	difficulity.style.display = 'none';

	// show status and restart button
	sidebar.style.display = 'flex';
}

const playGame = (colorsAmount) => {
	title.remove();
	levelDisplay.style.display = 'block';
	createColors(colorsAmount);
	playLevel();
}

const playLevel = () => {
	colorblock.classList.add('unclickable');
	sequence = [];
  // Shows the target level for player to win
	targetLevel.innerText = 'Target Level: ' + target;
	// As a player, I would like to know what is the highest level I ever at
	bestLevel.innerText = 'Best Record: Level' + best;
	// As a player, I would like to know which level I'm at
	currentLevel.innerText = 'Level ' + level;
	createSequence(level);
	showSequence();
	playerTurn();
}

const goNextLevel = () => {
	if (level < target) {
		alert('You completed level ' + level + '. Go to next Level!');
		level++;    
		playLevel();
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
				playLevel();
		}, 2000);
	}
}

// Issues:
// [Violation] 'click' handler
// Error with Permissions-Policy header: Unrecognized feature: 'interest-cohort'. -> only in github

// Stretch Goals
// As a player, I would like a pop-up screen to show which level I'm at before the level starts
// As a player, I would like to hear different sounds while the app showing the sequence of different colors
// As a player, I would like to see a rank with other players name and their highest level