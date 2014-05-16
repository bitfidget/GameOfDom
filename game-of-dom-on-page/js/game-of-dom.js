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

    currentMsg = 'welcome';
    popUp.messageFetch(currentMsg);

    this.listen();

  },
  listen : function () {
    
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
    var url = (projectHost + messagePath + currentMsg + '/json.txt')
    $.ajax({
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      url: url,
      success : function (ajaxData){
        popUp.messageShow(ajaxData.html);
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
    if ($('#sanityTest').is(':hidden')) {
      $GDMessageContainer.fadeIn(1000);
      clearInterval(reload)
    } else {
      reload = setTimeout(function(){
        console.log('stylesheet not loaded yet - retry')
        popUp.messageShow(currentMsg)
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
