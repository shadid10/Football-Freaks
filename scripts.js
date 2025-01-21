document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("video-modal");
  const videoElement = document.getElementById("video");
  const iframeElement = document.getElementById("iframe");
  const closeModal = document.getElementById("close-modal");

  // Function to play m3u8 video
  function playM3U8Video(link) {
    videoElement.style.display = "block";
    iframeElement.style.display = "none";

    // Initialize HLS.js if supported
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(link);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.muted = true; // Mute the video initially
        videoElement.play(); // Play the video
      });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = link;
      videoElement.muted = true; // Mute the video initially
      videoElement.play(); // Play the video
    } else {
      alert("Your browser does not support HLS playback.");
    }
  }

  // Function to handle iframe video
  function playIframeVideo(link) {
    videoElement.style.display = "none";
    iframeElement.style.display = "block";
    iframeElement.src = link;
  }

  // Open modal and play video
  document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;
      const link = button.dataset.link;

      modal.style.display = "flex"; // Show modal

      if (type === "m3u8") {
        playM3U8Video(link);
      } else if (type === "iframe") {
        playIframeVideo(link);
      }
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
    videoElement.pause(); // Pause the video
    videoElement.src = ""; // Reset video source
    iframeElement.src = ""; // Reset iframe source
  });

  // Ensure pressing 'Esc' closes the modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
      videoElement.pause();
      videoElement.src = "";
      iframeElement.src = "";
    }
  });
});
