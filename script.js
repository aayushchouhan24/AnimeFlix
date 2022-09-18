var clutter = ``
//  FIX ME 
// var fetched={}
// var Api = require('google-search-results-nodejs')
// const search = new Api.GoogleSearch("ecff6961562eb684b4e3171800cab06634c5bf2794468500c5b16f944b9b10d2");
// const callback = function (data) {fetched =data["images_results"];};

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

var arr = [
  { title: "Tokyo Ghoul", description: "A Tokyo college student is attacked by a ghoul, a superpowered human who feeds on human flesh. He survives, but has become part ghoul and becomes a fugitive on the run.", query: "site:deviantart.com anime, Tokyo Ghoul,Fan Artimagesize:1920x1080" },
  { title: "Naruto", description: "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.", query: "site:deviantart.com anime, Naruto, Fan Art,Fight Seen imagesize:1920x1080" },
  { title: "Death Note", description: "Death Note is a Japanese manga series.The story follows Light Yagami, a teen genius who discovers a mysterious notebook: The 'Death Note', which belonged to the shinigami Ryuk, and grants the user the supernatural ability to kill anyone whose name is written in its pages.", query: "site:deviantart.com anime, Death Note, Fan Art imagesize:1920x1080" },
];
function more(data) {
  let c = ``
  for (let i = 0; i < Math.floor((Math.random() * 15) + 4); i++) {
    c += ` 
    <div id="item">
    <div style='  background-image: url("${data[i + 1].original}")'
        id="img"></div>
    <h1>By Gokō-no surikire</h1>
    </div>`
  }
  return c
}
arr.forEach(function (item, i) {
  // 
  //  FIX ME 
  // search.json({
  //   q: item.query,
  //   tbm: "isch",
  //   ijn: "0"
  // }, callback);
  // 
  //  Temporary Code 
  getJSON(`https://serpapi.com/search.json?q=${item.query}&tbm=isch&ijn=0&api_key=f18f3a5d88f6957f2beda0f5a4ab2f711ea7ded1c90ae5bbd545e8404bbcb914`,
    function (err, data) {
      var fetched = data["images_results"]
      clutter += `
      <div class="section" id="page" data-ID=${i}>
      <img id="background" class="bk" src="${fetched[Math.floor((Math.random() * 100) + 0)].original}">
            <div class="container" data-ID="hook" id=${i}>
                <div id="top">
                <h1>${item.title}</h1>
                <p>${item.description}</p>     
                    <button id ="save" class='btn'><span>Save</span></button>
                </div>
                <div id="bottom">
                    <div id="more">`
      for (let k = 1; k < Math.floor((Math.random() * 3) + 14); k++) {

        clutter += `      <div id="item">
                            <div class="next${i}" style='  background-image: url("${fetched[k * Math.floor((Math.random() * 6) + 2)].original}")'
                                id="img"></div>
                            <h1>By Gokō-no surikire</h1>
                        </div>`}
      clutter += `  </div>
                </div>
            </div>
        </div>`
      document.querySelector("#fullPage").innerHTML = clutter;
    });
})

var isrunning = false;
var timer;
var x = 0;
function random() {
  return Math.floor((Math.random() * document.querySelectorAll(`.next${1}`).length) + 1);
}
function displayNextImage() {
  if (isrunning) {
    document.querySelectorAll(".bk")[x].src = document.querySelectorAll(`.next${x}`)[random()].style.backgroundImage.replace('url("', "").replace('")', '');
  }
}
function startTimer() {
  timer = setInterval(displayNextImage, 3000);
}
startTimer()


document.querySelector("#fullPage").addEventListener("mouseover", (evt) => {
  x = evt.target.dataset.id
  if (evt.target.id == 'page') {
    isrunning = true
  } else {
    isrunning = false
  }
})

const scrollContainer = document.querySelector("#fullPage");
scrollContainer.addEventListener("mousemove", (evt) => {
  if (event.target.id == "more") {
    event.target.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      event.target.scrollLeft += evt.deltaY * 0.01;
      fullpage_api.setAllowScrolling(false)
    });
  } else {
    fullpage_api.setAllowScrolling(true)
  }
})
var a = new fullpage(' #fullPage', {
  autoScrolling: true,

})


  .scrollTo()
