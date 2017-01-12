const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(`Oh no!`, err);
    });
}

function paintToCanvas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take pxls out
    let pixels = ctx.getImageData(0,0, width, height);
    // alter them
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    // place them back on screen
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto(){
  // play sound
  snap.currentTime = 0;
  snap.play();
  // take data out of canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  // put in photo strip
  strip.insertBefore(link, strip.firstChild);
  debugger;
}

function redEffect(pixels){
  for (let i = pixels.data.length; i > 0; i -= 4){
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // r
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // g
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // b
  }
    return pixels;
}

function rgbSplit(pixels){
  for (let i = pixels.data.length; i > 0; i -= 4){
    pixels.data[i - 150] = pixels.data[i + 0]; // r
    pixels.data[i + 125] = pixels.data[i + 1]; // g
    pixels.data[i - 150] = pixels.data[i + 2]; // b
  }
    return pixels;
}


// function rgbSplit(pixels){
//   for (let i = pixels.data.length; i > 0; i -= 4){
//     pixels.data[i - 150] = pixels.data[i + 0]; // r
//     pixels.data[i + 125] = pixels.data[i + 1]; // g
//     pixels.data[i - 150] = pixels.data[i + 2]; // b
//   }
//     return pixels;
// }


getVideo();
video.addEventListener('canplay', paintToCanvas);
