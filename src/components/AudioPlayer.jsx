import React, {useState} from "react";

{/* Audio Player */}
<audio controls>
<source src={surat.audioFull} type="audio/mpeg" />
</audio>

const AudioPlayer = ({ url, currentAudio, setCurrentAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    // Jika audio sudah ada sedang memutar audio yang sama
    if (currentAudio && currentAudio.src === url) {
      if (!currentAudio.paused) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
      return;
    }

    // Jika audio lain sedang diputar, hentikan
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(url);

    // Update state & jalankan audio
    setCurrentAudio(newAudio);
    newAudio.play();
    setIsPlaying(true);

    // Update isPlaying saat audio berakhir
    newAudio.addEventListener("ended", () => {
      setIsPlaying(false);
    });
    newAudio.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    newAudio.addEventListener("play", () => {
      setIsPlaying(true);
    });
  };

  return (
    <button onClick={handlePlayPause} className="btn btn-success btn-sm">
      {isPlaying ? (
        <i className="bi bi-stop-circle-fill"></i>
      ) : (
        <i className="bi bi-play-circle-fill"></i>
      )}
    </button>
  );
};

export default AudioPlayer;
