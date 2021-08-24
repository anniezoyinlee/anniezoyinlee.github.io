let sequence = [];
let colors = [];
let level = 1;
const start = document.getElementById('startbtn');
const colorblock = document.querySelector('.colorblock');

// creating color blocks
const createColors = (amount) => {
    for (i = 1; i <= amount; i++) {
        div = document.createElement('div');
        div.setAttribute('class', 'color');
        div.style.backgroundColor = getRGB();
        div.setAttribute('id', 'block_' + i)
        colorblock.append(div);  
        colors.push(div);
    }
}

// @Reference => w03d03/instructor_notes/palette_picker.md
const getRGB = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
}

// As a player, I want my game to show a sequence of different colors at random by changing the color blocks' opacity.
const createSequence = (amount) => { 
    for (i = 0; i < amount; i++) {
        const randomColor = colors[Math.round(Math.random() * (colors.length - 1))];
        sequence[i] = randomColor;
    }
    console.log(sequence)
}   

const showSequence = () => {
    for (i = 0; i < sequence.length; i++) {
        const block = sequence[i];
        setTimeout(() => {
            block.classList.toggle('clicked');
        }, 1000 + (i * 2000))

        setTimeout(() => {
            block.classList.toggle('clicked');
        }, 2000 + (i * 2000))
    }
}

// As a player, I want to repeat the sequence of different colors by clicking on the color block, and the color block would change opacity just like what the game showed me.
const userTurn = () => {
    for (i = 0; i < colors.length; i++) {
        colors[i].onclick = (ev) => {
            console.log(ev.currentTarget)
            if (ev.currentTarget === sequence[0]) {
                sequence.shift();
                ev.currentTarget.classList.toggle('clicked');
                setTimeout(() => {
                    const playerClicked = document.querySelector('.clicked');
                    playerClicked.classList.toggle('clicked');
                }, 500);
                // As a player, I want my game to show the next sequence of different colors after I repeat the sequence of colors.
                if (sequence.length === 0) {
                    level++;
                    goNextLevel();
                }
            } else {
                ev.currentTarget.style.backgroundColor = 'grey';
                playerLost();
            }
        }
    }  
}

// As a player, I want to click on a button to start the game.
start.onclick = (ev) => {
    playGame(4);
    ev.currentTarget.remove();
}

const playGame = (colorsAmount) => {
    createColors(colorsAmount);
    playLevel(level);
}

const playLevel = (level) => {
    createSequence(level);
    showSequence();
    userTurn();
}

const goNextLevel = () => {
    console.log('Good Job, Go to next Level!')
    playLevel(level);
}

const playerLost = () => {
    console.log('You missed it')
}

// MVP Goals

// As a player, I would like to know which level I'm at
// As a player, I would like to know what is the highest level I ever at
// As a player, I would like to see the color block turn grey if I miss the repeat.
// As a player, I would like to see a message showing that I lose.
// As a player, I would like to be able to restart the game after I lose.
// As a player, I would like to know that I win the game if I complete level 10.

// Stretch Goals
// As a player, I would like to decide the difficulty of the game(more color blocks or more levels)
// As a player, I would like a pop-up screen to show which level I'm at before the level starts
// As a player, I would like to hear different sounds while the app showing the sequence of different colors
// As a player, I would like to see a rank with other players name and their highest level