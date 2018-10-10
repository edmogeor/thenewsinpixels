//© COPYRIGHT GEORGE EDMONDS 2018

var sourcelist = "the-huffington-post,bbc-news,cnn,the-new-york-times,fox-news,nbc-news,the-guardian-uk,the-telegraph,independent,metro,mirror,"

function getImage(){
 $.getJSON('https://newsapi.org/v2/everything?sources=' + sourcelist + '&language=en&pageSize=100&apiKey=fcfbb627476e4bf39968dbe306b6c333', urlArray);
};

var imgURLs = []
var pixelArray = []

var img = new Image();
var canvas;
var context;

function urlArray(data){
  if (data) {
    for (var i = 0; i < data.articles.length; i++) {
      if (data.articles[i].urlToImage !== null) {
        imgURLs[i] = {
          articleURL: data.articles[i].url,
          articleTime: moment(data.articles[i].publishedAt).format('DD/MM/YY HH:mm'),
          articleSource: data.articles[i].source.name,
          articleHeadline: data.articles[i].title,
          imgURL: "https://cors-anywhere.herokuapp.com/" + data.articles[i].urlToImage
          }
        }
      }
      makeCanvas();
    }
  }

  var canvas = [];
  var context = [];
  var images = [];

  var arrayLength = imgURLs.length

  for (var j = 0, len = imgURLs.length; j < len; j++) {
    var item = itemsToIterate[i];
  }

var allInfo = [];

function makeCanvas() {
  for (var j = 0; j < imgURLs.length; j++) {
    images[j] = new Image();
    images[j].setAttribute('crossOrigin', '')
    var newCanvas = document.createElement('canvas');
    newCanvas.id = String(j);
    newCanvas.className = "pixelcanvas"
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(newCanvas);
    canvas[j] = document.getElementById(String(j))
    context[j] = canvas[j].getContext("2d");

    if (imgURLs[j]) {
      images[j].src = imgURLs[j].imgURL
    }

    if (images[j].src !== null) {
      context[j].canvas.height = images[j].height
      context[j].canvas.width = images[j].width
    }

  }

  var rawpixelData = [];
  var pixelData = [];
  var pixellocation1 = 5221;
  var pixellocation2 = 4539;

  for (var n = 0; n < imgURLs.length; n++) {
    context[n].drawImage(images[n], 0, 0);
    if (context[n].canvas.width != 0 && context[n].canvas.height != 0) {
      rawpixelData[n] = context[n].getImageData(0, 0, images[n].width, images[n].height).data;
      pixelData[n] = {
        avgred: Math.floor(((rawpixelData[n][pixellocation1*4]) + (rawpixelData[n][pixellocation2*4])) / 2),
        avggreen: Math.floor(((rawpixelData[n][(pixellocation1*4)+1]) + (rawpixelData[n][(pixellocation1*4)+1])) /2),
        avgblue: Math.floor(((rawpixelData[n][(pixellocation1*4)+2]) + (rawpixelData[n][(pixellocation1*4)+2])) /2),
        avgalpha: Math.floor(((rawpixelData[n][(pixellocation1*4)+3]) + (rawpixelData[n][(pixellocation1*4)+3])) /2)
      }
      allInfo[n] = {
        colour: "rgba(" + pixelData[n].avgred + ',' + pixelData[n].avggreen + ',' + pixelData[n].avgblue + ',' + pixelData[n].avgalpha + ')',
        articleURL: imgURLs[n].articleURL,
        articleTime: imgURLs[n].articleTime,
        articleSource: imgURLs[n].articleSource,
        articleHeadline: imgURLs[n].articleHeadline
      }
      allInfo[n].colour = tinycolor(allInfo[n].colour).saturate(amount = 52.214539).toString();
    }
  }

  allInfo = allInfo.filter(function(x){
    return (x !== (undefined || null || ''));
  });

  allInfo.sort(function(a, b){return a-b});

  if (allInfo.length >= 49) {
    setColour();
  } else if (allInfo.length < 49) {
    getImage();
    urlArray();
  }
}
