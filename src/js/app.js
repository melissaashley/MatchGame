const cards = [
  {
    id: '1',
    name: 'bomb'
  },
  {
    id: '2',
    name: 'diamond'
  },
  {
    id: '3',
    name: 'leaf'
  },
  {
    id: '4',
    name: 'paper'
  },
  {
    id: '5',
    name: 'bolt'
  },
  {
    id: '6',
    name: 'rocket'
  },
  {
    id: '7',
    name: 'send'
  },
  {
    id: '8',
    name: 'ghost'
  }
]

const game = document.getElementById('game');
const resetIt = document.getElementById("reset");
const winner = document.getElementById("winner");
const moves = document.getElementById("moves");
let flippedCards = [];
let gridBoard = cards.concat(cards);
let allCards = document.getElementsByClassName('tile');
let allFlipped = document.getElementsByClassName("flipped");
let count = 0;

//gridBoard.sort(() => 0.5 - Math.random());

/**
 * startGame - start the game
 */
const startGame = function( ) {
  console.log('the game has started');

  emptyCardsArray();

  count = 0;
  moves.innerHTML = 'Moves: ' + count;
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

  if( flippedCards.length === 2 ){

      if( flippedCards[0].getAttribute('data-type') === flippedCards[1].getAttribute('data-type') ){
        cardsMatch();
      } else {
        cardsDontMatch();
      }
  }
};

/**
 * cardsMatch - the cards match
 */
const cardsMatch = function( ) {
  flippedCards[0].classList.add('flipped');
  flippedCards[1].classList.add('flipped');

  addMove();
  removeSelectedAll();
  emptyCardsArray();
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
 * TODO: Handle this better, instead of removing classes prevent the clicks.
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
for ( let eachCard of gridBoard ) {
  const card = document.createElement('div');

  card.classList.add('tile', eachCard.name);
  card.dataset.type = eachCard.id;
  
  game.appendChild(card);

  card.addEventListener( 'click', flipCard );
  card.addEventListener( 'click', checkMatch );
  card.addEventListener( 'click', wonGame );
}