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

    var $clone = this.cloneWithCSS();
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
    console.log('start with: '  + current)

    var findLast = function () {
      if ( current.children().length > 0 ) {
        if ( current.children().last().is('br, p, span, td, ul, ol, li, tr, table, a, img, video, div, section, article, footer, header') ) {
          current = current.children().last();
          console.log('if of type x, check again: '  + current)
          findLast();
        } else {
          current.children().last().remove();
          console.log('not of type, get next of: ' + current)
          findLast();
        }
      } else {
        console.log('end of function, return - ' + current)
        return current
      }
      return current
    }

    return findLast()

  };

  $.fn.setPower = function () {
    if (this.is('br, p, span, td') ) {
        return 20
      } else if (this.is('ul, ol, li, tr, table') ) {
        return 25
      } else if (this.is('a') ) {
        return 45
      } else if (this.is('img, video') ) {
        return 50
      } else if (this.is('div, section, article') ) {
        return 35
      } else if (this.is('footer, header') ) {
        return 40
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
      self.shadow = self.children().first().clone()
      // position at 1/4 and 3/4 width of the page
      var whichSide;
      if (i === '1') {
        whichSide = (winWidth/4);
      } else {
        whichSide = ( (winWidth/4) * 3);
      };
      // set their rest positions
      self.offSetX = (self.outerWidth()/2)
      self.offSetY = (self.outerWidth()/2)
      self.restPosition = {
        left : ( whichSide - self.offSetX ) + 'px',
        top : ( (winWidth/4) - self.offSetY ) + 'px'
      };
      // get last child element for battle
      self.battleElement = self.findBattleElement();
      // get the name of the element
      self.gameName = self.children().first().get(0).tagName
      // calculate strenght of battleelement
      self.battlePower = self.battleElement.setPower();
      // self battleHealth
      self.battleHealth = 100;
      // reset the scores
      self.battleScore = 0;
      // move to positions
      self.css(self.restPosition);
      self.addClass('tossing');
    });

    // append the names to the score board

    
    
    console.log('game staged');

    setTimeout(function () {
      popUp.messageCount(3);
      $nameOne = $('#nameOne');
      $nameTwo = $('#nameTwo');
      $nameOne.html(fighters[1].gameName);
      $nameTwo.html(fighters[2].gameName);
    }, 2000);

  },

  turn : function () {

    var winner, loser;

    // make fighters advance on each other every .5 sec
    var advance = function () {
      $('.hatch').removeClass('hatch');
      popCrowd.crowdCheer(600)
      // the actual move
      setTimeout(function () {
        assess()
      }, 600);
      domGame.restage();
    };

    // assess the winner and loser
    var assess = function () {
      $.each(fighters, function(i, value) {
        var self = fighters[i];
        // movement functions
        self.css({ 'left' : ( (winWidth/2) - self.offSetX) + 'px' });
        self.addClass('hatch');
        // scoring functions
        self.thisHit = this.battlePower * Math.floor( (Math.random() * 3) + 1 );
      });
      // win/lose logix
      if (fighters[1].thisHit > fighters[2].thisHit){
        winner = fighters[1];
        loser = fighters[2]
      } else {
        winner = fighters[2];
        loser = fighters[1]
      }
      // adjust fighters
      winner.battleScore += loser.thisHit;
      loser.battleHealth -= winner.thisHit;
      if (loser.battleHealth <= 0) {
        if ( (loser.battleElement.get(0).id == 'TEOne' ) || (loser.battleElement.get(0).id == 'TETwo' ) ) {
          // fight over
          domGame.restage()
          domGame.end(winner, loser);
          return
        };
        var deadBits = loser.battleElement.clone()
        domGame.flyOff(deadBits);
        loser.battleElement.remove();
        loser.battleElement = loser.findBattleElement();
        loser.battlePower = loser.battleElement.setPower();
        loser.battleHealth = 100;
        winner.battleScore += 100;
        loser.battleScore -= loser.battlePower;
        // if no next element, DIE
      };
      // update scores and info
      popUp.updateScore()
      domGame.turn();
    }

    setTimeout(function () {
      advance()
    }, 500);

    // add crowd styles

    // add scores/life bar underneath

    // addsounds
    
  },

  flyOff : function (deadBits) {
    winBody.append(deadBits)
    console.log(deadBits)
  },

  restage : function () {
    $.each(fighters, function(i, value) {
      var self = fighters[i];
      self.css(self.restPosition);
    });
    console.log('restaged')
  },

  end : function (winner, loser) {
    loser.battleElement.append('<h1>DEAD</h1>');
    $('.hatch').removeClass('hatch');
    $('.tossing').removeClass('tossing');
    setInterval(function () {
      winner.toggleClass('bounce');
      winner.empty().append(winner.shadow);
    }, 1000);
  }
};


var fighters = {}

//------------------------------------------------------------------------//
// all game messages added to $GDMessageContainer which is appended to body
// createContainer - creates the div but it is display:none at start
//------------------------------------------------------------------------//
var $counter, 
    $scoreOne,
    $scoreTwo,
    $powerOne,
    $powerTwo,
    $healthOne,
    $healthTwo,
    $hitOne,
    $hitTwo,
    $nameOne,
    $nameTwo


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
        popUp.messageShow(ajaxData.html);
        console.log('ajax fetch messge SUCCESS ' + currentMsg);
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

    // $GDMessageContainer.empty();
    // $GDMessageContainer.append('<h1 id="counter" />');
    // $GDMessageContainer.append('<h1 id="scoreOne">0</div>');
    // $GDMessageContainer.append('<h1 id="scoreTwo">0</div>');
    // $GDMessageContainer.append('<h2 id="hitOne">0</div>');
    // $GDMessageContainer.append('<h2 id="hitTwo">0</div>');
    // $GDMessageContainer.append('<h2 id="healthOne">0</div>');
    // $GDMessageContainer.append('<h2 id="healthTwo">0</div>');
    // $GDMessageContainer.append('<h2 id="powerOne">0</div>');
    // $GDMessageContainer.append('<h2 id="powerTwo">0</div>');
    $counter = $('#fight');
    $scoreOne = $('#scoreOne');
    $scoreTwo = $('#scoreTwo');
    $hitOne = $('#hitOne');
    $hitTwo = $('#hitTwo');
    $healthOne = $('#healthOne');
    $healthTwo = $('#healthTwo');
    $powerOne = $('#powerOne');
    $powerTwo = $('#powerTwo');

    
    console.log('ready for countdown')

    this.messageCountDown(countFrom);

  },

  messageCountDown : function (countFrom) {

    console.log(countFrom)

    popCrowd.crowdBase();
    
    if (countFrom > 0) {
      $counter.html(countFrom);
      countFrom -= 1;
      setTimeout(function () {
        popUp.messageCountDown(countFrom)
      }, 500);
      console.log('counting down' + countFrom)
    } else {
      $counter.html('FIGHT!');
      domGame.turn(); 
      console.log('fight started')
    };
  },

  updateScore : function () {
    $scoreOne.html(fighters[1].battleScore)
    $scoreTwo.html(fighters[2].battleScore)
    $hitOne.html(fighters[1].thisHit)
    $hitTwo.html(fighters[2].thisHit)
    $healthOne.html(fighters[2].battleHealth)
    $healthTwo.html(fighters[2].battleHealth)
    $powerOne.html(fighters[2].battlePower)
    $powerTwo.html(fighters[2].battlePower)
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
  },
  crowdBase : function () {
    $domCrowd.addClass('crowdBase')
    setInterval(function () {
      $domCrowd.toggleClass('crowdBaseTwo')
    }, 500)
  },
  crowdCheer : function (time) {
    console.log('cheer')
    $domCrowd.addClass('crowdCheer')
    
    agitation = window.setInterval(function () {
      $domCrowd.toggleClass('crowdCheerTwo')
    }, 400);
    setTimeout(function () {
      console.log(time)
      window.clearInterval(agitation)
      $domCrowd.removeClass('crowdCheer')
      $domCrowd.removeClass('crowdCheerTwo')
    }, time)
  }
};



//------------------------------------------------------------------------//
// start the party
//------------------------------------------------------------------------//
$(document).ready(function(){
  domGame.initialize();
});
