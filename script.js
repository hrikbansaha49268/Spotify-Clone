console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('master-play');
let myProgressBar = document.getElementById('my-progress-bar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('song-item'));
let masterSongName = document.getElementById('master-song-name');

let songs = [
    { songName: "Warriyo - Mortals (feat. Laura Brehm) [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Ceilo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Salam-e-Ishq", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('song-name')[0].innerText = songs[i].songName;
})

// Listen To Events

//Handle Play or Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime < 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
});

//Update Seekbar
audioElement.addEventListener('timeupdate', () => {
    console.log('Time Update');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    console.log(progress);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('song-item-play')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('song-item-play')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next-song').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('prev-song').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

