const canvas = document.getElementById("myCanvas");
// const canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
// canvas.oncontextmenu = () => false; //disabling right click on canvas 

// canvas.width = window.innerWidth ;
// canvas.height = window.innerHeight;
const nameEl = document.getElementById("inputName");
const ageEl = document.getElementById("inputAge");

const customers = document.querySelector('.customer-list');
console.log('customers')
console.log(customers)

// Read exisiting notes from localStorage
const getSavedPics = () => {
    const picsJSON = localStorage.getItem("myCanvas")

    try{
        return picsJSON ? JSON.parse(picsJSON) : [];

    } catch(e){
        return [];
    }
}

let picsObj = getSavedPics();
console.log('here');
console.log(picsObj);


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
    } else{ 
        savePics();
    }

    // var data = canvas.toDataURL('image111/png');
    //  window.open(data);
//     var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.


// window.location.href=image; // it will save locally

})

function savePics() {
    var order = 0 ;
    if (ageEl.value === '4-7'){
        var  order = 1;
    }else
    if (ageEl.value === '8-11'){
        var  order = 2;
        console.log(order);
    }else
    if (ageEl.value === '12-15'){
        var  order = 3;
    }else
    if (ageEl.value === '16-19'){
        var  order = 4;
    }


    tag = canvas.toDataURL();
    // picsObj = {"order":order , "tag":tag};
    console.log('HERE');
    console.log(picsObj);

    picsObj.push({
        order: order ,
        tag : tag
    })
    console.log(picsObj)
    pics = JSON.stringify(picsObj)
    localStorage.setItem("myCanvas",  pics);
    ctx.clearRect(0, 0, canvas.width, canvas.height);



}

addImage(picsObj);

function addImage(picsObj){
    console.log('HEREHERE')


        const div = document.createElement('div');
        div.classList.add('card', 'text-left');
        var dataURL1 = localStorage.getItem("myCanvas");
        var dataURL = JSON.parse(dataURL1);
        // var img = new Image();
        // img.src = dataURL[1].tag;
        // srccc = dataURL[1].tag;
        console.log('-->',dataURL)
        div.innerHTML = `
        <div class = "card-header">
                    <h6 class="text-capitalize my-1"><span class="badge badge-success mr-1">Age Category :</span>
                        <span id="category">${picsObj.order}</span></h6>
        </div>

        <div class="card-body">
        <div id="carouselExampleControls-1" class="carousel slide" data-ride="carousel">
            <div id="divvv" class="carousel-inner">
              
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls-1" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls-1" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div> 
            `
    
        let carolDiv = div.querySelector("#divvv")

        for (const key in dataURL) {

            const carolItemActive = document.createElement('p'); // is a node
            carolItemActive.innerHTML = `
            <div class="carousel-item active">
                <img class="d-block w-100" src=${dataURL[parseInt(key)].tag}
                >
            </div> 
            `
            // const carolItem = `
            // <div class="carousel-item">
            //     <img class="d-block w-100" src=${dataURL[parseInt(key)].tag}
            //     alt="First slide">
            // </div> 
            // `

            // Your function is returning a string rather than the div node. appendChild can only append a node.
            const carolItem = document.createElement('p'); // is a node
            carolItem.innerHTML = `
            <div class="carousel-item">
                <img class="d-block w-100" src=${dataURL[parseInt(key)].tag}
               >
            </div> 
            `

            if (key === "0"){
                carolDiv.appendChild(carolItemActive)
            } else {
                carolDiv.appendChild(carolItem)
            }
        }

        console.log(carolDiv)
        console.log('carolDiv')
           

        customers.appendChild(div);
}


function reloadCanvas()  {
    var dataURL1 = localStorage.getItem("myCanvas");
    var dataURL = JSON.parse(dataURL1);
    var img = new Image();
    img.src = dataURL.tag;
    img.onload = function () {
    ctx.drawImage(img, 0, 0);
    };
}


// reloadCanvas();

