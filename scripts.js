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

  // Standings Modal
  const standingsModal = document.getElementById("standings-modal");
  const standingsIframe = document.getElementById("standings-iframe");
  const closeStandings = document.getElementById("close-standings");

  // Open standings modal when "Click to See" button is clicked
  document.querySelectorAll(".standings-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const link = button.dataset.link;
      standingsIframe.src = link; // Set iframe source
      standingsModal.style.display = "flex";
    });
  });

  // Close modal on button click
  closeStandings.addEventListener("click", () => {
    standingsModal.style.display = "none";
    standingsIframe.src = ""; // Reset iframe to stop loading
  });

  // Close modal if user clicks outside modal content
  standingsModal.addEventListener("click", (event) => {
    if (event.target === standingsModal) {
      standingsModal.style.display = "none";
      standingsIframe.src = "";
    }
  });

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
