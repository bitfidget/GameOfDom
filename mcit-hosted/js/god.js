(function ($) {

  // go through all the divs and append a new div that we can select
  $.fn.GoDify = function (options) {

    // defaults
    var settings = $.extend({
      children : 3
    }, options);

    return this.each (function () {
      if (this.childNodes.length > settings.children){
        // make the div relative if not already set
        this.style.position = this.style.position || 'relative';
        // append the div with a new div of same size
        $(this).append('<div class="GoDified" />');
        var innerWidth = $(this).width() - 2;
        var innerHeight = $(this).height() - 2;
        $('.GoDified', this).width(innerWidth);
        $('.GoDified', this).height(innerHeight);
      };
    });
  };

  // set up the two selected divs and rerender them ready for battle
  $.fn.GoDRender = function () {

    return this.each (function () {
      var hash = [];
      $('.GoDified').remove();
      $('.GoDified').remove();
      $(this).find('div').each (function () {
        hash.push($(this));
        console.log(hash);
      })
      // $(this).('div').each (function () {
      //   console.log(this)
      //   console.log($(this))

      // })
      
      // debugger
      
      


    });
  };

} ($) );


var domGame = {
  // everything to set up the game and files
  initialize : function () {
    // inject css
    $('head').append('<link rel="stylesheet" type="text/css" href="' + projectHost + 'css/GoD.css">');

    // get all the hostPage divs
    $('div:visible').GoDify();

    // show welcome message
    popUp.messageFirstShow('welcome');

    // go to next step 
    this.divSelection();

  },

  // you can select and deselect until you have 2 divs to play with, then click the go button to start the game
  divSelection : function () {
    winBody.click(function (event) {
      var target = $( event.target );
      var currentButton = $GoDBox.find("button")
      if (target.hasClass('GoDCandidate') ) {
        target.removeClass('GoDCandidate');
        currentButton.fadeOut();
      } else if ($('.GoDCandidate').length < 2) {
        target.addClass('GoDCandidate')
      };
      if ($('.GoDCandidate').length == 2) {
        currentButton.fadeIn();
      }      
      currentButton.click(function (event) {
        console.log('GAME ON');
        domGame.redraw();
      });
    });
  },

  // redraw the candidate divs so they're ready to fight
  redraw : function () {
    $('.GoDCandidate').parent().GoDRender();
  },
  battle : function () {
    // 
  }
};


var $GoDBox

var popUp = {
  messageFetch : function (message) {
    // get the appropriate message frome ROR via ajax (this needs to come as full html string)
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: (projectHost + messagePath + message),
      success : function (ajaxData){
        $GoDBox.append(ajaxData.html);
        popUp.messageFadeIn();
      },
      error : function(){
        // ajax fetch failed
        console.log('message fetch fail')
      }
    });
  },
  messageFirstShow : function (message) {
    // create and append the div to show messages on screen
    winBody.append('<div id="GoDBox" class="' + message + ' GoDText" />');
    $GoDBox = $('#GoDBox');
    $GoDBox.css({'left': winAlertLeft + 'px'});
    // grab the content via ajax
    this.messageFetch(message);
  },
  messageFadeIn : function () {
    // need to test stylesheet has actualy loaded before running fadeIn()
    if ($GoDBox.is(':hidden')) {
      $GoDBox.fadeIn(2000);
    } else {
      setTimeout(this.messageFadeIn, 200);
    }
  },
  messageHide : function () {
    // remove the message from the screen
  },
  messageListen : function () {
    // could I place all the click handlers/listeners inside one function that chnages it's content according to the current message?
    // have a hash of defined actions per message
  }
};


var domDiv = {
  divSave : function () {
    // save the selected div and it's internals in memory so we can access later for the battle
    // break it down into array of all it's elements
  },
  divDraw : function () {
    // once all other divs have been removed from the screen, need to redraw the selected divs as towers, ready for battle 
  },
  divFight : function () {
    // when the fight starts, need to pop div elements into the frey until div length = 0
  }
};



var divs, elems, winWidth, winHeight, winAlertLeft, winBody, boxWelcome
var projectHost = 'http://modelcitizen.com.au/GOD/'
var messagePath = 'ajax-messages/'

$(document).ready(function(){
  winWidth = $(window).width();
  winHeight = $(window).height();
  winAlertLeft = ((winWidth - 300) / 2);
  winBody = $('body');
  boxWelcome = '<div id="boxWelcome" class="boxAlert GoDText" style="left: ' + winAlertLeft + 'px;"><h1>GAME<br>of<br>DOM</h1><h3>Welcome</h3><p>click two areas on the page, then watch them battle!</p></div>'

  // kick-off
  
  domGame.initialize();
});