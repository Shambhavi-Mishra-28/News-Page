const API_KEY = '0ddd18e26eda4f46b1cf3ec91b211009';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => getNews('India'));

async function getNews(query){
    const result = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await result.json();
    // console.log(data);
    bindData(data.articles);

}

function bindData(articles) {
    const main =  document.getElementById('main');
    const templateCard = document.getElementById('template-card');

    main.innerHTML = '';

    articles.forEach((article) => {
        if(! article.urlToImage) return;
        const clone = templateCard.content.cloneNode(true);
        fillCard(clone, article);
        main.appendChild(clone);
    });
}

function fillCard(clone, article) {
    const newsImg = clone.querySelector('#news-img');
    const newsTitle = clone.querySelector('#news-title');
    const newsSource = clone.querySelector('#news-source');
    const newsBody = clone.querySelector('#news-body');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsBody.innerHTML = article.content;

    const date = new Date(article.publishedAt).toLocaleString('en-us', {
    timeZone: 'Asia/Jakarta', } );

    
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    clone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank');
    });
}

let selected = null;
function NavClick(id) {
    getNews(id);
    const navItem = document.getElementById(id);
    selected?.classList.remove('active');
    selected = navItem;
    selected.classList.add('active');
}

const searchBtn = document.getElementById('btn');
const searchBox = document.getElementById('search-box');

 searchBtn.addEventListener("click", () => {
    const query = searchBox.value;
    if(! query) return;
    getNews(query);
    selected?.classList.remove('active');
    selected = null;

 });


function reload() {
    window.location.reload();
}