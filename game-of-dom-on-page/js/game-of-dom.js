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

    currentMsg = 'welcome';
    popUp.messageCreateContainer();
    popUp.messageFetch(currentMsg);
    popCrowd.initialize();

    this.listen();

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
      };
      if ($('#TEOne').length){
        setTimeout(domGame.stage(), 500)
      };
    });
  },

  stage : function () {
    popCrowd.initialize();

  }
};


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
    var url = (projectHost + messagePath + currentMsg + '/json.txt');
    $.ajax({
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      url: url,
      success : function (ajaxData){
        popUp.messageShow(ajaxData.html);
      },
      error : function(){
        console.log('ajax popUp.messageFetch(' + currentMsg + ') error');
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
      clearInterval(reload);
    } else {
      reload = setTimeout(function(){
        console.log('stylesheet not loaded yet - retry');
        popUp.messageShow(currentMsg);
      }, 500);
    };
    $GDMessageContainer.append(currentMsg);
  }
};

var popCrowd = {
  initialize : function () {
    winBody.append('<div id="domCrowd" />');
    $domCrowd = $('#domCrowd');
    $domCrowd.attr({
      'width' : winWidth,
      'height' : winHeight, 
    })
  }
}



//------------------------------------------------------------------------//
// start the party
//------------------------------------------------------------------------//
$(document).ready(function(){
  domGame.initialize();
});
