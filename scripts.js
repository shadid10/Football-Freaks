document.addEventListener("DOMContentLoaded", () => {
  // Existing Modal Code
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

  // Detect Developer Tools Opening
  setInterval(() => {
    if (
      window.outerHeight - window.innerHeight > 200 ||
      window.outerWidth - window.innerWidth > 200
    ) {
      document.body.innerHTML = "Developer Tools Detected! Access Denied.";
    }
  }, 1000);


  (function () {
    console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold;");
    console.log(
      "%cDo not attempt to hack this site!",
      "color: black; font-size: 20px;"
    );

    // Disable Console Access
    Object.defineProperty(console, "_commandLineAPI", {
      get: function () {
        throw new Error("Console access is disabled.");
      },
    });

    // Detect Console Open
    let devtools = false;
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        devtools = true;
        setTimeout(() => {
          document.body.innerHTML = "Access Denied!";
        }, 100);
      },
    });
    console.log("%c", element);
  })();


  // Tabbed Navigation Code
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // If "view all" tab is clicked
      if (tab.getAttribute("data-target") === "view-all") {
        // Add active class to all tabs
        tabs.forEach((btn) => btn.classList.add("active"));

        // Show all content
        contents.forEach((content) => content.classList.add("active"));
      } else {
        // Remove active class from all tabs
        tabs.forEach((btn) => btn.classList.remove("active"));

        // Add active class to the clicked tab
        tab.classList.add("active");

        // Show the relevant content and hide others
        const target = tab.getAttribute("data-target");
        contents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === target) {
            content.classList.add("active");
          }
        });
      }
    });
  });
});
