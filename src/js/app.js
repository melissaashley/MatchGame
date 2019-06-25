/**
 * cards - data and duplicate
 */
let cards = ['bomb', 'diamond', 'leaf', 'paper', 'bolt', 'rocket', 'send', 'ghost'];
let gridBoard = cards.concat(cards);

/**
 * DOM elements
 */
const game = document.getElementById('game');
const resetIt = document.getElementById('reset');
const winner = document.getElementById('winner');
const moves = document.getElementById("moves");
let allCards = document.getElementsByClassName('tile');
let allFlipped = document.getElementsByClassName('flipped');
let flippedCards = [];
let count = 0;

/**
 * startGame - start the game
 */
const startGame = function( ) {
  emptyCardsArray();

  // Clear board
  game.innerHTML = '';

  // Shuffle it
  gridBoard.sort(() => 0.5 - Math.random());

  generateCardBoard();

  // Reset Moves
  count = 0;
  moves.innerHTML = 'Moves: ' + count;

  // Reset Winner
  winner.innerHTML = '';
  winner.classList.remove('won');
}

/**
 * resetGame - reset the game
 */
resetIt.addEventListener( 'click', startGame );

/**
 * emptyCard - resets the flippedCards array
 *
 * @param {Array} flippedCards
 */
const emptyCardsArray = () => { flippedCards = []; }


/**
 * flipCard - add selected class when selected
 */
const flipCard = function( ) {
  if( !this.classList.contains('flipped') ) {
    this.classList.add( 'selected' );
  }
}

/**
 * checkMatch - check if the cards match
 */
const checkMatch = function( ) {
  flippedCards.push( this );

  if ( flippedCards.length === 1 ){
    // Remove the event listener so they can't match the identical card (double click)
    flippedCards[0].removeEventListener( 'click', checkMatch );
  }

  if( flippedCards.length === 2 ){
    if( flippedCards[0].getAttribute('data-type') === flippedCards[1].getAttribute('data-type') ){
      cardsMatch();
    } else {
      cardsDontMatch();
      
      // Add listener back when cards don't match
      flippedCards[0].addEventListener( 'click', checkMatch );
    }
  }
};

/**
 * cardsMatch - the cards match
 */
const cardsMatch = function( ) {
  flippedCards[0].classList.add('flipped');
  flippedCards[1].classList.add('flipped');

  // Prevents additional moves being tallied once you have flipped the correct cards
  flippedCards[0].removeEventListener( 'click', checkMatch );
  flippedCards[1].removeEventListener( 'click', checkMatch );

  addMove();
  removeSelectedAll();
  emptyCardsArray();

  // Check if the game was won after the last match
  wonGame();
}

/**
 * cardsDontMatch - the cards do NOT match
 */
const cardsDontMatch = function( ) {
  addMove();

  setTimeout( function() {
    flippedCards[0].classList.remove('selected');
    flippedCards[1].classList.remove('selected');

    removeSelectedAll();
    emptyCardsArray();
  }, 600 );
}

/**
 * removeSelectedAll - remove selected from all cards when cards do not match
 * TODO: Handle this better, instead of removing classes prevent the clicks
 */
const removeSelectedAll = function( ) {
  for ( let card of allCards ) {
    card.classList.remove('selected');
  }
}

/**
 * wonGame - notification if the user wins the game
 */
const wonGame = function( ) {
  let totalCards = 16;

  if ( totalCards === allFlipped.length ){
    winner.classList.add('won');
    winner.innerHTML = 'You won the game!';

    window.scrollTo(0, 0);
  }
}

/**
 * addMove - update the number of moves
 */
const addMove = function( ) {
  count += 1;

  moves.innerHTML = 'Moves: ' + count;
}

/**
 * Generate cards
 * 
 * @param {Object} cards
 */
const generateCardBoard = function( ) {
  for ( let eachCard of gridBoard ) {
    const card = document.createElement('div');

    card.classList.add('tile', eachCard);
    card.dataset.type = eachCard;
    
    game.appendChild(card);

    card.addEventListener( 'click', flipCard );
    card.addEventListener( 'click', checkMatch );
  }
}

startGame();