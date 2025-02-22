const docWidth = document.body.clientWidth;
const video_block = document.getElementById("video-block")
const camera_img = document.getElementById("camera-png")
const camera_files = document.getElementById("camera-files")
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
const snap = document.getElementById('snap')
const errorMsgElement = document.getElementById('ErrorMsg')
let camera_is_on = false;



const constraints = {
    video: true,
    audio: false,
    // video : {
    //     width:800,
    //     height: 500
    // },
}
camera_img.addEventListener("click", async()=>{
    async function init(){
        try{
            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            handleSuccess(stream)
        }
        catch(err){
            errorMsgElement.innerHTML = `navigator.mediaDevices.getUserMedia: ${err.toString()}`
        }
    }
    function handleSuccess(stream){
        window.stream = stream
        video.srcObject = stream
        camera_is_on = true
        camera_files.style.display = 'none'
        console.log("video.width - ", video.width)
    }
    init()
})

snap.addEventListener("click", function(){

    // updateImage(video)
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Show canvas, hide video
    canvas.style.display = "block";
    video.style.display = "none";
    mainImageIsReadyChange()
})
const file_input = document.getElementById("files")

file_input.addEventListener("change", function(){
    camera_files.style.display = 'none'
    const curFiles = file_input.files
    for (const file of curFiles) {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = image.title = file.name;
        console.log(image)
        image.onload = () => {
            updateImage(image)    
        }
    }
    mainImageIsReadyChange()
});

function updateImage(image){

    const maxWidth = 1600;  // Set your desired max width
    const maxHeight = 900; // Set your desired max height

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
}
