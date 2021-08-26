let colors = [];
let sequence = [];
let level = 1;
let best = 0; 
let target;
const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');
const difficulity = document.querySelector('.difficulity');
const title = document.querySelector('.title');
const levelDisplay = document.querySelector('.levelDisplay');
const statusDisplay = document.querySelector('.statusDisplay')
const hard = document.getElementById('hard');
const easy = document.getElementById('easy');
const start = document.getElementById('startBtn');
const restart = document.getElementById('restartBtn');
const changeDifficulity = document.getElementById('changeDifficulity');
const colorblock = document.querySelector('.colorblock');
const status = document.getElementById('status');
const bestLevel = document.getElementById('bestLevel');
const currentLevel = document.getElementById('currentlevel');

// creating color blocks
// amount -> number
const createColors = (amount) => {
	for (i = 1; i <= amount; i++) {
		div = document.createElement('div');
		div.setAttribute('class', 'color');
		div.setAttribute('id', 'block' + i)
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

// show sequence by making blocks change style(opacity and border), then change back
const showSequence = () => {
	colorblock.style.border = 'deeppink 3px dashed';
	for (i = 0; i < sequence.length; i++) {
		const block = sequence[i];
		// blocks start changing one by one after the function is called
		setTimeout(() => {
				block.classList.toggle('clicked');
		}, 1500 + (i * 2000));

		// blocks change back one by one after style changed
		setTimeout(() => {
				block.classList.toggle('clicked');
		}, 2000 + (i * 2000));

		// make it user's turn after the last block change back
		setTimeout(() => {
				colorblock.classList.remove('unclickable');
				colorblock.style.border = 'gold 3px dashed';
		}, 500 + (sequence.length * 2000));
	}
}

// As a player, I want to repeat the sequence of different colors by clicking on the color block, and the color block would change opacity just like what the game showed me.
const playerTurn = () => {
	for (i = 0; i < colors.length; i++) {
		colors[i].onclick = (ev) => {
			if (ev.currentTarget === sequence[0]) {
				sequence.shift();
				// change block's style after click
				ev.currentTarget.classList.toggle('clicked');

				// only allow player to click the next block after the clicked block change back to unclick style
				const playerClicked = document.querySelector('.clicked');
				colorblock.classList.add('unclickable');
				// change back block's style
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
easy.onclick = () => {
	// 5 levels
	target = 5;
	// 4 color blocks
	playGame(4); 

	// remove difficulity buttons
	difficulity.style.display = 'none';

	// show status and restart button
	sidebar.style.display = 'flex';
}

hard.onclick = () => {
	// 10 levels
	target = 10;
	// 9 color blocks
	playGame(9);

	// remove difficulity buttons
	difficulity.style.display = 'none';

	// show status and restart button
	sidebar.style.display = 'flex';
}

const playGame = (colorsAmount) => {
	colorblock.style.display = 'flex';
	title.style.fontSize = '1.5vw';
	title.style.margin = '0 0 0 10%';
	sidebar.insertBefore(title, statusDisplay);
	levelDisplay.style.display = 'block';
	createColors(colorsAmount);
	playLevel();
}

const playLevel = () => {
	colorblock.classList.add('unclickable');
	sequence = [];
  // Shows the target level for player to win
	status.innerText = 'Finish Level ' + target + ' to win!';
	// As a player, I would like to know what is the highest level I ever at
	bestLevel.innerText = 'Best Record: Level ' + best;
	// As a player, I would like to know which level I'm at
	currentLevel.innerText = 'Current Level: ' + level;
	createSequence(level);
	showSequence();
	playerTurn();
}

const goNextLevel = () => {
	if (level < target) {
		// Shows good word if player complete a level
		const goodWords = ['Good Job! ', 'Fantastic! ', 'Wonderful! ', 'Awesome! ', 'Nice! ']
		status.innerText = goodWords[Math.floor(Math.random() * (goodWords.length - 1))] + 'Go to level ' + (level + 1);

		level++;    
		setTimeout(() => {
			playLevel();
		}, 2000);
	} else {
		// As a player, I would like to know that I win the game if I complete level 10.
		playerWin();
	}
}

const playerLose = () => {
	// As a player, I would like to see a message showing that I lose.
	status.innerText = 'Oops! You Missed it! Click RESTART to play again';
	if (best <= level && level > 1) {
			best = level - 1;
	}
}

const playerWin = () => {
	status.innerText = 'YOU WIN! Click RESTART to play again'
	if (best <= level) {
			best = level;
	}
}

restart.onclick = () => {
	colorblock.style.display = 'none';
	status.innerText = 'Loading...';
	setTimeout(() => {
		status.innerText = '';
		colorblock.style.display = 'flex';
		restartGame();
	}, 600 + (sequence.length * 2000));
}

// During the game player can change difficulty, level records will reset
changeDifficulity.onclick = () => {
	// reset level records
	level = 1;
	best = 0;
	sequence = [];
	colors = [];

	const blocks = document.querySelectorAll('.color') 
	for (blockDiv of blocks) {
		blockDiv.remove();
	}

	sidebar.style.display = 'none';
	colorblock.style.display = 'none';
	levelDisplay.style.display = 'none';

	// show the buttons for player to choose difficulity from easy or hard
	difficulity.style.display = 'flex';
	
	title.style.fontSize = '4vw';
	title.style.margin = '0';
	main.append(title);
	main.append(difficulity);
}

// As a player, I would like to be able to restart the game after I lose.
const restartGame = () => {
	colorblock.classList.add('unclickable');

	for (item of colors) {
		item.style.backgroundColor = getRGB();
	}
	
	level = 1;
	setTimeout(() => {
			playLevel();
	}, 2000);
}

// Issues:
// [Violation] 'click' handler
// Error with Permissions-Policy header: Unrecognized feature: 'interest-cohort'. -> only in github

// gameover button

// Bonus:

// Add timer-based scoring
// Track scores across games (even if the page is reloaded) -> local storage?


// Stretch Goals
// As a player, I would like a pop-up screen to show which level I'm at before the level starts
// As a player, I would like to hear different sounds while the app showing the sequence of different colors
// As a player, I would like to see a rank with other players name and their highest level