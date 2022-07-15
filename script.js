console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0; // initially 0 id waala song play hoga
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay'); //83 <i class="far fa-3x fa-play-circle" id="masterPlay"></i>
let myProgressBar = document.getElementById('myProgressBar');// 79 <input type="range" name="range" id="myProgressBar" min="0" value="0" max="100">
let gif = document.getElementById('gif'); // 87 <img src="playing.gif" width="42px" alt="" id="gif"> <span id="masterSongName">Warriyo - Mortals [NCS Release]</span>
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [ // array of objects hai ye
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
masterPlay.addEventListener('click', ()=>{// agar masterplay icon pe koi click karta hai to
    if(audioElement.paused || audioElement.currentTime<=0){ // agar audio paused hai yaa phir  chalu hi nahi hua to chalu kardo
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');// play button remove karo aur pause btn dikhao
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;// jo gif lagaya hai wo play karne pe dikhegaa pause pe nahi
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ //according to song played the seek bar will update acc to time ,, // audio me timeupdate ko listen karna hai
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); // ye karne se aayega ki kitna percent song chal chuka hai
    myProgressBar.value = progress;// setting the progress on progress bar
})

myProgressBar.addEventListener('change', ()=>{    // my progressbar pe change event laga rahe hai taaki jab bhi hum drag karke change kare to gaana aage piche ho// change event hai
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;// myProgressbar.value percent me hai to usko duration me convert karne ke liye divide by 100
                               // myProgressBar.value = progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
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
    if(songIndex>=9){
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