document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  if (!id) {
    const match = location.pathname.match(/\/([A-Za-z0-9_-]+)\.html$/);
    if (match) id = match[1];
  }
  if (!id) {
    document.getElementById('blog-content').textContent = "記事IDが指定されていません。";
    return;
  }
  const jsonFile = `main/blog/${id}.json`;
  fetch(jsonFile)
  .then(response => {
    if (!response.ok) throw new Error('記事が見つかりません');
    return response.json();
  })
  .then(data => {
    const blogContent = document.getElementById('blog-content');
    blogContent.innerHTML = '';
    const title = document.createElement('h1');
    title.textContent = data.title;
    blogContent.appendChild(title);
    const subtitle = document.createElement('h2');
    subtitle.textContent = `～ ${data.subtitle} ～`;
    blogContent.appendChild(subtitle);
    const date = document.createElement('p');
    date.textContent = `投稿日: ${data.date}`;
    blogContent.appendChild(date);
    data.content.forEach(item => {
      let element;
      switch (item.type) {
        case 'p':
          element = document.createElement('p');
          element.textContent = item.text;
          break;
        case 'h3':
          element = document.createElement('h3');
          element.textContent = item.text;
          break;
        case 'a':
          element = document.createElement('a');
          element.href = item.href;
          element.textContent = item.text;
          break;
        case 'img':
          element = document.createElement('img');
          element.src = item.src;
          element.alt = item.alt;
          break;
        case 'html':
          element = document.createElement('div');
          element.innerHTML = item.text;
          break;
        case 'video':
          element = document.createElement('video');
          element.src = item.src;
          element.controls = item.controls || false;
          element.style.maxWidth = "90%";
          element.style.display = "block";
          element.style.margin = "20px auto";
          break;
      }
      blogContent.appendChild(element);
    });
  })
  .catch(error => {
    document.getElementById('blog-content').textContent = error.message;
  });
});