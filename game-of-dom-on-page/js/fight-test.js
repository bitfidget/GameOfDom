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

    this.startCorners();

  },
  startCorners : function () {
    var $hotdogs = $('#hotdogs');
    var $butterfly = $('#butterfly');
    
  },
}





























$(document).ready(function(){
  domGame.initialize();
});