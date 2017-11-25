//All of our cards
var cardOrder = [

'fa fa-diamond', 
'fa fa-paper-plane-o', 
'fa fa-btc',
'fa fa-bolt',
'fa fa-cube',
'fa fa-anchor',
'fa fa-leaf',
'fa fa-bicycle', 
'fa fa-diamond', 
'fa fa-paper-plane-o', 
'fa fa-anchor',
'fa fa-bolt',
'fa fa-cube',
'fa fa-btc',
'fa fa-leaf',
'fa fa-bicycle' 

 ];

var openCards = [],
move = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/* TO DO
1. Prohibit the ability to click on the same card twice
  a. Idea is to remove the class '.card' on click and then re-add it afterward
  -- this doesn't work, even without the class 'card', the items can still be clicked
2. End game window
3. Fix the reset
4. Reset the transitions for cards that have already been clicked on
*/


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  $('.card').each(function(index) {
    $(this).append('<i class= "'+ array[index] + '"></i>');
  });

  return array;
}

function match(array, item) {
  $("."+item).parent().addClass('match');
  console.log("match! with item: "+item);
  array.splice(0, 2); //emptys array
  $('.moves').html(move);
}

function noMatch(array, item) {
  console.log("no match!");
    $.each(array, function(index, value) {
      console.log(value);
      setTimeout(function() {
        $("."+value).parent().removeClass('open show');
        }, 2000);
    });
  array.splice(0, 2); //emptys array
  $('.moves').html(move);
  //add color + effect change for board to indicate incorrect
}

function addStar (className) {
  //*TO DO* use some sort of fancy transition or animation
  $(className).append('<i class= "fa fa-star"></i>');
  console.log("class name:" +className);
}

function matchChecker(array, item) {
  var Temp;
  array.push(item);
  console.log("array length is: " + array.length + "and contains: " + array);

  //run if the array only has one item in it
  if (array.length === 2) {
    move++;
    $.each(array, function(index, value) {

      //match
      if (array[0] === item) {
        match(array, item);

      //no match
      } else {
        noMatch(array, item);
      }
    });

    //$("."+item).parent().on('click', clickAction());
    //Temp = $("."+item).parent();
    console.log(Temp);
    addStar(".stars");
    return array;
  } 
}

function restart() {
  $('.card').removeChild();
  shuffle(cardOrder);
  move = 0;
}

function gameWon() {
  /*

  When the numner of DOM elements with the class .match = 16,
  pop up window with the announcement that your've won the game
  and with the indicators of number of moves
  restart();

  */
}

var cardFlip = function(target) {
  $(target).addClass('open show clicked').removeClass('card')
  .css({'transition': '500ms linear all', 'transform': 'rotateY(.5turn)'});
  console.log(target);
};

function clickOn(target) {
  setTimeout (function(target) {
    $(target).on('click', cardFlip);
    }, 2000);
}


$(document).ready(function() {

  //shuffle the card
  shuffle(cardOrder);

  //event listener for clicking on a card

  $('.card').click(function() {
    var thisOne = this;
    $('.this').on('click', cardFlip(this));
    var classClicked = $(this).children(':first').attr('class').slice(3);
    
    matchChecker(openCards, classClicked);

    $(this).off('click', cardFlip(thisOne)); //removes the event handler
    $(this).on('click', cardFlip(thisOne));


  });

  //Event listener for restart
  $('.restart').click(function() {
    restart();
  });

});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
