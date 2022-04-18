const canvas = document.getElementById('paint');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange');
const brush = document.getElementById('jsBrush');
const fill = document.getElementById('jsFill');
const save = document.getElementById('jsSave');
const undo = document.getElementById('jsUndo');
const redo = document.getElementById('jsRedo');


ctx.fillStyle = 'white';
ctx.fillRect(0,0,1200,600);

ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
    canvasPush();
    event.stopPropagation();
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

function onMouseEnter(event){
    x = event.offsetX;
    y = event.offsetY;

    ctx.moveTo(x, y);
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

function changelineWidth(event){
    const size = event.target.value
    ctx.lineWidth = size;
};

function changeBrush(){
    filling = false;
    painting = true;
};

function changeFill(){
    filling = true;
    painting = false;
};

function canvasFilling(){
    if(filling){
        ctx.fillRect(0,0,1200,600);
    }
};

function eventPD(event){
    event.preventDefault();
}

function imageSave(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image
    link.download = '내가그린그림';
    link.click();
}

if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener("mouseenter", onMouseEnter);
    // canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', canvasFilling);
    canvas.addEventListener('contextmenu', eventPD);
}

Array.from(colors).forEach(color => color.addEventListener('click', changeColor))

if(range){
    range.addEventListener('input', changelineWidth);
}

if(brush) {
    brush.addEventListener('click', changeBrush);
}

if(fill) {
    fill.addEventListener('click', changeFill);
}

if(save) {
    save.addEventListener('click', imageSave);
}

// document.body.addEventListener("mouseup", stopPainting);
// document.body.addEventListener("mousedown", startPainting);




const canvasPushArray = new Array();
canvasPushArray.push(canvas.toDataURL());
let canvasStep = 0;

function canvasPush() {
    canvasStep++;
    if(canvasStep < canvasPushArray.length) {
        canvasPushArray.length = canvasStep;
    }
    canvasPushArray.push(canvas.toDataURL());
};

function canvasUndo() {
    if (canvasStep > 0) {
        canvasStep--;
        var canvasPic = new Image();
        canvasPic.src = canvasPushArray[canvasStep];
        canvasPic.onload = function() {ctx.drawImage(canvasPic,0,0);}
    }
};

function canvasRedo() {
    if (canvasStep < canvasPushArray.length-1) {
        canvasStep++;
        var canvasPic = new Image();
        canvasPic.src = canvasPushArray[canvasStep];
        canvasPic.onload = function() {ctx.drawImage(canvasPic,0,0);};
    }
}

if(undo) {
    undo.addEventListener('click', canvasUndo);
}

if(redo) {
    redo.addEventListener('click', canvasRedo);
}