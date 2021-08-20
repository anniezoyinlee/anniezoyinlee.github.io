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

const createColors = (amount) => {
    const colorblock = document.querySelector('.colorblock');
    for (i = 1; i <= amount; i++) {
        console.log(i);
        const color = document.createElement('div');
        color.setAttribute('class', 'color');
        color.style.backgroundColor = getRGB();
        color.setAttribute('id', 'block_' + i)
        colorblock.append(color);  
    }
}

const getRGB = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
}

createColors(4);