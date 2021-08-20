const container = document.querySelector('.container');

let div = document.createElement('div');
div.setAttribute('class', 'status');
container.append(div);

const status = document.querySelector('.status');
const topLevelDiv = document.createElement('div');
topLevelDiv.setAttribute('id', 'toplevel');
topLevelDiv.innerText = 'Top Level: 10';

const currentLevelDiv = document.createElement('div');
currentLevelDiv.setAttribute('id', 'currentlevel');
currentLevelDiv.innerText = 'Current Level: 10';
status.append(topLevelDiv, currentLevelDiv);

div = document.createElement('div');
div.setAttribute('class', 'colorblock');
container.append(div);

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

const getRGB = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
}

createColors(4);

const colors = document.querySelectorAll('.color');

// program show the sequence of colors

let levels = [];
const createLevels = (amount) => { 
    for (i = 0; i < amount; i++) {
        const randomColor = colors[Math.round(Math.random() * (colors.length - 1))].id;
        levels[i] = randomColor;
    }
    console.log(levels)
}

createLevels(10);

const repeat = [];
// player click to repeat
for (color of colors) {
    color.onclick = (ev) => {
        console.log(ev.currentTarget)
        repeat.push(ev.currentTarget.id);
        console.log(repeat)
        ev.currentTarget.style.opacity = 1;
    }
}
// push each color blocks into an array