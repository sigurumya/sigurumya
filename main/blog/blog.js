document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const jsonFile = `main/blog/${page.replace('.html', '.json')}`;
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const blogContent = document.getElementById('blog-content');

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
                }
                blogContent.appendChild(element);
            });
        })
        .catch(error => console.error('Error loading blog content:', error));
});