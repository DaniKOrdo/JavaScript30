const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const board = document.querySelector('.board');
const color = document.querySelector('#color');
const range = document.querySelector('#range');
const rainbow = document.querySelector('#rainbow');
const clear = document.querySelector('#clear');


canvas.width = board.offsetWidth;
canvas.height = board.offsetHeight;
ctx.strokeStyle = color.value;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = range.value;
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function config() {
    ctx.strokeStyle = color.value;
    ctx.lineWidth = range.value;
}

function draw(e) {
    if(!isDrawing) return; // stop the fn from running when they are not moused down

    if(rainbow.checked) ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    }


    // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    //     direction = !direction;
    // }

    // if(direction) {
    //     ctx.lineWidth++;
    // } else {
    //     ctx.lineWidth--;
    // }

}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

color.addEventListener('change', config);
range.addEventListener('change', config);
rainbow.addEventListener('change', config);
clear.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));