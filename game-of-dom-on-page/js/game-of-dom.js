//------------------------------------------------------------------------//
// variables that will be required all over the place
//------------------------------------------------------------------------//
var projectHost = 'http://modelcitizen.com.au/game-of-dom/';
var messagePath = 'ajax-messages/';
var winWidth, winHeight, winAlertLeft, winBody, currentMsg, reload;
var $GDMessageContainer = 0;


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

    $('head').append('<link rel="stylesheet" type="text/css" href="' + projectHost + 'css/game-of-dom.css">'); 

    currentMsg = 'welcome';
    popUp.messageFetch(currentMsg);

  }
}


//------------------------------------------------------------------------//
// all game messages added to $GDMessageContainer which is appended to body
// createContainer - creates the div but it is display:none at start
//------------------------------------------------------------------------//
var popUp = {
  
  messageCreateContainer : function () {
    winBody.append('<div id="GDMessageContainer" class="GoDText" />');
    $GDMessageContainer = $('#GDMessageContainer');
    $GDMessageContainer.css({'left': winAlertLeft + 'px'});
  },
  
  messageFetch : function (currentMsg) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      url: (projectHost + messagePath + currentMsg + '/'),
      success : function (ajaxData){
        popUp.messageShow(ajaxData);
      },
      error : function(){
        console.log('ajax popUp.messageFetch(' + currentMsg + ') error')
        popUp.messageShow('error');
      }
    });
  },

  messageShow : function (currentMsg) {
    
    // check if $GDMessageContainer exists
    // create $GDMessageContainer if not
    // empty $GDMessageContainer if exists
    if ($GDMessageContainer === 0){
      this.messageCreateContainer();
    } else {
      $GDMessageContainer.empty();
    };
    
    // check if stylesheet loaded before running fadeIn()
    if ($GDMessageContainer.is(':hidden')) {
      $GDMessageContainer.fadeIn(1000);
      clearInterval(reload)
    } else {
      reload = setInterval(function(){
        popUp.messageShow(currentMsg)
        console.log(currentMsg)
      }, 500);
    };
    $GDMessageContainer.append(currentMsg);
  }
};



//------------------------------------------------------------------------//
// start the party
//------------------------------------------------------------------------//
$(document).ready(function(){
  domGame.initialize();
});
