const icon_items = document.querySelectorAll(".icon-item")


var is_drag = false
var drag_icon_index = null;
var mouse_coordinate = {
    x: null,
    y: null
}
// let icons_on_canvas = [{image: new Image(), x: 0, y: 0, w: 100, h: 100}]
let icons_on_canvas = []

function updateCanvas(){
    for(icon of icons_on_canvas){
        if(icon.image.src){
            // const dublicate_icon = new Image()
            // dublicate_icon.src = icon.image.src
            context.drawImage(icon.image, 0,0, icon.w, icon.h)
            console.log(icon.image)
        }
    }
}

function isOnImage(e)
{
    console.log(e)

    // for(icon of icon_items){
        
    // }
}

function getMouseCoordinate(event){
    const rect = canvas.getBoundingClientRect();
    // Calculate scale factors
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // let canvas_width = canvas.width
    // let canvas_height = canvas.height
    // Adjust the click coordinates
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    mouse_coordinate.x = x;
    mouse_coordinate.y = y;
    console.log(`Clicked at canvas coordinates: (${x.toFixed()}, ${y.toFixed()})`);
    return mouse_coordinate;
}

function isClickedOnIcon(event){
    drag_icon_index = 0
    is_drag = false
    getMouseCoordinate(event)
    for(icon of icons_on_canvas){
        if((mouse_coordinate.x >= icon.x && mouse_coordinate.x <= icon.x + icon.w)
        && (mouse_coordinate.y >= icon.y && mouse_coordinate.y <= icon.y + icon.h))
        {
            console.log("Clicked on icon")
            is_drag = true
            return true;
        }
        drag_icon_index++;
    }
    drag_icon_index = null
    return false
}

function mouseDown(event){
    event.preventDefault()
    isClickedOnIcon(event)
    // isOnImage(event)
}

function mouseMove(event){
    if(is_drag){
        getMouseCoordinate(event)
        icons_on_canvas[drag_icon_index].x = 
        // console.log('x - ', mouse_coordinate.x, '\ny - ', mouse_coordinate.y)
        
    }
    return 
    // console.log("Mouse is moving")
    // for(icon of icons_on_canvas){
    //     if()
    // }
    // console.log(event)
}

function mouseOut(){
    is_drag = false
}

function mouseUp(){
    is_drag = false
}

canvas.onmousedown = mouseDown
canvas.onmousemove = mouseMove
canvas.onmouseout = mouseOut
canvas.onmouseup = mouseUp


function mainImageIsReadyChange(){
    // updateCanvas()
    for(let icon of icon_items){
        icon.addEventListener('click', ()=>{
            const icon_img = icon.querySelector("img")
            const dublicate_icon = new Image()
            dublicate_icon.src = icon_img.src
            // document.body.appendChild(dublicate_icon)
            icons_on_canvas.push({image: dublicate_icon, x:0, y: 0, w:dublicate_icon.width, h:dublicate_icon.height})
            updateCanvas()
            // context.drawImage(dublicate_icon, 0,0, dublicate_icon.width, dublicate_icon.height)
        })
    }
}

// function resizeCanvas() {
//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = canvas.offsetWidth * dpr;
//     canvas.height = canvas.offsetHeight * dpr;
//     context.scale(dpr, dpr); // Scale the drawing operations
//     updateCanvas()
// }

// Resize on load and window resize
// window.addEventListener('resize', resizeCanvas);