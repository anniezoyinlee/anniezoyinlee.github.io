
// creating color blocks
const createColors = (amount) => {
    const colorblock = document.querySelector('.colorblock');
    for (i = 1; i <= amount; i++) {
        div = document.createElement('div');
        div.setAttribute('class', 'color');
        div.style.backgroundColor = getRGB();
        div.setAttribute('id', 'block_' + i)
        colorblock.append(div);  
    }
}

// @Reference => w03d03/instructor_notes/palette_picker.md
const getRGB = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
}

createColors(4);

const colors = document.querySelectorAll('.color');

// As a player, I want my game to show a sequence of different colors at random by changing the color blocks' opacity.
let sequence = [];
const createSequence = (amount) => { 
    for (i = 0; i < amount; i++) {
        const randomColor = colors[Math.round(Math.random() * (colors.length - 1))].id;
        sequence[i] = randomColor;
    }
    console.log(sequence)
}   

createSequence(4);

const showSequence = () => {
    for (i = 0; i < sequence.length; i++) {
        const nowBlock = document.getElementById(sequence[i])
        nowBlock.style.pointerEvents = 'none';
        setTimeout(() => {
            nowBlock.classList.toggle('clicked');
        }, 3000 + (i * 2000))

        setTimeout(() => {
            nowBlock.classList.toggle('clicked');
        }, 4000 + (i * 2000))

        setTimeout(() => {
            nowBlock.style.pointerEvents = '';
        }, 4000 + (sequence.length * 2000))
    }
}

// As a player, I want to repeat the sequence of different colors by clicking on the color block, and the color block would change opacity just like what the game showed me.
const userRepeat = () => {
    const repeat = [];
    const clicked = document.querySelectorAll('.clicked');
    // user click to repeat
    for (i = 0; i < colors.length; i++) {
        colors[i].onclick = (ev) => {
            console.log(ev.currentTarget)
            repeat.push(ev.currentTarget.id);
            console.log(repeat)
            // Use CSS animation?
            ev.currentTarget.classList.toggle('clicked');
            for (item of clicked) {
                item.classList.remove('clicked')
            };
        }
    }
}

// As a player, I want to click on a button to start the game.
const start = document.getElementById('startbtn');
start.onclick = (ev) => {
    playLevel();
    ev.currentTarget.remove();
}

const playLevel = () => {
    showSequence();
    userRepeat();
}

// MVP Goals
// As a player, I want my game to show the next sequence of different colors after I repeat the sequence of colors.
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