domGame = {
  initialize : function () {
    // inject css
    // message - welcome
    // message - has settings to choose from?
    // message has start button inside that can only be clicked once you hae selected two divs
    // get all divs according to settings and .godify them (write jquery function)
  },
  battle : function () {
    // 
  }
};

popUp = {
  theMessages : function (message) {
    var messages = {
      welcome : {
        heading : 'Welcome',
        paragraph : 'click on two areas of the screen, then watch them battle!',
        button : 'go'
      }
    }
    return messages[message]
  },
  messageFetch : function () {
    // get the appropriate message frome ROR via ajax (this needs to come as full html string)
  },
  messageShow : function () {
    // display the message on the screen
  },
  messageHide : function () {
    // remove the message from the screen
  },
  messageListen : function () {
    // could I place all the click handlers/listeners inside one function that chnages it's content according to the current message?
    // have a hash of defined actions per message
  }
};

domDiv = {
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


model = {
  theGame : function () {
    // collection of the two divs chosen
  },
  theDivs : function () {
    // all the divs, then just the selected divs - hash of the chosen divs and their attributes
  },
  theElems : function () {
    // array of all the elements, for fighting with
  },
  // model.theMessages('welcome')
  
};

view = {
  gameIntro : function () {
    // show the intro message
  },
  gameSetUp: function () {
    // move the selected divs into place and redraw them
  },
  gamePlay : function () {
    // what happens during the battle
  },
  gameEnd : function () {
    // show the result and the message fror what to do next
  },
  showMessage : function (message) {
    winBody.append('<div id="' + message + '">'); 
  }
};

controller = {
  gameInitialize : function () {
    // load our stylesheet to the host page
    $('head').append('<link rel="stylesheet" type="text/css" href="http://modelcitizen.com.au/GOD/css/god.css">');
    
    controller.gameSelect();
    view.gameIntro();
    view.showMessage('welcome')

  },
  gameSelect : function () {
    // set up the divs according to the selection criteria
    divs = $('div:visible');
    // loop through all divs and save the ones we care about
    $.each(divs, function( i, div ) {
      if (this.childNodes.length > 3){
        // make the div relative if not already set
        this.style.position = this.style.position || 'relative';
        // append the div with a new div of same size
        var divOutline = '<div class="divOutline" style="width: ' + ($(this).width() - 2) + 'px; height: ' + ($(this).height() - 2) + 'px;"></div>'
        $(this).append(divOutline);
      };
    });
  },
  gameSetUp : function () {
    // allow theDivs to be selected (populate theGame, and theElements)
    // show gameSetUp view 
  },
  gamePlay : function () {
    // get theElements one by one until finished!
    // when done, show the gameEnd view
  },
  elemEvaluate : function () {
    // compare the two elements
  },
  messageSend : function () {
    // send messages to the server as required
  },
  messageFetch : function () {
    // get messages from the server as required
  },
  messageListen : function () {
    // create listeners according to the current message or place in the game
  }
};

var divs, elems, winWidth, winHeight, winAlertLeft, winBody, boxWelcome

$(document).ready(function(){
  winWidth = $(window).width();
  winHeight = $(window).height();
  winAlertLeft = ((winWidth - 200) / 2);
  winBody = $('body');
  boxWelcome = '<div id="boxWelcome" class="boxAlert godText" style="left: ' + winAlertLeft + 'px;"><h1>GAME<br>of<br>DOM</h1><h3>Welcome</h3><p>click two areas on the page, then watch them battle!</p></div>'

  // kick-off
  
  controller.gameInitialize();
});