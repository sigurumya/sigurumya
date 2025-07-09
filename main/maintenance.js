window.addEventListener("load", () => {
  const fetchData = () => {
    fetch("maintenance.json")
      .then((resp) => resp.json())
      .then((json) => {
        const info = document.getElementById("time");
        info.innerHTML = "";
        json.forEach((item) => {
          info.innerHTML += `${item.time}`;
        });
      })
      .catch((error) => {
        console.error("Error fetching maintenance data:", error);
      });
  };
  fetchData();
  setInterval(fetchData, 30000);
});
window.location.assign("https://sigurumya.github.io/sigurumya/");