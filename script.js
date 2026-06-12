// Load songs from JSON
let songs = [];

let currentSong = 0;

const audio = new Audio();

// Elements
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Load songs.json
async function loadSongs() {

    try {

        const response = await fetch("songs.json");

        songs = await response.json();

        loadSong(0);

    } catch (error) {

        console.error("Error loading songs:", error);

    }

}

// Load selected song
function loadSong(index) {

    currentSong = index;

    audio.src = songs[index].audio;

    cover.src = songs[index].cover;

    title.innerText = songs[index].title;

    artist.innerText = songs[index].artist;

}

// Play song
function playSong() {

    audio.play();

    cover.classList.add("playing");

    playBtn.innerHTML =
        '<i class="fas fa-pause"></i>';

}

// Pause song
function pauseSong() {

    audio.pause();

    cover.classList.remove("playing");

    playBtn.innerHTML =
        '<i class="fas fa-play"></i>';

}

// Play / Pause button
playBtn.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});

// Next song
document.getElementById("next")
.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});

// Previous song
document.getElementById("prev")
.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});

// Progress bar update
audio.addEventListener("timeupdate", () => {

    progress.value =
        (audio.currentTime / audio.duration) * 100 || 0;

    document.getElementById("currentTime").innerText =
        formatTime(audio.currentTime);

    document.getElementById("duration").innerText =
        formatTime(audio.duration);

});

// Seek song
progress.addEventListener("input", () => {

    audio.currentTime =
        (audio.duration * progress.value) / 100;

});

// Volume control
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

// Format time
function formatTime(time) {

    if (isNaN(time)) return "0:00";

    let mins = Math.floor(time / 60);

    let secs = Math.floor(time % 60);

    if (secs < 10) {

        secs = "0" + secs;

    }

    return mins + ":" + secs;

}

// Auto next song
audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});

// Start application
loadSongs();

// document.body.style.background =
// `linear-gradient(
// 135deg,
// #7c3aed,
// #0f172a
// )`;