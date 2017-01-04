(function(){
  "use strict";
  // Get Player Elements
  const player = document.querySelector('.player');
  const viewer = document.querySelector('.viewer');
  const playButton = document.querySelector('.toggle');
  const scrubber = document.querySelector('.progress');
  const ranges = document.querySelectorAll('input[type="range"]');
  const progress = scrubber.querySelector('.progress__filled');
  // const volume = document.querySelector('input[name="volume"]');
  // const playbackRate = document.querySelector('input[name="playbackRate"]');
  const skipButtons = document.querySelectorAll('[data-skip]');
  // const skipForward = document.querySelector('button[data-skip="25"]');


  // play/pause functions
  // let isPlaying = false;
  const handlePlayToggle = function(){
    if (viewer.paused) {
      viewer.play();
    } else {
      viewer.pause();
    }

    // isPlaying = !isPlaying; // flip isPlaying flag
    
    // if (isPlaying){
    //   viewer.play();
    //   playButton.innerText = "||";
    // } else {
    //   viewer.pause();
    //   playButton.innerText = "►";
    // }
  }

  const handleToggle = function(){
    const icon = (this.paused) ? '►' : '▌▌';
    playButton.textContent = icon;
  }

  // const handleVolume = function(e){
  //   viewer.volume = e.currentTarget.value;
  // }

  // const handlePlaybackRate = function(e){
  //   // console.log(e.currentTarget.value);
  //   viewer.playbackRate = e.currentTarget.value;
  // }

  const handleRange = function(e){
    const name = e.target.name;
    const value = e.target.value;
    viewer[name] = value;
  }
  

  const handleUpdateTime = function(e){
    const total = (viewer.currentTime / viewer.duration) * 100; // get percentage

    //update the scubber
    // const progress = scrubber.querySelector('.progress__filled');
    progress.style.flexBasis = `${total}%`;

    // console.log('played', playhead, 'of', duration);
  }

  const handleSeek = function(e){
    // determine current width of scrub bar
    // const scrubWidth = scrubber.offsetWidth; 
    // determine where on scrub bar mouse came down in percent
    const movePlayhead = (e.offsetX / scrubber.offsetWidth) * 100; 
    // get current time of media
    // const currentTime = viewer.currentTime;
    // get duration of media
    // const totalTime = viewer.duration; 
    // if mouse is down or event type is click
    if (isScrubbing || e.type === 'click') {
      // update visual position of progess bar "drag"
      progress.style.flexBasis = ((viewer.currentTime / viewer.duration) * 100) + '%';
      // update the current time of media
      viewer.currentTime = (viewer.duration / 100) * movePlayhead;
    }
  }

  const handleSkip = function(e){
    // const skipValue = parseInt(this.dataset.skip);
    // console.log(skipValue);
    // const playheadAt = viewer.currentTime;
    
    // viewer.currentTime = playheadAt + skipValue;
    const skipValue = parseFloat(e.target.dataset.skip);
    viewer.currentTime += skipValue;
  }


  // playback listeners
  // playButton.addEventListener('click', handlePlayToggle);
  viewer.addEventListener('click', handlePlayToggle);
  playButton.addEventListener('click', handlePlayToggle);
  viewer.addEventListener('play', handleToggle);
  viewer.addEventListener('pause', handleToggle);
  
  // volume & playback listeners
  ranges.forEach(range => range.addEventListener('change', handleRange));
  ranges.forEach(range => range.addEventListener('mousemove', handleRange));

  // volume.addEventListener('change', handleVolume);
  // volume.addEventListener('mousemove', handleVolume);

  // //playback rate listener
  // playbackRate.addEventListener('change', handlePlaybackRate);
  // playbackRate.addEventListener('mousemove', handlePlaybackRate);

  viewer.addEventListener('timeupdate', handleUpdateTime);

  // event listeners for scrubber
  let isScrubbing = false;
  scrubber.addEventListener('click', handleSeek);
  scrubber.addEventListener('mousemove', (e) => {
    if (isScrubbing) {
      handleSeek(e)
    }
  })
  scrubber.addEventListener('mousedown', () => isScrubbing = true);
  scrubber.addEventListener('mouseup', () => isScrubbing = false);

  // skipping listeners
  skipButtons.forEach(btn => btn.addEventListener('click', handleSkip));
  // skipForward.addEventListener('click', handleSkip);

// const handleScrub = function(e){
//     // flip true/false value
//     isScrubbing = !isScrubbing;
//   }
/* : some interesting things on video element for this project
   defaultPlaybackRate
   playbackRate
   volume
   seeking
   currentTime
   duration
   played - TimeRanges
   seekable - TimeRanges

   TimeRanges.start()
   TimeRanges.end()
 */

}());
