#Game of Dom

## What is it?

I don't know yet! 

I will be trying to build a script which you can launch on any web-page, then select two elements of that page, and watch them battle. The battle will involve each element's children fighting each other, one at a time, and they will won/lose accoridng to their attributes/types.

Attributes that affect this could include, colour, size, type (text, link, image) etc.

The idea is that there will be a little animation in the middle of the page showing the battle as it happens.

## How's it gonna work?

I don't know yet!

It's going to be made up of a bunch of different elements, the main ones being a support website (ROR), a bookmarklet, and a javascript that does all the heavy hitting.

1. bookmarklet
  - this is already done. You can grab the bookmarklet from the page and drag it into your bookmarks toolbar
  - now browse to any page on the web and click the bookmarklet
  - it loads the javascript from my site into the page you're on
2. Javascript
  - this is going to be difficult
  - it will allow you to select two divs from the page that you are on, and then re-draw them with all fo the child elements animating out of it in a 3d effect
  - the two divs will then battle
  - i'll need to create all of the rules for this
  - this will also need to communicate with the ROR backend via ajax requests, sending back scores and results of battles, and getting compiled page elemments to show on the host page
3. ROR backend
  - I thoght this would be easy but it wont
  - it will work as a leaderboard, showing all of the scores of all of the pages that have battled, and the divs and scores in question
  - it will also need to compile and serve-up a bunch of html pages for the javascript to feed into the host page

## Break it down into smaller tasks

### Bookmarklet

Already done
 
### Javascript

1. split this into appropriate models and functions, rather than just the usual mess of code that I normally create
  - initialize function
  - select function
  - redraw function
  - battle function
  - result function
  - ?
2. pull a bunch of different templates via ajax as required, at different points

### ROR

1. TDD the main models for this
2. establish the home page with leaderboard
3. get connection to the host page (via ajax) woring and get scores saving to the DB and showing on the leaerboard
4. work out how to generate some custom compiled template/pages that I can send back to the host

### Extras

1. webkit audio sound effects
2. coooool animations for the battle
