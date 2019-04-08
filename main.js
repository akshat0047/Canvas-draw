var canvasDiv = document.getElementById('canva-container');
var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'drawCanvas');
canvasDiv.appendChild(canvas);

if (typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
}

var context = canvas.getContext('2d');
var canvaDraw = document.getElementById("drawCanvas");

initialize();

function initialize() {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}

function redrawCanvas(w, h) {
    context.strokeStyle = 'black';
    context.lineWidth = '5';
    context.strokeRect(0, 0, w, h);
}

function resizeCanvas() {
    canvaDraw.width = document.getElementById("canva-container").clientWidth * 0.9;
    canvaDraw.height = document.getElementById("canva-container").clientHeight;
    redrawCanvas(canvaDraw.width, canvaDraw.height);
}

function clearCanvas() {
    context.clearRect(0, 0, canvaDraw.width, canvaDraw.height);
    resizeCanvas(canvaDraw.width, canvaDraw.height);
    emptycoordinates();
}

function emptycoordinates() {
    clickX = [];
    clickY = [];
    clickDrag = [];
}
//Draw

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var adjusty = document.getElementById("canva-container").clientHeight * 0.20;
var paint;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

$('#drawCanvas').bind("vmousedown ", function (e) {
    e.preventDefault();
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - adjusty;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});

$('#drawCanvas').bind("vmousemove swipe", function (e) {
    e.preventDefault();
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - adjusty - this.offsetTop, true);
        redraw();
    }
});

$('#drawCanvas').bind("vmouseup ", function (e) {
    e.preventDefault();
    paint = false;
});

$('#drawCanvas').bind("vmousecancel", function (e) {
    e.preventDefault();
    paint = false;
});



function palette() {
    colors = ["#000000", "#f40919", "#f408a1", "#f408a1", "#a108f4", "#a108f4", "#f4f408", "#f40b08", "#08f4d0", "#08f4d0"];
    for (var i = 0; i < 10; i++) {
        document.getElementById("colorstream").innerHTML += "<span class='color-select'></span>";
        document.getElementsByClassName("color-select")[i].style.backgroundColor = colors[i];
    }
}
palette();

var linecolor;
var setcolor = document.querySelectorAll(".color-select");
for (i = 0; i < setcolor.length; i++) {
    setcolor[i].addEventListener("click", function () {
        linecolor = this.style.backgroundColor;
        emptycoordinates();
    });
}

$("#palette").change(function () {
    linecolor = this.value;
    emptycoordinates();
});

function redraw() {
    context.lineJoin = "round";
    context.lineWidth = 5;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = linecolor;
        context.stroke();
    }
}

$("#clear").click(function () {
    clearCanvas();
});