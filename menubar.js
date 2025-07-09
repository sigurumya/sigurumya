window.addEventListener("load", () => {
  for (const bar of document.getElementsByClassName("header-list")) {
    for (const a of bar.getElementsByTagName("a")) {
      if (a.href == window.location.href) {
        a.className = "active";
      }
    }
  }
});

let lastTouchTime = 0;

function toggleMenu(event) {
  const target = event.target;
  const currentTime = new Date().getTime();
  
  if (event.type === "touchstart") {
    lastTouchTime = currentTime;
  } else if (event.type === "click" && currentTime - lastTouchTime < 500) {
    return;
  }

  if (target.classList.contains("menuicon")) {
    event.stopPropagation();
    event.preventDefault();
    
    for (const bar of document.getElementsByClassName("header-list")) {
      if (bar.classList.contains("open")) {
        bar.classList.remove("open");
      } else {
        bar.classList.add("open");
      }
    }
  }
}

window.addEventListener("click", toggleMenu);
window.addEventListener("touchstart", toggleMenu);
//window.location.assign("https://sigurumya.glitch.me/main/maintenance.html");