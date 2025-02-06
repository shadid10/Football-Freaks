document.addEventListener("DOMContentLoaded", async () => {
  const modal = document.getElementById("video-modal");
  const videoElement = document.getElementById("video");
  const iframeElement = document.getElementById("iframe");
  const closeModal = document.getElementById("close-modal");

  let shakaPlayer;

  // Fetch stream data from JSON file
  let streamData = {};
  try {
    const response = await fetch("streams.json");
    streamData = await response.json();
  } catch (error) {
    console.error("Failed to load stream data:", error);
  }

  // Open modal and play video
  document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const channel = button.dataset.channel;
      const stream = streamData[channel];

      if (!stream) {
        console.error("Channel not found in JSON.");
        return;
      }

      modal.style.display = "flex";

      if (stream.type === "dash") {
        iframeElement.style.display = "none";
        videoElement.style.display = "block";

        // Load Shaka Player
        if (!shakaPlayer) {
          shakaPlayer = new shaka.Player(videoElement);
        }

        // Configure DRM if available
        if (stream.drm) {
          shakaPlayer.configure({
            drm: {
              clearKeys: {
                [stream.drm.keyId]: stream.drm.key,
              },
            },
          });
        }

        try {
          await shakaPlayer.load(stream.url);
          videoElement.play();
        } catch (error) {
          console.error("Error loading DASH stream:", error);
        }
      } else if (stream.type === "m3u8") {
        iframeElement.style.display = "none";
        videoElement.style.display = "block";

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(stream.url);
          hls.attachMedia(videoElement);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play();
          });
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = stream.url;
          videoElement.play();
        }
      } else if (stream.type === "iframe") {
        videoElement.style.display = "none";
        iframeElement.style.display = "block";
        iframeElement.src = stream.url;
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
