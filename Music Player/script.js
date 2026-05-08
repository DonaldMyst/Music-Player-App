let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeEl = document.getElementById("currentTime");
let durationEl = document.getElementById("duration");
let thumbnail = document.querySelector(".thumbnail");
let fileInput = document.getElementById("fileInput");
let playlistEl = document.getElementById("playlist");

const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
    stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16">
    </rect><rect x="14" y="4" width="4" height="16"></rect> </svg>`;

const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
    stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;

let songs = [];
let currentSongIndex = 0;

fileInput.addEventListener("change", function(){
    songs = Array.from(this.files);
    renderPlaylist();
    loadSong(0);
});

function renderPlaylist(){
    playlistEl.innerHTML = "";
    songs.forEach((file, index) => {
        let li = document.createElement("li");
        li.textContent = file.name;
        li.onclick = () => loadSong(index);
        playlistEl.appendChild(li);
    });
}

function loadSong(index){
    currentSongIndex = index;

    let file = songs[index];
    let url = URL.createObjectURL(file);

    song.src = url;
    song.play();

    ctrlIcon.innerHTML = pauseIcon;
    thumbnail.classList.add("playing");
}

function playPause(){
    if(song.paused){
        song.play();
        ctrlIcon.innerHTML = pauseIcon;
        thumbnail.classList.add("playing");
    } else {
        song.pause();
        ctrlIcon.innerHTML = playIcon;
        thumbnail.classList.remove("playing");
    }
}

function nextSong(){
    if(songs.length === 0) return;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong(){
    if(songs.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

function forward(){
    song.currentTime += 10;
}

function backward(){
    song.currentTime -= 10;
}

song.addEventListener("timeupdate", function(){
    progress.value = song.currentTime;
});

progress.addEventListener("input", function(){
    song.currentTime = progress.value;
});

song.addEventListener("ended", nextSong);