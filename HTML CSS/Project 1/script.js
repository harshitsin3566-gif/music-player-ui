const songs = [
{
    title: "Chaap Tilak",
    artist: "John Legend",
    file: "musics/ChaapTilak.mp3"
},
{
    title: "Just_A_Boy",
    artist: "Powfu",
    file: "musics/Just_A_Boy.mp3"
},
{
    title: "STFU",
    artist: "Ed Sheeran",
    file: "musics/STFU.mp3"
},
{
    title: "Tu Meri",
    artist: "Keane",
    file: "musics/TuMeri.mp3"
}
];

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const currentTimeEl =
    document.getElementById("current-time");

const durationEl =
    document.getElementById("duration");

const cover =
    document.getElementById("cover");

const playlistItems =
    document.querySelectorAll("#playlist li");

let currentSong = 0;

loadSong(currentSong);

function loadSong(index) {

    audio.src = songs[index].file;

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    updatePlaylist(index);
}

function updatePlaylist(index) {

    playlistItems.forEach(item =>
        item.classList.remove("active")
    );

    playlistItems[index].classList.add("active");
}

playBtn.addEventListener("click", () => {

    if(audio.paused){

        audio.play();
        playBtn.textContent = "⏸";

    } else {

        audio.pause();
        playBtn.textContent = "▶";
    }

});

nextBtn.addEventListener("click", () => {

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";
});

prevBtn.addEventListener("click", () => {

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";
});

playlistItems.forEach(item => {

    item.addEventListener("click", () => {

        currentSong =
            parseInt(item.dataset.index);

        loadSong(currentSong);

        audio.play();

        playBtn.textContent = "⏸";
    });

});

audio.addEventListener("timeupdate", () => {

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent || 0;

    currentTimeEl.textContent =
        formatTime(audio.currentTime);

});

audio.addEventListener("loadedmetadata", () => {

    durationEl.textContent =
        formatTime(audio.duration);

});

progress.addEventListener("input", () => {

    audio.currentTime =
        (progress.value / 100) *
        audio.duration;

});

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

audio.addEventListener("play", () => {

    cover.classList.add("playing");

});

audio.addEventListener("pause", () => {

    cover.classList.remove("playing");

});

audio.addEventListener("ended", () => {

    nextBtn.click();

});

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}