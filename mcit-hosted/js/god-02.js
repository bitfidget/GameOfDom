
// will need to use all of these variables after doc.ready
var divs, elems, winWidth, winHeight, winAlertLeft, winPlay, boxWelcome

// alert('Elvis has entered the building ' + winWidth + ' x ' + winHeight);

// this shows the instruction/start box
showStart = function (){
  winPlay.append(boxWelcome);
  $('#welcome').fadeIn()
}

// WRITE THIS AS A JQUERY FUNCTION 
// $.fn.addborders = function(n)
// initally go through and find all divs that we want to play with
getDivs = function (){
  // get ALL divs and set up a new hash
  divs = $('div:visible');
  elems = {};
  // loop through all divs and save the ones we care about
  $.each(divs, function( i, div ) {
    if (this.childNodes.length > 3){

debugger

      // not sure if I need this yet or not
      // elems[div] = {
      //   'width': $(div).width(),
      //   'height': $(div).height()
      // };
      // make the div relative if not already set
      this.style.position = this.style.position || 'relative';
      // append the div with a new div of same size
      var divOutline = '<div style="position: absolute; left: 0; top: 0; border: dotted 1px #F60; width: ' + ($(this).width() - 2) + 'px; height: ' + ($(this).height() - 2) + 'px;"></div>'
      $(this).append(divOutline);
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
  winPlay = $('body')
  boxWelcome = '<div id="welcome" style="z-index: 10000; display: none; position: absolute; left: ' + winAlertLeft + 'px; top: 50px; background: #FFF; border-radius: 5px; width: 200px; padding: 1em;"><h1>Welcome to Game Of Doms</h1><p>Please click two areas on the page to fight!</p></div>'

  // kick-off
  getDivs();
  showStart();
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