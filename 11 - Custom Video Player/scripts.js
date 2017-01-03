(function(){
  "use strict";
  // Get Player Elements
  const player = document.querySelector('.player');
  const viewer = document.querySelector('.viewer');
  const playButton = document.querySelector('.toggle');
  const scrubber = document.querySelector('.progress');
  const progress = scrubber.querySelector('.progress__filled');
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
  
  let isScrubbing = false;

  const handleUpdateTime = function(e){
    const playhead = e.target.currentTime
    , duration = e.target.duration
    , total = (playhead / duration) * 100; // get percentage

    //update the scubber
    // const progress = scrubber.querySelector('.progress__filled');
    progress.style.flexBasis = total + '%';

    console.log('played', playhead, 'of', duration);
  }

  const handleSeek = function(e){
    // console.log(e);
    const totalWidth = e.currentTarget.offsetWidth;
    const movePlayhead = (e.offsetX / totalWidth) * 100;
    const currentTime = viewer.currentTime;
    const totalTime = viewer.duration; 
    // 560/100 * 95
    // console.log((movePlayhead / totalWidth) * 100);
    if (isScrubbing || e.type === 'click') {
      progress.style.flexBasis = ((currentTime / totalTime) * 100) + '%';
      viewer.currentTime = (totalTime / 100) * movePlayhead;
    }
  }

  const handleScrub = function(e){
    isScrubbing = !isScrubbing;
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

  viewer.addEventListener('timeupdate', handleUpdateTime);

  scrubber.addEventListener('click', handleSeek);
  scrubber.addEventListener('mousemove', handleSeek);
  scrubber.addEventListener('mousedown', handleScrub);
  scrubber.addEventListener('mouseup', handleScrub);


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
