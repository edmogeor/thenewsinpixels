//© COPYRIGHT GEORGE EDMONDS 2018

var scaler;

var numberofpixels = 49;

function scaling() {
  var w = window.innerWidth;
  var h = window.innerHeight;

  scaler = Math.min(
    w / 1024,
    h / 642
  );

  scaler = Math.max(Math.min(scaler, 1.6), 0.5);
  fontscale = Math.max(Math.min(scaler, 1.5), 0.5);

  scaleGrid();
}

function setDivs () {
  for (var d = 0; d < numberofpixels; d++) {
    var newCell = document.createElement('div');
    newCell.id = "cell" + String(d);
    newCell.className = "cell"
    var grid = document.getElementById("grid");
    grid.appendChild(newCell);
    $("#cell" + String(d)).css("width", 100 + '%');
    $("#cell" + String(d)).css("height", 100 + '%');
    var newPixel = document.createElement('div');
    newPixel.id = "pixel" + String(d);
    newPixel.className = "pixel"
    var cell = document.getElementById("cell" + String(d));
    cell.appendChild(newPixel);
    $("#pixel" + String(d)).css("width", 15*scaler + 'px');
    $("#pixel" + String(d)).css("height", 15*scaler + 'px');
  }
}

var cursorWidth;
var pixelWidth;

function scaleGrid() {

  cursorWidth = 35*scaler;
  pixelWidth = 15*scaler;

  $('h7').css('font-size', 15*fontscale + 'px');
  $('h6').css('font-size', 15*fontscale + 'px');
  $('h2').css('font-size', 18*fontscale + 'px');
  $('h1').css('font-size', 20*fontscale + 'px');

  $('#number').css('margin-right', 30*fontscale + 'px');

  var containerW = 500*scaler

  $("#square-container").css("width", containerW + 'px');
  $("#square-container").css("height", 500*scaler + 'px');
  $("#square-container").css("border", 1.3333333*scaler + 'px solid white');
  $("#grid-container").css("width", 460*scaler + 'px');
  $("#grid-container").css("height", 460*scaler + 'px');
  $("#grid").css("grid-gap", 20*scaler + 'px');

  $(".pixel").css("width", pixelWidth + 'px');
  $(".pixel").css("height", pixelWidth + 'px');

  var headermargin = (16*scaler)
  var headerH = $("#header").outerHeight()
  var cornerX = (window.innerWidth/2 - containerW/2)
  var cornerY = (window.innerHeight/2 - containerW/2 - headerH - headermargin)

  $('#header').css('transform', 'translate(' + cornerX + 'px,' + cornerY + 'px)');
  $('#header').css('width', containerW + 'px');

  $('#headlinetext').css('max-width', 320*fontscale + 'px');
  $('#info-header').css('padding', 20*fontscale + 'px');
  $('#info-header').css('padding-bottom', 15*fontscale + 'px');

  $('#headline-container').css('padding', 20*fontscale + 'px');
  $('#headline-container').css('padding-top', 15*fontscale + 'px');
  $('#timetext').css('margin-top',3.75*fontscale + 'px');

  $("#info-header").css("border-bottom", 1.3333333*scaler + 'px solid #5C5C5C');

  $("#info-container").css("border", 1.3333333*scaler + 'px solid white');

  $("#cursor").css("height", cursorWidth + 'px');
  $("#cursor").css("width", cursorWidth + 'px');

  $("#loading").css("margin-left", 35*scaler + 'px');

  $("#reload").css("width", 20*scaler + 'px');
  $("#reload").css("height", 20*scaler + 'px');
}

var infocontainerH;
var infocontainerW;

function draw() {
  infocontainerH = $("#info-container").height();
  infocontainerW = $("#info-container").width();

  $('#cursor').css('transform', 'translate(' + (mouseX-(cursorWidth/2)) + 'px,' + (mouseY-(cursorWidth/2)) + 'px)');
  var selectedArt = Number(selectedPixel.replace("pixel",""))
  if (selectedPixel!="none" && allInfo[0]!=undefined){
    $("#sourcetext").html(allInfo[selectedArt].articleSource);
    $("#headlinetext").html('“ ' + allInfo[selectedArt].articleHeadline + ' ”');
    $("#timetext").html(allInfo[selectedArt].articleTime);
  }
  if (selectedArt >= 34 && selectedPixel!="none") {
    $('#info-container').css('transform', 'translate(' + ((mouseX-infocontainerW)-(20*scaler)) + 'px,' + ((mouseY - infocontainerH)-(20*scaler)) + 'px)');
  }
  if (selectedArt <= 34 && selectedPixel!="none") {
    $('#info-container').css('transform', 'translate(' + (mouseX + (20*scaler)) + 'px,' + (mouseY + (20*scaler)) + 'px)');
  }
}

var selectedPixel = 'none';
var retainPixel;

function hoverDetection() {
  $( ".pixel" ).hover(
  function() {
    selectedPixel = this.id
    retainPixel = '#' + selectedPixel
    $("#info-container").css("display", 'block');
    $(retainPixel).animate({height: pixelWidth*1.5,width: pixelWidth*1.5}, 200, function() {});
  }, function() {
    selectedPixel = 'none';
    $("#info-container").css("display", 'none');
    $(retainPixel).animate({height: pixelWidth,width: pixelWidth}, 200, function() {});
  }
);

$(".pixel").click(function(){
  if (allInfo[0]!=undefined) {
    var selectedArt = Number(selectedPixel.replace("pixel",""))
      window.open(allInfo[selectedArt].articleURL, '_blank');
  }
});

}

function setColour() {
  if (allInfo.length > 49) {
    for (var q = 0; q < numberofpixels; q++) {
      $("#pixel" + String(q)).css("background-color", allInfo[q].colour);
      $("#pixel" + String(q)).css("border", 0.65*scaler + 'px solid white');
    }
    $("#grid-container").css("visibility", 'visible');
    $("#loading").css("display", 'none');
    $('.pixel').animateCss('zoomIn');
    $("#info-container").css("visibility", 'visible');
  }
}

function setColourReload(){
  if (allInfo.length > 49) {
    for (var q = 0; q < numberofpixels; q++) {
      $("#pixel" + String(q)).css("background-color", allInfo[q].colour);
      $("#pixel" + String(q)).css("border", 0.65*scaler + 'px solid white');
    }
    $("#grid-container").css("visibility", 'visible');
    $("#loading").css("display", 'none');
  }
}


$( document ).ready(function() {
  getImage();
  urlArray();
  scaling();
  setDivs();
  hoverDetection();

  $( "#square-container" ).mouseenter(function() {
    $("#cursor").css("display", 'block');
    $("body").css("cursor", 'none');
  });

  $( "#square-container" ).mouseleave(function() {
    $("#cursor").css("display", 'none');
    $("body").css("cursor", 'default');
  });

  $( "#reload" ).click(function() {
    allInfo.sort(function() { return 0.5 - Math.random() });
    setColourReload();
    $('.pixel').animateCss('bounceIn')
  });

});

$( window ).resize(function() {
  scaling();
});
