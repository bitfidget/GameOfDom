// start with basics


// try doing this one at a setTimeout(function() {}, var divs = document.getElementsByTagName("div");
// var allVisDiv = $("div:visible")
// for(var i = 0; i < allVisDiv.length; i++){
//   allVisDiv[i].css({ 'transition' : 'all .5s false' });
//   allVisDiv[i].css({ 'border-left' : 'solid 5px #333', 'border-bottom' : 'solid 5px #333' });
// };

//allVisDiv[i].css({ 'transition' : 'all .5s false' });
//   allVisDiv[i].css({ 'border-left' : 'solid 5px #333', 'border-bottom' : 'solid 5px #333' });

function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  
  while(element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }
  console.log(xPosition, yPosition)
  return { x: xPosition, y: yPosition };
}



// different way - deal with each div on it's own
var divs = document.getElementsByTagName("DIV");
var elems = [];
// will need to use all of these variables after doc.ready
var winWidth, winHeight, winAlertLeft, winPlay, boxWelcome

// alert('Elvis has entered the building ' + winWidth + ' x ' + winHeight);


showStart = function (){
  winPlay.append(boxWelcome);
  $('#welcome').fadeIn()
}

// wont need this once live as all elements will alreedy exist (doc.ready already)
$(document).ready(function(){
  winWidth = $(window).width();
  winHeight = $(window).height();
  winAlertLeft = ((winWidth - 200) / 2);
  winPlay = $('body')
  boxWelcome = '<div id="welcome" style="display: none; position: absolute; left: ' + winAlertLeft + 'px; top: 50px; background: #FFF; border-radius: 5px; width: 200px; padding: 1em;"><h1>Welcome to Game Of Doms</h1><p>Please click two areas on the page to fight!</p></div>'

  // kick-off
  showStart();
})




// iterate throught all divs
for(var i = 0; i < divs.length; i++) {

  // we're going to do a lot with each div so let's make a variable
  var div = divs[i];

  // we only want to deal with visible divs
  var vis = div.style.visibility;

  // only apply game if div has a couple of children AND is visible
  if ( (div.childNodes.length > 1) && (vis != 'hidden') ){

    // get the x and y pos
    //var position = getPosition(div);

    var xPosition = 0;
    var yPosition = 0;
  
    xPosition += (div.offsetLeft - div.scrollLeft + div.clientLeft);
    yPosition += (div.offsetTop - div.scrollTop + div.clientTop);



    console.log(xPosition)

    // and fuck with it
    div.setAttribute('style', 'background: rgba(0,0,0,0.2); position: absolute; left' + xPosition + 'px; top' + (yPosition - 100) + 'px;');

    // add it to the array of divs that we're going to deal with
    elems.push(div);

  } else {
    div.setAttribute('style', 'background: rgba(255,255,255,0.2)')
  }
};

// select ALL visible divs
var allVisDiv = $("div:visible")

// select all visible divs and add a border and background colour
allVisDiv.css({'border' : 'solid 1px #000', 'transition' : 'all 1s ease'});
allVisDiv.css({ 'border-left' : 'solid 10px #333', 'border-bottom' : 'solid 10px #333' });