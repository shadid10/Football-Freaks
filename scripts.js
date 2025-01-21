document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("video-modal");
  const videoElement = document.getElementById("video");
  const iframeElement = document.getElementById("iframe");
  const closeModal = document.getElementById("close-modal");

  // Open modal and play video
  document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;
      const link = button.dataset.link;

      modal.style.display = "flex";

      if (type === "m3u8") {
        iframeElement.style.display = "none";
        videoElement.style.display = "block";
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(link);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = link;
        }
        videoElement.muted = true; // Start muted
        videoElement.play();
      } else if (type === "iframe") {
        videoElement.style.display = "none";
        iframeElement.style.display = "block";
        iframeElement.src = link;
      }
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    videoElement.pause();
    videoElement.src = "";
    iframeElement.src = "";
  });
});
