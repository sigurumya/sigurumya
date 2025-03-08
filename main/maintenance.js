window.addEventListener("load", () => {
  fetch("maintenance.json")
    .then((resp) => resp.json())
    .then((json) => {
      const info = document.getElementById("time");
      info.innerHTML = ""; // 既存の内容をクリア
      json.forEach((item) => {
        info.innerHTML += `${item.time}`;
      });
    })
    .catch((error) => {
      console.error("Error fetching maintenance data:", error);
    });
});
window.location.assign("https://sigurumya.glitch.me/index.html");