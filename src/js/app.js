const cards = [
  {
    id: '1',
    name: 'frog'
  },
  {
    id: '2',
    name: 'bird'
  },
  {
    id: '3',
    name: 'fish'
  },
  {
    id: '4',
    name: 'goose'
  },
  {
    id: '5',
    name: 'moose'
  },
  {
    id: '6',
    name: 'parrot'
  },
  {
    id: '7',
    name: 'lion'
  },
  {
    id: '8',
    name: 'tiger'
  }
]

const game = document.getElementById('game');
let gridBoard = cards.concat(cards);
gridBoard.sort(() => 0.5 - Math.random());
let flippedCards = [];

/**
 * emptyCard - resets the flippedCards array
 *
 * @param {Array} flippedCards
 */
const emptyCards = () => { flippedCards = []; }

/**
 * cardNotMatched - if the cards do not match
 */
const cardNotMatched = function() {
  console.log( 'rude, no match' );

  emptyCards();
}

/**
 * cardMatched - if the cards match
 */
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

/**
 * flipCard - if card is not already flipped, add class and call checkMatch
 */
const flipCard = function() {
  let match = this;
  
  if ( !match.classList.contains( 'flipped' ) ) {
    match.classList.add( 'flipped' );
    checkMatch( match );
  }
}

/**
 * Generate cards
 * 
 * @param {Object} cards
 */
for( let eachCard of gridBoard ) {
  const card = document.createElement('div');
  const icon = document.createElement('span');

  card.classList.add('tile');
  icon.classList.add('icon');

  card.dataset.type = eachCard.name;
  icon.innerHTML = eachCard.id;

  card.appendChild(icon);
  game.appendChild(card);

  card.addEventListener( 'click', flipCard );
}
