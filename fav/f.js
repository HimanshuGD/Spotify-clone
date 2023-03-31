console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "One Call Away", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "With you", filePath: "songs/2.mp3", coverPath: "covers/4.jpg"},
    {songName: "Daylight", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Love me Like you", filePath: "songs/4.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sweet Dreams", filePath: "songs/5.mp3", coverPath: "covers/9.jpg"},
    {songName: "Fun-We are Young", filePath: "songs/6.mp3", coverPath: "covers/10.jpg"},
    {songName: "Bad liar-Imagine Dragon", filePath: "songs/7.m4a", coverPath: "covers/5.jpg"},
    {songName: "Beleiver", filePath: "songs/8.m4a", coverPath: "covers/6.jpg"},
    {songName: "Bird", filePath: "songs/9.mp3", coverPath: "covers/5.jpg"},
    {songName: "Shot", filePath: "songs/10.mp3", coverPath: "covers/6.jpg"},
    {songName: "Whatever it takes", filePath: "songs/11.mp3", coverPath: "covers/5.jpg"},
    {songName: "Every breath you take", filePath: "songs/12.mp3", coverPath: "covers/3.jpg"},
    {songName: "Freaky Friday", filePath: "songs/13.mp3", coverPath: "covers/2.jpg"},
    {songName: "Scared of the dark", filePath: "songs/14.mp3", coverPath: "covers/11.jpg"},
    {songName: "Internet Money", filePath: "songs/15.mp3", coverPath: "covers/8.jpg"}, 
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

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
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=15){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

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



let search = document.getElementById('searchtxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('songName');
    Array.from(noteCards).forEach(function(element){
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if(cardtxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardtxt);
    })
})

