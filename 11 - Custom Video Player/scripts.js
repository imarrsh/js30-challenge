(function(){
  "use strict";
  // Get Player Elements
  const player = document.querySelector('.player');
  const viewer = document.querySelector('.viewer');
  const playButton = document.querySelector('.toggle');
  const scrubber = document.querySelector('.progress');
  const volume = document.querySelector('input[name="volume"]');
  const playbackRate = document.querySelector('input[name="playbackRate"]');
  const skipBack = document.querySelector('button[data-skip="-10"]');
  const skipForward = document.querySelector('button[data-skip="25"]');


  // play/pause functions
  let isPlaying = false;
  const handlePlayToggle = function(){
    
    isPlaying = !isPlaying; // flip isPlaying flag
    
    if (isPlaying){
      viewer.play();
      playButton.innerText = "||";
    } else {
      viewer.pause();
      playButton.innerText = "►";
    }
  }

  const handleVolume = function(e){
    viewer.volume = e.currentTarget.value;
  }

  const handlePlaybackRate = function(e){
    console.log(e.currentTarget.value);
    viewer.playbackRate = e.currentTarget.value;
  }


  // playback listeners
  playButton.addEventListener('click', handlePlayToggle);
  viewer.addEventListener('click', handlePlayToggle);

  // volume listeners
  volume.addEventListener('change', handleVolume);
  volume.addEventListener('mousemove', handleVolume);

  //playback rate listener
  playbackRate.addEventListener('change', handlePlaybackRate);
  playbackRate.addEventListener('mousemove', handlePlaybackRate);



/* : some interesting things on video element for this project
   defaultPlaybackRate
   playbackRate
   volume
   seeking
   played - TimeRanges
   seekable - TimeRanges

   TimeRanges.start()
   TimeRanges.end()
 */

}());
