new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Life Of Pazham",
          artist: "Anidrudh Ravichandran - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b2730b046aa68f41ed53875a6b4e",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Life-of-Pazham-Harish.mp3",
          url: "https://youtu.be/bB-HQgHE5Gc",
          favorited: false
        },
        {
          name: "Thenmozhi",
          artist: "Anirudh Ravichandran - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b27382a4489bc3e7f3d1372b3350",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Thenmozhi-Harish.mp3",
          url: "https://youtu.be/K95tfEm7wwY",
          favorited: true
        },
        {
          name: "Megham Karukatha",
          artist: "Anidrudh Ravichandran - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b273a88e2419e55cfdf1bf2a2fe2",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Megham-Karukatha-Harish.mp3",
          url: "https://youtu.be/zYc83YbeU-U",
          favorited: false
        },
        {
          name: "Thai Kelavi",
          artist: "Anidrudh Ravichandran - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b273e3b15ec025f8e74aac8e9393",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Thaai-Kelavi-Harish.mp3",
          url: "https://youtu.be/q6LjN1UVPkE",
          favorited: false
        },
        {
          name: "Po Nee Po - The Pain of Love",
          artist: "Anirudh Ravichander - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b2730d66934f5370419636c78f18",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Poo-Nee-Poo-Harish.mp3",
          url: "https://youtu.be/DnyA_qEbTpw",
          favorited: true
        },
        {
          name: " Poo Indru Neeyaga",
          artist: "Anidardh Ravichandran - Harish",
          cover: "https://i.scdn.co/image/ab67616d00001e021fd89eb7aa5bd5dad8ee7e2e",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Po-Indru-Neeyaga-%20Harish.mp3",
          url: "https://youtu.be/xSrgt6QG0nE",
          favorited: false
        },
        {
          name: "Ey Inga Paaru",
          artist: "Anirudh Ravichander - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b2737f41c0c85e10ce786b7846d9",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Ey-Inga-Paaru-Harish.mp3",
          url: "https://youtu.be/svHICCAeZ9I",
          favorited: true
        },
        {
          name: "Ponni Nadhi",
          artist: "A.R Rahman - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b273dfec68576484f46ec3c52497",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Ponni-Nadhi-Harish.mp3",
          url: "https://youtu.be/Oh5sU8YzF1A",
          favorited: false
        },
        {
          name: "Maatna Gaali",
          artist: "Santhosh Narayanan - Harish",
          cover: "https://i.scdn.co/image/ab67616d0000b2730f86eaea5b4a7913ef64e11e",
          source: "https://github.com/HarishSrinivasSR/audioplayer/raw/main/Maatna-Gaali-Harish.mp3",
          url: "https://youtu.be/SHSbnLOCgto",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
<!-- Final Audio Player Project By Harish Srinivas SR 2016036 -->
