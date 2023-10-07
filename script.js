console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
// Getting Element by Id to manipulate them throgh Java Script
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    // If Song is Paused
    if(audioElement.paused || audioElement.currentTime<=0){
        // Play the audio
        audioElement.play();
        // Removig fa Play Circle
        masterPlay.classList.remove('fa-play-circle');
        // Adding fa Pause circle
        masterPlay.classList.add('fa-pause-circle');
        // opacity 
        gif.style.opacity = 1;
    }
    else{
        // if Audio is already played then pause it when click
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})
// Manipulating My progress Bar
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        // this function defined above
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // It will change the play icon by clicking on them
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        // It will get source song by clicking
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        // For the current song the time will become zero
        audioElement.currentTime = 0;
        // stong will started played
        audioElement.play();
        // gif opacity will started
        gif.style.opacity = 1;
        // play circle remove
        masterPlay.classList.remove('fa-play-circle');
        // pause circle added
        masterPlay.classList.add('fa-pause-circle');
    })
})
// if someone press button next then what should happen
document.getElementById('next').addEventListener('click', ()=>{
 // if the current song is the last song then update to zero
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        // update song index
        songIndex += 1;
    }
    // Getting the song name
    audioElement.src = `songs/${songIndex+1}.mp3`;
    // finding he innerText of the songName for the current song
    masterSongName.innerText = songs[songIndex].songName;
    // current Time for the current song to zero
    audioElement.currentTime = 0;
    // Play that song 
    audioElement.play();
    // romove play icon 
    masterPlay.classList.remove('fa-play-circle');
    // add pause iconf
    masterPlay.classList.add('fa-pause-circle');

})
// Same as Above for the previous button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})