/*
 * getStyleObject Plugin for jQuery JavaScript Library
 * From: http://upshots.org/?p=112
 *
 * Copyright: Unknown, see source link
 * Plugin version by Dakota Schneider (http://hackthetruth.org)
 */

(function($){
  $.fn.getStyleObject = function(){
    var dom = this.get(0);
    var style, prop;
    var returns = {};
    if(window.getComputedStyle){
      var camelize = function(a,b){
        return b.toUpperCase();
      };
      style = window.getComputedStyle(dom, null);
      for(var i=0;i<style.length;i++){
        prop = style[i];
        var camel = prop.replace(/\-([a-z])/g, camelize);
        var val = style.getPropertyValue(prop);
        returns[camel] = val;
      }
      return returns;
    }
    if(dom.currentStyle){
      style = dom.currentStyle;
      for(prop in style){
          returns[prop] = style[prop];
      }
      return returns;
    }
    return this.css();
  };
  $.fn.cloneWithCSS = function() {
    styles = {};

    $this = $(this);
    $clone = $this.clone();
    $clone.css( $this.getStyleObject() );

    children = $this.children().toArray();
    var i = 0;
    while( children.length ) {
      $child = $( children.pop() );
      styles[i++] = $child.getStyleObject();
      $child.children().each(function(i, el) {
          children.push(el);
      });
    }

    var cloneChildren = $clone.children().toArray();
    var i = 0;
    while( cloneChildren.length ) {
      $child = $( cloneChildren.pop() );
      $child.css( styles[i++] );
      $child.children().each(function(i, el) {
          cloneChildren.push(el);
      });
    }

    return $clone;
  };

//------------------------------------------------------------------------//
// create a canvas element that duplocates the element selected
//------------------------------------------------------------------------//
 
  $.fn.dupliCanvas = function () {

    $clone = this.cloneWithCSS();
    $clone.css({
      'position' : 'absolute', 
      'left': 0, 
      'top' : 0
    });

    // get selected element x,y pos and width,height
    var winScrollLeft = $(window).scrollLeft();   
    var winScrollTop = $(window).scrollTop();
    var canvasWidth = this.outerWidth();
    var canvasHeight = this.outerHeight();
    var canvasX = this.offset().left - winScrollLeft;
    var canvasY = this.offset().top - winScrollTop;

    // create duplicate element - named diffently
    var traceElement, $elem;

    if (!$('.divFighter').length) {
      traceElement = '<div id="TEOne" class="divFighter" />';
      winBody.append(traceElement);
      $elem = $('#TEOne');
    } else {
      traceElement = '<div id="TETwo" class="divFighter" />';
      winBody.append(traceElement);
      $elem = $('#TETwo');
    };
    
    // make dupliate match size/pos 
    $elem.css({
      'width' : canvasWidth,
      'height' : canvasHeight,
      'left' : canvasX,
      'top' : canvasY
    });

    //now make the new element look like the original element
    $elem.append($clone); 
  };

  $.fn.findBattleElement = function () {

    var current = this

    var findLast = function () {
      if ( current.children().length > 0 ) {
        if ( current.children().last().is('br, p, span, td, ul, ol, li, tr, table, a, img, video, div, section, article, footer, header') ) {
          current = current.children().last();
          findLast();
        } else {
          current.children().last().remove();
          findLast();
        }
      } else {
        return current
      }
    }

    findLast()

  };

  $.fn.setPower = function () {
    if (this.is('br, p, span, td') ) {
        return 50
      } else if (this.is('ul, ol, li, tr, table') ) {
        return 75
      } else if (this.is('a') ) {
        return 150
      } else if (this.is('img, video') ) {
        return 200
      } else if (this.is('div, section, article') ) {
        return 120
      } else if (this.is('footer, header') ) {
        return 150
      }
  };


} ( jQuery ) );

//------------------------------------------------------------------------//
// variables that will be required all over the place
//------------------------------------------------------------------------//
var projectHost = 'http://modelcitizen.com.au/game-of-dom/';
var messagePath = 'ajax-messages/';
var winWidth, winHeight, winAlertLeft, winBody, currentMsg, reload;
var $GDMessageContainer = 0;
var sanityTest = '<div id="sanityTest"/>';

//------------------------------------------------------------------------//
// main flow of the script all comes from domGame
// INITIALIZE
// 1. get/set DOM dependent variables  
// 2. add stylesheet
// 3. create the message box to use, fetch and append message HTML via ajax
// 3. 
//------------------------------------------------------------------------//


var domGame = {
  initialize : function () {
    
    winWidth = $(window).width();
    winHeight = $(window).height();
    winAlertLeft = ((winWidth - 300) / 2);
    winBody = $('body');

    winBody.append(sanityTest);
    $('head').append('<link rel="stylesheet" type="text/css" href="' + projectHost + 'css/game-of-dom.css">');

    this.loadCheck();

    console.log('game initialized')

  },

  loadCheck : function () {
    // check if stylesheet loaded before running anything else
    if ($('#sanityTest').is(':hidden')) {
      console.log('stylesheet loaded')
      domGame.welcome();
      clearInterval(reload);
    } else {
      reload = setTimeout(function(){
        console.log('stylesheet not loaded yet - retry');
        domGame.loadCheck();
      }, 500);
    };
  },

  welcome : function () {
    currentMsg = 'welcome';
    popUp.initialize();
    popUp.messageFetch(currentMsg);
    popCrowd.initialize();
    this.listen();
    console.log('game welcome');
  },

  listen : function () {
    // register a click on any elem
    $(document).click( function (event) {
      event.preventDefault();

      // stop listeing if 2 elems already selected
      if (!$('#TETwo').length) {
        
        console.log('clicked on ', event.target);
        $(event.target).dupliCanvas();
        $(event.target).addClass('domCloned');
        // stage game if this is second click
        if ($('#TETwo').length){
          setTimeout(function (){
            domGame.stage()
          }, 1000)
        };
      };
      
    });
    
    console.log('game awaits clicks');

  },

  stage : function () {

    currentMsg = 'fight';
    popCrowd.crowdShow();
    popUp.messageFetch(currentMsg);

    var $TEOne = $('#TEOne');
    var $TETwo = $('#TETwo');

    fighters[1] = $TEOne
    fighters[2] = $TETwo

    // time for confusion - add both elements to a hash so we can start iterating through on each 'turn'
    $.each(fighters, function(i, value) {
      var self = fighters[i]
      // position at 1/4 and 3/4 width of the page
      var whichSide;
      if (i === '1') {
        whichSide = (winWidth/4);
      } else {
        whichSide = ( (winWidth/4) * 3);
      };
      // set their rest positions
      self.restPosition = {
        left : ( whichSide - (self.outerWidth()/2) ) + 'px',
        top : ( (winWidth/4) - (self.outerWidth()/2) ) + 'px'
      };
      // get last child element for battle
      //self.battleElement = self.findBattleElement();
      self.battleElement = self
      // calculate strenght of battleelement
      self.battlePower = self.battleElement.setPower();
      // self battleHealth
      self.battleHealth = 100;
      // move to positions
      self.css(self.restPosition);
      self.addClass('tossing');
    });
    
    console.log('game staged');

    setTimeout(function () {
      popUp.messageCount(3);
    }, 5000);

  },

  turn : function () {
    
  }
};

var fighters = {}

//------------------------------------------------------------------------//
// all game messages added to $GDMessageContainer which is appended to body
// createContainer - creates the div but it is display:none at start
//------------------------------------------------------------------------//
var $counter, 
    $scoreOne,
    $scoreTwo

var popUp = {
  
  initialize : function () {
    winBody.append('<div id="GDMessageContainer" class="GoDText" />');
    $GDMessageContainer = $('#GDMessageContainer');
    $GDMessageContainer.css({'left': winAlertLeft + 'px'});
  },
  
  messageFetch : function (currentMsg) {
    var url = (projectHost + messagePath + currentMsg + '/json.txt');
    $.ajax({
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      url: url,
      success : function (ajaxData){
        popUp.messageShow(ajaxData.html)
      },
      error : function(){
        console.log('ajax popUp.messageFetch(' + currentMsg + ') error');
        popUp.messageShow('ajax error');
      }
    });
  },

  messageShow : function (fetchedMessage) {  
    $GDMessageContainer.empty();
    $GDMessageContainer.append(fetchedMessage);
    $GDMessageContainer.slideDown(2000);
  },

  messageCount : function (countFrom) {

    $GDMessageContainer.empty();
    $GDMessageContainer.append('<h1 id="counter" />');
    $GDMessageContainer.append('<h1 id="scoreOne" />');
    $GDMessageContainer.append('<h1 id="scoreTwo" />');
    $counter = $('#counter');
    $scoreOne = $('#scoreOne');
    $scoreTwo = $('#scoreTwo');
    
    console.log('ready for countdown')

    this.messageCountDown(countFrom);

  },

  messageCountDown : function (countFrom) {

    console.log(countFrom)
    
    if (countFrom > 0) {
      $counter.html(countFrom);
      countFrom -= 1;
      setTimeout(function () {
        popUp.messageCountDown(countFrom)
      }, 1000);
      console.log('counting down' + countFrom)
    } else {
      $counter.html('FIGHT');
      domGame.turn(); 
      console.log('fight started')
    };
  }
};

var popCrowd = {
  initialize : function () {
    winBody.append('<div id="domCrowd" />');
    $domCrowd = $('#domCrowd');
    $domCrowd.css({
      'width' : winWidth + 'px',
      'height' : winHeight + 'px',
      'display' : 'none'
    });
  },
  crowdShow : function () {
    $domCrowd.fadeIn(1000);
  }
};



//------------------------------------------------------------------------//
// start the party
//------------------------------------------------------------------------//
$(document).ready(function(){
  domGame.initialize();
});
