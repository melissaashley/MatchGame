let grabCards = document.getElementsByClassName( 'tile' );
let cards = Array.from( grabCards );
let flippedCards = [];

// Empty Card Array after clicks
const emptyCards = function() {
  flippedCards = [];
}

// Card does not match
const cardNotMatched = function() {
  console.log( 'rude, no match' );

  emptyCards();
}

// Card is a match
const cardMatched = function() {
  console.log( 'it matches' );

  emptyCards();
}

// Check if card matches
const checkMatch = function( match ) {
  flippedCards.push( match.getAttribute( 'data-type' ) );
  let cardLength = flippedCards.length;
  let cardCount = 2;
  console.log( flippedCards );
  
  if( cardCount === cardLength ) {
    if( flippedCards[0] === flippedCards[1] ) {
      cardMatched();
    } else {
      cardNotMatched();
    }
  }
}

// Card is selected
const flipCard = function() {
  let match = this;
  
  if ( !match.classList.contains( 'flipped' ) ) {
    match.classList.add( 'flipped' );
    checkMatch( match );
  }
}

// Add Event Listener to each card
for( let eachCard of cards ) {
  eachCard.addEventListener( 'click', flipCard );
}



