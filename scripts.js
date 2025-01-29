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
