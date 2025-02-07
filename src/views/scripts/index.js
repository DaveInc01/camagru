const docWidth = document.body.clientWidth;
const cameraWidth = docWidth > 1280 ? docWidth / 2.2 : docWidth / 1.5
const video_block = document.getElementById("video-block")
const camera_img = document.getElementById("camera-png")
const camera_files = document.getElementById("camera-files")
video_block.style.width = JSON.stringify(cameraWidth) + 'px'
console.log(JSON.stringify(cameraWidth) + 'px')
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const snap = document.getElementById('snap')
const errorMsgElement = document.getElementById('ErrorMsg')
const constraints = {
    audio: false,
    video : {
        width: cameraWidth, height: 500
    },
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
        console.log(stream)
        window.stream = stream
        video.srcObject = stream
        camera_files.style.display = 'none' 
    }
    init()
})

// const mike_img = document.createElement('img')
// mike_img.src = './img/mike.jpeg' 
// video_block.style.cssText = `
//     background: url(./img/mike.jpeg);
//     background-size: contain;
//     background-repeat: repeat;`

var context = canvas.getContext('2d')
console.log(context)
snap.addEventListener("click", function(){
    video.drawImage(video, 0, 0, 640, 480)
})