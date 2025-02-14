
const docWidth = document.body.clientWidth;
// const cameraWidth = docWidth > 1280 ? docWidth / 2.2 : docWidth / 1.5
const video_block = document.getElementById("video-block")
const camera_img = document.getElementById("camera-png")
const camera_files = document.getElementById("camera-files")
// video_block.style.width = JSON.stringify(cameraWidth) + 'px'
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const snap = document.getElementById('snap')
const errorMsgElement = document.getElementById('ErrorMsg')
let camera_is_on = false;

const icon_items = document.querySelectorAll(".icon-item")
for(let icon of icon_items){
    // console.log(icon.querySelector("img"))
    icon.addEventListener('click', ()=>{
        let icon_img = icon.querySelector("img")

        // if(camera_is_on)
    })
}

const constraints = {
    // video: true,
    audio: false,
    video : {
        width:800,
        height: 500
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
        window.stream = stream
        video.srcObject = stream
        camera_is_on = true
        camera_files.style.display = 'none' 
    console.log("video.width - ", video.width)

    }
    init()
})
// camera_img.addEventListener("click", async () => {
//     async function init() {
//         try {
//             // const constraints = { video: true }; // Define your constraints
//             const stream = await navigator.mediaDevices.getUserMedia(constraints);
//             handleSuccess(stream);
//         } catch (err) {
//             console.error(`navigator.mediaDevices.getUserMedia: ${err}`);
//         }
//     }

//     function handleSuccess(stream) {
//         window.stream = stream
//         video.srcObject = stream
//         camera_is_on = true
//         camera_files.style.display = 'none' 
//         console.log("video.width - ", video.width)

//         // Wait for the metadata to load to get the correct dimensions
//         video.addEventListener("loadedmetadata", () => {
//             console.log(`Video dimensions: ${video.videoWidth}x${video.videoHeight}`);
//         });
//     }

//     init();
// });

// const mike_img = document.createElement('img')
// mike_img.src = './img/mike.jpeg' 
// video_block.style.cssText = `
//     background: url(./img/mike.jpeg);
//     background-size: contain;
//     background-repeat: repeat;`
// var canvas = document.createElement('canvas');
snap.addEventListener("click", function(){
    console.log(video.videoWidth)
    canvas.width = video.videoWidth ;
    canvas.height = video.videoHeight;
    var context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    // video.style.display = "none";
    canvas.style.display = "block";
    video.style.display = "none";
})
// file upload case
const file_input = document.getElementById("files")

file_input.addEventListener("change", updateImage);
function updateImage(){
    const curFiles = file_input.files
    for (const file of curFiles) {
        let image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = image.title = file.name;
        // document.getElementById("div").appendChild(image)
        canvas.width = 800;
        canvas.height = 500;
        // image = document.getElementById("first_img")
        console.log(image)
        image.onload = () => {
            var context = canvas.getContext('2d')
            context.drawImage(image, 0, 0, canvas.width, canvas.height)
            // video.style.display = "none";
            canvas.style.display = "block";
            video.style.display = "none";
        }
    }
}