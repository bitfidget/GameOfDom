
(function($){
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
  // I borrowed the first function here, but the rest of this code belongs to Kriss Heimanis. Not that anyone esle would want to claim it!
  // getStyleObject Plugin for jQuery JavaScript Library - From: http://upshots.org/?p=112 - Copyright: Unknown, see source link - Plugin version by Dakota Schneider (http://hackthetruth.org)
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
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
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
  // I borrowed the first function here, http://stackoverflow.com/a/21278583/3646707
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
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
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
  // use the clone.css function above on my selected items, also duplicating them in place of the original item
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
  $.fn.dupliCanvas = function () {

    var $clone = this.cloneWithCSS();
    var traceElement, $elem;

    // get selected element x,y pos and width,height
    var winScrollLeft = $(window).scrollLeft();   
    var winScrollTop = $(window).scrollTop();
    var canvasWidth = this.outerWidth();
    var canvasHeight = this.outerHeight();
    var canvasX = this.offset().left - winScrollLeft;
    var canvasY = this.offset().top - winScrollTop;

    // create duplicate element - named diffently
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
    $clone.css({
      'position' : 'absolute', 
      'left': 0, 
      'top' : 0
    });
    $elem.append($clone); 
  };

  $.fn.findBattleElement = function () {
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
  // this just loops through an element and finds it's deepest/lowest subchild - I spent a day on this cos I forgot to add 'return current' and couldnt work it out.
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
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
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
  // just assigns a power value according to the element selected
  //--------------------------------------------------------------------------------------------------------------------------------------------------//
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

//--------------------------------------------------------------------------------------------------------------------------------------------------//
// domGame runs the whole thing - most calls to other functions all run from here, most logic is in here too.
// initialize: sets all game variables
//--------------------------------------------------------------------------------------------------------------------------------------------------//

var domGame = {
  initialize : function () {
    //-----------------------------------------------------
    // load all game variables and the style sheet
    //-----------------------------------------------------
    winWidth = $(window).width();
    winHeight = $(window).height();
    winAlertLeft = ((winWidth - 300) / 2);
    winBody = $('body');
    winBody.append(sanityTest);
    $('head').append('<link rel="stylesheet" type="text/css" href="' + projectHost + 'css/game-of-dom.css">');
    this.loadCheck();
    //------------------------------------------------------
    // game ready to roll --> next step is domGame.loadCheck
    //-----------------------------------------------------
    console.log('game initialized')
  },

  loadCheck : function () {
    //-----------------------------------------------------
    // check the stylesheet is loaded via state of #sanitytest
    //-----------------------------------------------------
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
    //-----------------------------------------------------
    // when check returns true --> domGame.welcome
    //-----------------------------------------------------
  },

  welcome : function () {
    //-----------------------------------------------------
    // initialize all the game pieces 
    //-----------------------------------------------------
    currentMsg = 'welcome';
    popUp.initialize();
    popUp.messageFetch(currentMsg);
    popCrowd.initialize();
    this.listen();
    //-----------------------------------------------------
    // setup the popUp window --> popUp.initialize
    // get the welcome message --> popUp.messageFetch
    // setup the crowd window --> popCrowd.inititalize
    // setup the click listeners --> domGame.listen
    //-----------------------------------------------------
    console.log('game welcome');
  },

  listen : function () {
    //-----------------------------------------------------
    // listen for clicks on any window element
    //-----------------------------------------------------
    $(document).click( function (event) {
      event.preventDefault();
      // stop listening if 2 elems already selected
      if (!$('#TETwo').length) {
        console.log('clicked on ', event.target);
        $(event.target).dupliCanvas();
        $(event.target).addClass('domCloned');
        // stage game if this is second click
        if ($('#TETwo').length){
          setTimeout(function (){
            domGame.stage()
          }, 500)
        };
      };
    });
    //-----------------------------------------------------
    // once two elements have been selected and duplicated --> domGame.stage
    //-----------------------------------------------------
    console.log('game awaits clicks');
  },

  stage : function () {
    //-----------------------------------------------------
    // ohhhkay... stage the fight
    // get the crowd started --> popCrowd.crowdShow
    // get the scoreboard --> popUp.messageFetch(fight)
    // get the two selected divs and add them to the hash
    // set up all their extra variables
    //-----------------------------------------------------
    currentMsg = 'fight';
    popCrowd.crowdShow();
    popUp.messageFetch(currentMsg);
    // get the actual objects
    var $TEOne = $('#TEOne');
    var $TETwo = $('#TETwo');
    // add them to the hash
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
    setTimeout(function () {
      popUp.messageCount(3);
      $nameOne = $('#nameOne');
      $nameTwo = $('#nameTwo');
      $nameOne.html(fighters[1].gameName);
      $nameTwo.html(fighters[2].gameName);
    }, 2000);
    //-----------------------------------------------------
    // add the names to the scoreboard
    // finally, kick off the countdown --> popUp.messageCount
    //-----------------------------------------------------
    console.log('game staged');
  },

  turn : function () {
    //-----------------------------------------------------
    // make both fighters advance on each other (advance)
    // decide the winner and set all attribs accordingly (assess)
    // update the score each time --> popUp.updateScore()
    // go back to start positions --> domGame.restage()
    // redo until someone does --> domGame.turn();
    //-----------------------------------------------------
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
          domGame.save(winner, loser);
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
    // do it again
    setTimeout(function () {
      advance()
    }, 500);
    //-----------------------------------------------------
    // all bits that killed off --> domGame.flyOff
    // once you have a winner --> domGame.end(winner, loser)
    //-----------------------------------------------------
  },

  flyOff : function (deadBits) {
    //-----------------------------------------------------
    // make the dead bits fly away 
    //-----------------------------------------------------
    winBody.append(deadBits)
    console.log(deadBits)
  },

  restage : function () {
    //-----------------------------------------------------
    // just moves the fighters back to their corners
    //-----------------------------------------------------
    $.each(fighters, function(i, value) {
      var self = fighters[i];
      self.css(self.restPosition);
    });
  },

  end : function (winner, loser) {
    //-----------------------------------------------------
    // game OVER! make the dead dude look dead
    // make the winner look happy!
    //-----------------------------------------------------
    loser.battleElement.append('<h1>DEAD</h1>');
    $('.hatch').removeClass('hatch');
    $('.tossing').removeClass('tossing');
    setInterval(function () {
      winner.toggleClass('bounce');
      winner.empty().append(winner.shadow);
    }, 1000);
  },

  save : function (winner, loser) {
    //-----------------------------------------------------
    // send winner
    // make the winner look happy!
    //-----------------------------------------------------
  }

};


//--------------------------------------------------------------------------------------------------------------------------------------------------//
// all game messages added to $GDMessageContainer which is appended to body
// createContainer - creates the div but it is display:none at start
//--------------------------------------------------------------------------------------------------------------------------------------------------//
var $counter, $scoreOne, $scoreTwo, $powerOne, $powerTwo, $healthOne, $healthTwo, $hitOne, $hitTwo, $nameOne, $nameTwo
var fighters = {};

var popUp = {
  
  initialize : function () {
    //-----------------------------------------------------
    // build the message container on window
    //-----------------------------------------------------
    winBody.append('<div id="GDMessageContainer" class="GoDText" />');
    $GDMessageContainer = $('#GDMessageContainer');
    $GDMessageContainer.css({'left': winAlertLeft + 'px'});
  },
  
  messageFetch : function (currentMsg) {
    //-----------------------------------------------------
    // fetch json message to display in the popup
    //-----------------------------------------------------
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
    //-----------------------------------------------------
    // once message fetched --> popUp.messageShow
    //-----------------------------------------------------
  },

  messageShow : function (fetchedMessage) {
    //-----------------------------------------------------
    // empty the message window and show the new message
    //-----------------------------------------------------
    $GDMessageContainer.empty();
    $GDMessageContainer.append(fetchedMessage);
    $GDMessageContainer.slideDown(2000);
  },

  messageCount : function (countFrom) {
    //-----------------------------------------------------
    // --> pass down the counter value
    // setup all the dom objects for info on scoreboard
    //-----------------------------------------------------
    $counter = $('#fight');
    $scoreOne = $('#scoreOne');
    $scoreTwo = $('#scoreTwo');
    $hitOne = $('#hitOne');
    $hitTwo = $('#hitTwo');
    $healthOne = $('#healthOne');
    $healthTwo = $('#healthTwo');
    $powerOne = $('#powerOne');
    $powerTwo = $('#powerTwo');

    this.messageCountDown(countFrom);
    //-----------------------------------------------------
    // start the countdown message --> popUp.messageCountDown
    //-----------------------------------------------------
    console.log('ready for countdown')
  },

  messageCountDown : function (countFrom) {
    //-----------------------------------------------------
    // countdown to start the fight
    // get the crowd cheering! --> popCrowd.crowdBase
    //-----------------------------------------------------    
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
      popCrowd.crowdBase();
    };
  },

  updateScore : function () {
    //-----------------------------------------------------
    // update the score... just like it says on the tin 
    //-----------------------------------------------------
    $scoreOne.html(fighters[1].battleScore)
    $scoreTwo.html(fighters[2].battleScore)
    $hitOne.html(fighters[1].thisHit)
    $hitTwo.html(fighters[2].thisHit)
    $healthOne.html(fighters[1].battleHealth)
    $healthTwo.html(fighters[2].battleHealth)
    $powerOne.html(fighters[1].battlePower)
    $powerTwo.html(fighters[2].battlePower)
  }
};


//--------------------------------------------------------------------------------------------------------------------------------------------------//
// the animated crowd figures
//--------------------------------------------------------------------------------------------------------------------------------------------------//
var popCrowd = {

  initialize : function () {
    //-----------------------------------------------------
    // just like the popup window, start by creating elem
    //-----------------------------------------------------
    winBody.append('<div id="domCrowd" />');
    $domCrowd = $('#domCrowd');
    $domCrowd.css({
      'width' : winWidth + 'px',
      'height' : winHeight + 'px',
      'display' : 'none'
    });
  },
  crowdShow : function () {
    //-----------------------------------------------------
    // bring it into view
    //-----------------------------------------------------
    $domCrowd.fadeIn(1000);
  },
  crowdBase : function () {
    //-----------------------------------------------------
    // show the crowd having a good time
    //-----------------------------------------------------
    $domCrowd.addClass('crowdBase')
    setInterval(function () {
      $domCrowd.toggleClass('crowdBaseTwo')
    }, 500)
  },
  crowdCheer : function (time) {
    //-----------------------------------------------------
    // crowd GO NUTS
    //-----------------------------------------------------
    console.log('cheer')
    $domCrowd.addClass('crowdCheer')
    agitation = setInterval(function () {
      $domCrowd.toggleClass('crowdCheerTwo')
    }, 400);
    setTimeout(function () {
      console.log(time);
      clearInterval(agitation);
      $domCrowd.removeClass('crowdCheer');
      $domCrowd.removeClass('crowdCheerTwo');
    }, parseInt(time) );
  }
};


//------------------------------------------------------------------------//
// Start the party. 
//------------------------------------------------------------------------//
$(document).ready(function(){
  domGame.initialize();
});