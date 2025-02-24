const icon_items = document.querySelectorAll(".icon-item")

var is_drag = false
var drag_icon_index = null;
var current_x = null;
var current_y = null;
var mouse_coordinate = {
    x: null,
    y: null
}
// let icons_on_canvas = [{image: new Image(), x: 0, y: 0, w: 100, h: 100}]
let icons_on_canvas = []

function updateCanvas(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.drawImage(background_image, 0, 0, canvas.width, canvas.height)
    for(icon of icons_on_canvas){
        if(icon.image.src){
            // icon.image.onload = ()=>{
                context.drawImage(icon.image, icon.x, icon.y, icon.w, icon.h)
            // }
        }
    }
}

function isOnImage(e)
{
    // console.log(e)
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
    // console.log(`Clicked at canvas coordinates: (${x.toFixed()}, ${y.toFixed()})`);
    return mouse_coordinate;
}

function isClickedOnIcon(event){
    drag_icon_index = 0
    is_drag = false
    current_x = null
    current_y = null
    getMouseCoordinate(event)
    for(icon of icons_on_canvas){
        if((mouse_coordinate.x >= icon.x && mouse_coordinate.x <= icon.x + icon.w)
        && (mouse_coordinate.y >= icon.y && mouse_coordinate.y <= icon.y + icon.h))
        {
            console.log("Clicked on icon")
            is_drag = true
            current_x = mouse_coordinate.x
            current_y = mouse_coordinate.y
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
    event.preventDefault()
    if(is_drag){
        getMouseCoordinate(event)
        let diff_x = mouse_coordinate.x - current_x
        let diff_y = mouse_coordinate.y - current_y
        // console.log("current x - ", current_x)
        icons_on_canvas[drag_icon_index].x += diff_x
        icons_on_canvas[drag_icon_index].y += diff_y
        // console.log("old  x - ", current_x)
        // console.log("old  y - ", current_y)
        
        // console.log("new  x - ", icons_on_canvas[drag_icon_index].x)
        // console.log("new  y - ", icons_on_canvas[drag_icon_index].y)
        // console.log("diffX - ", diff_x)
        current_x = mouse_coordinate.x    
        current_y = mouse_coordinate.y
        // console.log('x - ', mouse_coordinate.x, '\ny - ', mouse_coordinate.y)
        updateCanvas()
    }
    return 
    // console.log("Mouse is moving")
    // for(icon of icons_on_canvas){
    //     if()
    // }
    // console.log(event)
}

function mouseOut(event){
    event.preventDefault()
    is_drag = false
}

function mouseUp(event){
    event.preventDefault()
    is_drag = false
}

canvas.onmousedown = mouseDown
canvas.onmousemove = mouseMove
canvas.onmouseout = mouseOut
canvas.onmouseup = mouseUp


function mainImageIsReadyChange(){
    for(let icon of icon_items){
        icon.addEventListener('click', ()=>{
            const icon_img = icon.querySelector("img")
            const dublicate_icon = new Image()
            dublicate_icon.src = icon_img.src
            // dublicate_icon.width = icon_img.width
            // dublicate_icon.height = icon_img.height
            // if(dublicate_icon.width  < 150){
            //     dublicate_icon.width = 150
            //     dublicate_icon.height = 200
            // }
            // console.log(dublicate_icon.clientWidth, dublicate_icon.clientHeight)
            console.log(dublicate_icon.width)
            // updateCanvas()
            dublicate_icon.onload = () =>{
                icons_on_canvas.push({image: dublicate_icon, x:0, y: 0, w:dublicate_icon.width, h:dublicate_icon.height})
                updateCanvas()
                // context.drawImage(dublicate_icon, 0,0, dublicate_icon.width, dublicate_icon.height)
            }
           
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