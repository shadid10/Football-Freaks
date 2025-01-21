document.addEventListener("DOMContentLoaded", () => {
  // Open links in a new browser window
  document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;
      const link = button.dataset.link;

      if (type === "m3u8") {
        // Open the .m3u8 link in a new tab with an HLS player
        const newWindow = window.open("", "_blank", "width=800,height=600");
        if (newWindow) {
          newWindow.document.write(`
                        <html>
                            <head>
                                <title>Video Player</title>
                                <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
                                <style>
                                    body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black; }
                                    video { width: 90%; max-width: 800px; height: auto; }
                                </style>
                            </head>
                            <body>
                                <video id="video" controls autoplay muted></video>
                                <script>
                                    const video = document.getElementById('video');
                                    if (Hls.isSupported()) {
                                        const hls = new Hls();
                                        hls.loadSource('${link}');
                                        hls.attachMedia(video);
                                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                                        video.src = '${link}';
                                    } else {
                                        document.body.innerHTML = '<p style="color: white;">Your browser does not support HLS playback.</p>';
                                    }
                                </script>
                            </body>
                        </html>
                    `);
        }
      } else if (type === "iframe") {
        // Open the iframe link directly in a new tab
        window.open(link, "_blank");
      }
    });
  });
});
