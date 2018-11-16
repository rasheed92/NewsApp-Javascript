
//add async/await featur to babel in es7
import 'babel-polyfill'
let news;
let c;
//make sure that all elments are being laoded on the page
document.addEventListener('DOMContentLoaded', ()=>{
  news = document.getElementById('news');
  let search = document.getElementById('search')

  search.addEventListener('keyup', (event)=>{
    // console.log(event)/
    if(event.key == 'Enter') {
      getNews(search.value)
    }
  })

  getNews('iraq')
})

async function getNews(query) {
  let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
  let content = await response.json()



  console.log(content)
  updateUI(content.articles.map(createArticle).join('\n'))
}

function updateUI(content) {
  news.innerHTML = content
  count()
}

function createArticle(article, i) {
  article.counter = 1
   c=1
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
        <div id="counter${i}">${c}</div>
        <img  height="13px" src="${require('./assets/downvote.svg')}" alt="">
      </div>
    </article>
  `
  
}
function count(){

  let buttons = document.getElementsByClassName('up')

  for (let index = 0; index < buttons.length; index++) {

    buttons[index].addEventListener('click', (event)=>{
      c=c+1
      alert(c)
    })    
    
   }
   createArticle(article, i)



// }
// let up=document.getElementById('up')
// up.addEventListener('click', (event)=>{
//       alert(article, event.target.id)
//     })  
}