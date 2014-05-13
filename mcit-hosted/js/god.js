var $victim = document;
var cssId = 'godCss';
if (!$victim.getElementById(cssId)){
    var head  = $victim.getElementsByTagName('head')[0];
    var link  = $victim.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://modelcitizen.com.au/GOD/css/god.css';
    link.media = 'all';
    head.appendChild(link);
};

// will need to use all of these variables after doc.ready
var divs, elems, winWidth, winHeight, winAlertLeft, winPlay, boxWelcome

alert('Elvis has entered the building ' + winWidth + ' x ' + winHeight);

// generic function to load content into an alert window and then show it (cheats way of queueing functions!)
var loadAlert = function (content, id) {
  winPlay.append(content); 
  var id = id
  setTimeout(function () {
    fadeInAlert(id);
  }, 1000)
};
var fadeInAlert = function (id) {
  $('#' + id).fadeIn(3000);
  divChoice = $('.divOutline');
  $.each(divChoice, function( i, div ) {
    $(this).click(function (event) {
      event.preventDefault();
      $(this).addClass('divSelected');
      console.log(this);
    });
  });
};

// WRITE THIS AS A JQUERY FUNCTION 
// $.fn.addborders = function(n)

// initally go through and find all divs that we want to play with
var getDivs = function () {
  // get ALL divs and set up a new hash
  divs = $('div:visible');
  elems = {};
  // loop through all divs and save the ones we care about
  $.each(divs, function( i, div ) {
    if (this.childNodes.length > 3){
      // make the div relative if not already set
      this.style.position = this.style.position || 'relative';
      // append the div with a new div of same size
      var divOutline = '<div class="divOutline" style="width: ' + ($(this).width() - 2) + 'px; height: ' + ($(this).height() - 2) + 'px;"></div>'
      $(this).append(divOutline);
      //this.on('')
    };
  }); 
};

// initally get all the current divs on page and do stuff to them
showDivs = function (){


};

// wont need this once live as all elements will alreedy exist (doc.ready already)
$(document).ready(function(){
  winWidth = $(window).width();
  winHeight = $(window).height();
  winAlertLeft = ((winWidth - 200) / 2);
  winPlay = $('body');
  boxWelcome = '<div id="boxWelcome" class="boxAlert godText" style="left: ' + winAlertLeft + 'px;"><h1>GAME<br>of<br>DOM</h1><h3>Welcome</h3><p>click two areas on the page, then watch them battle!</p></div>'

  // kick-off
  
  loadAlert(boxWelcome, 'boxWelcome');
  getDivs();
});




// // iterate throught all divs
// for(var i = 0; i < divs.length; i++) {

//   // we're going to do a lot with each div so let's make a variable
//   var div = divs[i];

//   // we only want to deal with visible divs
//   var vis = div.style.visibility;

//   // only apply game if div has a couple of children AND is visible
//   if ( (div.childNodes.length > 1) && (vis != 'hidden') ){

//     // get the x and y pos
//     //var position = getPosition(div);

//     var xPosition = 0;
//     var yPosition = 0;
  
//     xPosition += (div.offsetLeft - div.scrollLeft + div.clientLeft);
//     yPosition += (div.offsetTop - div.scrollTop + div.clientTop);



//     console.log(xPosition)

//     // and fuck with it
//     div.setAttribute('style', 'background: rgba(0,0,0,0.2); position: absolute; left' + xPosition + 'px; top' + (yPosition - 100) + 'px;');

//     // add it to the array of divs that we're going to deal with
//     elems.push(div);

//   } else {
//     div.setAttribute('style', 'background: rgba(255,255,255,0.2)')
//   }
// };

// // select ALL visible divs
// var allVisDiv = $("div:visible")

// // select all visible divs and add a border and background colour
// allVisDiv.css({'border' : 'solid 1px #000', 'transition' : 'all 1s ease'});
// allVisDiv.css({ 'border-left' : 'solid 10px #333', 'border-bottom' : 'solid 10px #333' });