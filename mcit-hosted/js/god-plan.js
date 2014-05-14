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
  theMessages : function () {
    // hash of all the possible screen messages to show
  }
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
  }
};

controller = {
  gameInitialize : function () {
    // get theDivs
    // show gameIntro
    // setup listeners for theMessage
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
  messageFetch : function () {
    // get messages from the server as required
  },
  messageListen : function () {
    // create listeners according to the current message or place in the game
  }


}



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
  messageKey : function () {
    // a hash of all the possible messages and their specifics (that can't be gotten from ROR) such as buttons or inputs to listen for
   }
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













