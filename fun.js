const canvas = document.getElementById("myCanvas");
// const canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
// canvas.oncontextmenu = () => false; //disabling right click on canvas 

// canvas.width = window.innerWidth ;
// canvas.height = window.innerHeight;
const nameEl = document.getElementById("inputName");
const ageEl = document.getElementById("inputAge");


ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 1;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true ;


// the function draw take an event 
function draw(e) {
    if (!isDrawing) //stop the function from running when they are not moused down
    return;
    console.log(e); 
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    //start from
    ctx.moveTo(lastX,lastY);
    //go to
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke(); //to see the painting

    // lastX = e.offsetX;
    // lastY = e.offsetY;
    [lastX,lastY] = [e.offsetX ,e.offsetY];
    hue ++;

    if (hue >= 360){
        hue = 0;
    }

    if (ctx.lineWidth>25 || ctx.lineWidth<=1){
        direction = !direction;
    }

    if (direction){
        ctx.lineWidth ++;
    }else{
        ctx.lineWidth --;
    }
    console.log(ctx.lineWidth)

}
canvas.addEventListener('mousedown', (e) => {
   if (e.button === 0){ //enable drawing on left click only
    isDrawing = true;
    [lastX,lastY] = [e.offsetX ,e.offsetY];
   }
});
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

document.getElementById("btnClear").addEventListener('click', () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

document.getElementById("btnSave").addEventListener('click', () => {
    console.log(ageEl.value)
    if (!nameEl.value) {
        alert("Write Down Your FullName")
    } else if (!ageEl.value){
        alert("Fill the Age Blanks")
    }
   
})

