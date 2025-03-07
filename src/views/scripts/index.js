const docWidth = document.body.clientWidth;
const video_block = document.getElementById("video-block")
const camera_img = document.getElementById("camera-png")
const camera_files = document.getElementById("camera-files")
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
const snap = document.getElementById('snap_icon')
const errorMsgElement = document.getElementById('ErrorMsg')
const canvas_footer_buttons = document.getElementById("canvas-footer-buttons")
let camera_is_on = false;
var background_image = {img: null, width: null, height: null};
var is_video_snap = false;

const constraints = {
    video: {
      width: { ideal: 1280, min: 640, max: 1920 },  // Preferred 1280px, but allows 640-1920px
      height: { ideal: 720, min: 360, max: 1080 },  // Preferred 720px, but allows 360-1080px
      aspectRatio: { ideal: 16 / 9 }  // Try to maintain 16:9 ratio
    },
    audio: false
}

camera_img.addEventListener("click", async()=>{
    async function init(){
        try{
            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            handleSuccess(stream)
        }
        catch(err){
            console.log(`navigator.mediaDevices.getUserMedia: ${err.toString()}`)
        }
    }
    function handleSuccess(stream){
        window.stream = stream
        video.srcObject = stream
        camera_is_on = true
        camera_files.style.display = 'none'
        snap.style.display = 'block'

        const track = stream.getVideoTracks()[0];  
        const settings = track.getSettings();
        background_image.actualWidth = 
        console.log("Actual Width:", settings.width);
        console.log("Actual Height:", settings.height);
    }
    init()
})

snap.addEventListener("click", function(){

    // updateImage(video)
    background_image.img = video
    canvas.width = background_image.clientWidth
    canvas.height = background_image.clientHeight
    console.log(background_image.clientWidth, background_image.clientHeight)
    context.drawImage(background_image, 0, 0,  background_image.clientWidth,  background_image.clientHeight);
    video.pause()
    // Show canvas, hide video
    canvas.style.display = "block";
    video.style.display = "none";
    snap.display = 'none'
    canvas_footer_buttons.style.display = 'flex'
    is_video_snap = true
    mainImageIsReadyChange()
})
const file_input = document.getElementById("files")

file_input.addEventListener("change", function(){
    camera_files.style.display = 'none'
    const curFiles = file_input.files
    for (const file of curFiles) {
        background_image.img = document.createElement("img");
        background_image.src = URL.createObjectURL(file);
        background_image.alt = background_image.title = file.name;
        console.log(background_image)
        background_image.onload = () => {
            updateImage(background_image)    
        }
    }
    mainImageIsReadyChange()
});

function updateImage(image){

    const maxWidth = 1280;  
    const maxHeight = 720; 

    let imgWidth = image.naturalWidth;
    let imgHeight = image.naturalHeight;

    // Scale while maintaining aspect ratio
    if (imgWidth > maxWidth || imgHeight > maxHeight) {
        const scaleFactor = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
    }

    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // Enable image smoothing
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    context.drawImage(image, 0, 0, imgWidth, imgHeight);

    // Show canvas, hide video
    canvas.style.display = "block";
    video.style.display = "none";
    // canvas_footer_buttons.style.display = 'flex'
}
