
//add async/await featur to babel in es7
import 'babel-polyfill'
let news;
let vote = [];
//make sure that all elments are being laoded on the page
document.addEventListener('DOMContentLoaded', () => {
  news = document.getElementById('news');
  let search = document.getElementById('search')

  search.addEventListener('keyup', (event) => {
    // console.log(event)/
    if (event.key == 'Enter') {
      getNews(search.value)
    }
  })

  getNews('iraq')
})

async function getNews(query) {
  let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
  let content = await response.json()
  if (vote.length == 0) {
    for (let index = 0; index < content.articles.length; index++) {
      vote.push(1);

    }

  }
  vote = JSON.parse(localStorage.getItem('voteed'));
  loadDB()

  updateUI(content.articles.map(createArticle).join('\n'))
}
function loadDB() {
  for (let index = 0; index < vote.length; index++) {
    localStorage.setItem('voteed', JSON.stringify(vote));
  }
}
function updateUI(content) {
  news.innerHTML = content
  count()
}

function createArticle(article, i) {
  return `

    <article id="${i}">
      <img width="124px" height="124px" src="${article.urlToImage}" alt="">
      <div id="text">
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <time>${article.publishedAt}</time>
      </div>
      <div id="voter">
        <img height="13px" id="" onclick="" class="up" src="${require('./assets/upvote.svg')}" alt="">
        <div id="counter"><p id="description${i}">${vote[i]}</p></div>
        <img  height="13px" class="down" src="${require('./assets/downvote.svg')}" alt="">
      </div>
    </article>
  `

}
function count() {

  let upvote = document.getElementsByClassName('up')

  for (let index = 0; index < upvote.length; index++) {
    upvote[index].addEventListener('click', (event) => {
      document.getElementById("description" + index).textContent = vote[index]++;
      loadDB()
    })

  }
  let downvote = document.getElementsByClassName('down')

  for (let index = 0; index < downvote.length; index++) {
    downvote[index].addEventListener('click', (event) => {
      document.getElementById("description" + index).textContent = vote[index]--;
      loadDB()

    })

  }

}
