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

 ],
openCards = [],
move = 11,
matchedCards = 14,
time,
duration;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

function addModal() {
  $('#lean_overlay').append('<h1 class= "overlay-text overlay-heading"><b>Congratulations</b></h1>')
    .append('<h3 class= "overlay-text rating">You Won!</h3>')
    .append('<h3 class= "overlay-text rating">Your rating: </h3>')
    .append('<h3 class= "overlay-text time">Completion Time: '+ duration + ' Seconds</h3>')
    .append('<h2 class= "overlay-text play-again">Play Again?</h2>');
    $('.play-again').after('<button class= "overlay-text play-button">Play Again</button>');
    $('.play-button').after('<button class= "modal-close">Close</button>');

  $('.fa-star').each(function() {
    $('rating').append('<li><i class="fa fa-star"></i></li>');
  });
}

function trackScore() {
  if (move === 1) {
    $('.moves').html(move+" Move");

  } else {
    $('.moves').html(move+" Moves");
  }

  if (move % 10 === 0) {
    $('.stars').children(':first').remove();
  }
}

function match(array, item) {
  $("."+item).parent().addClass('match').removeClass('clicked');

  array.splice(0, 2);

  matchedCards = matchedCards + 2;

  if (matchedCards === 16) {
    $(document).leanModal({ top : 200, overlay : 0.9, closeButton: ".modal-close" });
    addModal();
  }

  trackScore();
}

function noMatch(array, item) {

  console.log(array);

  trackScore();

  $.each(array, function(index, value) {
    setTimeout(function() {
      $('.clicked').css({'background-color': 'red'});
      }, 450); 
  
    setTimeout(function() {
      $('.'+value).parent().removeClass('open show')
      .css({'background-color': ''});
      array.splice(0, 2); //emptys array
      }, 1100);

    setTimeout(function() {
      $('.'+value).parent().css({'transition': '', 'transform': ''})
      .removeClass('clicked');
      }, 1600);
  });
}

function matchChecker(array, item) {
  array.push(item);

  if (array.length === 2) { //run if two .cards have been clicked on
    move++;

    if (array[0] === item) {
      match(array, item);

    } else {
      noMatch(array, item);
    }
  } 
}

function restart() {
  $('.card').empty()
  .removeClass('open show clicked match');

  shuffle(cardOrder);

  $('.moves').html("");

  time = new Date();

  displayRating('.stars');

  if (move > 30) {
    $(displayClass).append('<li><i class="fa fa-star"></i></li>');
    $(displayClass).append('<li><i class="fa fa-star"></i></li>');
    $(displayClass).append('<li><i class="fa fa-star"></i></li>');
    alert("Game reset!");

  } else if (move > 20) {
    $(displayClass).append('<li><i class="fa fa-star"></i></li>');
    $(displayClass).append('<li><i class="fa fa-star"></i></li>');
    alert("Game reset!");

  } else if (move > 10 ) {
    $(displayClass).append('<li><i class="fa fa-star"></i></li>');
    alert("Game reset!");

  } else {
    alert("Game reset!");
  }

  move = 0;
}

//Click event for checking cards
var cardFlip = function(target) {
  $(target).addClass('open show clicked')
  .css({'transition': '400ms linear all', 'transform': 'rotateY(.5turn)'});
};

$(document).ready(function() {
 //shuffle the card
  shuffle(cardOrder);

  //start the timer on the first click only
  $('.deck').one('click', function() {
    time = new Date();
  });

  //event listener for clicking on a card
  $('.card').click(function() {

    if ($(this).hasClass('clicked') === false && openCards.length < 2) {
      $('.this').on('click', cardFlip(this));

      var classClicked = $(this).children(':first').attr('class').slice(3);

      matchChecker(openCards, classClicked);

    } else {
      return;
    }

    setInterval(function() {
      duration = Math.ceil(new Date() - time) / 1000;
      }, 1000);

  });

  //Event listener for restart
  $('.restart').click(function() {
    restart();
  });

  $('.play-again').click(function() {
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
