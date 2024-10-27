const docWidth = document.body.clientWidth;
const cameraWidth = docWidth > 1280 ? Math.trunc(docWidth / 2.2) : Math.trunc(docWidth / 1.5)
const video_block = document.getElementById("video-block")
video_block.style.width = JSON.stringify(cameraWidth) + 'px'
console.log(JSON.stringify(cameraWidth) + 'px')
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const snap = document.getElementById('snap')
const errorMsgElement = document.getElementById('ErrorMsg')
const camera_png = document.getElementById("camera-png")
const camera_files = document.getElementsByClassName("camera-files")[0]
const splide = document.getElementsByClassName("splide")[0]
function showStickers(){
    document.addEventListener( 'DOMContentLoaded', function() {
        let splide = new Splide('.splide', {
            type   : 'loop',
            perPage: 3,
            perMove: 1,
        });
        splide.mount()
    })
}
 
const constraints = {
    audio: false,
    video : {
        width: cameraWidth, height: 500
    },
}
camera_png.addEventListener("click", function(){
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
    console.log(stream)
    window.stream = stream
    video.srcObject = stream
    camera_files.style.display = 'none'
    showStickers()
}
init()

var context = canvas.getContext('2d')
snap.addEventListener("click", function(){
    context.drawImage(video, 0, 0, 640, 480)
})
})