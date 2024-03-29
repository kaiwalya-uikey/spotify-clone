console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0; // initially 0 id waala song play hoga
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay'); //83 <i class="far fa-3x fa-play-circle" id="masterPlay"></i>
let myProgressBar = document.getElementById('myProgressBar');// 79 <input type="range" name="range" id="myProgressBar" min="0" value="0" max="100">
let gif = document.getElementById('gif'); // 87 <img src="playing.gif" width="42px" alt="" id="gif"> <span id="masterSongName">Warriyo - Mortals [NCS Release]</span>
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = document.getElementsByClassName('songItemPlay');
// let previous= document.getElementsByClassName('previous');

let songs = [ // array of objects hai ye
    { songName: "Dhakka - Sidhu Moosewala", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Born to Shine - Diljit Dosanjh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "GOAT - Diljit Dosanjh", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Paasori", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "So-High - Sidhu Moosewala", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Sulthan - KGF-2", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Luna - Diljit Dosanjh", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "No Love - Shubh", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Old skool - Sidhu Moosewala", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "We Rollin - Shubh", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
    { songName: "Excuses - A.P.Dhillon", filePath: "songs/11.mp3", coverPath: "covers/11.jpg" },
    { songName: "Devil Eyes", filePath: "songs/12.mp3", coverPath: "covers/12.jpg" },
    { songName: "Gangsta's Paradise", filePath: "songs/13.mp3", coverPath: "covers/13.jpg" },
    { songName: "THUG LIFE - Diljit Dosanjh", filePath: "songs/14.mp3", coverPath: "covers/4.jpg" },
    { songName: "So-High - Sidhu Moosewala", filePath: "songs/15.mp3", coverPath: "covers/15.jpg" },
    { songName: "Sulthan - KGF-2", filePath: "songs/16.mp3", coverPath: "covers/6.jpg" },
    { songName: "Luna - Diljit Dosanjh", filePath: "songs/17.mp3", coverPath: "covers/7.jpg" },
    { songName: "No Love - Shubh", filePath: "songs/18.mp3", coverPath: "covers/8.jpg" },
    { songName: "Old skool - Sidhu Moosewala", filePath: "songs/19.mp3", coverPath: "covers/9.jpg" },
    { songName: "We Rollin - Shubh", filePath: "songs/20.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // array ko iterate karke hum song name set kar rahe hai songs naaam kaa array hai
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {// agar masterplay icon pe koi click karta hai to
    if (audioElement.paused || audioElement.currentTime <= 0) { // agar audio paused hai yaa phir  chalu hi nahi hua to chalu kardo
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');// play button remove karo aur pause btn dikhao
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;// jo gif lagaya hai wo play karne pe dikhegaa pause pe nahi
        // e.target.classList.remove('fa-play-circle');
        // e.target.classList.add('fa-pause-circle');
        // element.classList.remove('fa-play-circle');
        // element.classList.add('fa-pause-circle');

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => { //according to song played the seek bar will update acc to time ,, // audio me timeupdate ko listen karna hai
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); // ye karne se aayega ki kitna percent song chal chuka hai
    myProgressBar.value = progress;// setting the progress on progress bar
})

myProgressBar.addEventListener('change', () => {    // my progressbar pe change event laga rahe hai taaki jab bhi hum drag karke change kare to gaana aage piche ho// change event hai
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;// myProgressbar.value percent me hai to usko duration me convert karne ke liye divide by 100
    // myProgressBar.value = progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
})

let makeAllPlays = () => {// ye ek function banaya jab ek song play ho raha hai to dusre song ki btn pe play kaa btn dikhaye aur us song pe pause ka btn
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => { //<span class="songlistplay"><span class="timestamp">05:34 <i id="0" class="far songItemPlay fa-play-circle"></i> </span></span>
    // sonss ke name ke side me jo play button hai uspe click event laga rahe hai songItemPlay se usko access kar re
    element.addEventListener('click', (e) => { // in btn par koi bhi click karta hai to hum ek callback function run karenge jisse song play hoga
        makeAllPlays();// ye function hai jo
        songIndex = parseInt(e.target.id);// e.target se wo element mil jaayega jis par click hua hai 
        e.target.classList.remove('fa-play-circle');// play btn remove karke pause btn add karo
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;// jis par click kar re wo song play honga // index +1 kyuki we started array from 0
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');// masterplay bole to wo niche waala play pause btn usko bhi updte kar re
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {// next bbtn pe click karenge to ye function run hoga
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    // e.target.classList.remove('fa-pause-circle');
    // e.target.classList.add('fa-play-circle');
    //  songItemPlay.classList.remove('fa-pause-circle');
    //  songItemPlay.classList.add('fa-play-circle');
    // element.addEventListener('click', (e)=>{ 
    //      e.target.classList.remove('fa-pause-circle');
    //  e.target.classList.add('fa-play-circle');
    // })

    //  const makeAllPlays = ()=>{
    //     Array.from(document.getElementsByClassName('songItemPlay')).forEach((eleme)=>{
    //         eleme.classList.remove('fa-pause-circle');
    //         eleme.classList.add('fa-play-circle');
    //      })
    //  }

    // element.classList.remove('fa-pause-circle');
    //       element.classList.add('fa-play-circle');

    // let makeAllPlays = () => {// ye ek function banaya jab ek song play ho raha hai to dusre song ki btn pe play kaa btn dikhaye aur us song pe pause ka btn
    //     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    //         element.target.classList.remove('fa-pause-circle');
    //         element.target.classList.add('fa-play-circle');
    //     })
    // }

    // Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    //     element.addEventListener('click', (e) => { // in btn par koi bhi click karta hai to hum ek callback function run karenge jisse song play hoga
    //         makeAllPlays();// ye function hai jo
    //         songIndex = parseInt(e.target.id);// e.target se wo element mil jaayega jis par click hua hai 
    //         e.target.classList.remove('fa-pause-circle');
    //         e.target.classList.add('fa-play-circle');// play btn remove karke pause btn add karo
    //         audioElement.src = `songs/${songIndex + 1}.mp3`;// jis par click kar re wo song play honga // index +1 kyuki we started array from 0
    //         masterSongName.innerText = songs[songIndex].songName;
    //         audioElement.currentTime = 0;
    //         audioElement.play();
    //         // gif.style.opacity = 1;


    //     })

    // })


})

document.getElementById('previous').addEventListener('click', () => {// previous pe koi click kare to ye function run karo 
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }



    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;// niche song kaa naam ke liye progress bar ke niche
    audioElement.currentTime = 0;
    audioElement.play();



    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // element.classList.remove('fa-pause-circle');
    // element.classList.add('fa-play-circle');


})


let para = document.getElementById('para');
para.addEventListener('click', function run() {
    alert('im a billioniare');
});