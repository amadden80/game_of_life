console.log(':)');


// ************** Global **************
var $canvas;  // Canvas Node... this is an html node
var context;  // Canvas Context... this is my connection to my canvas... WITH all the functions needed to draw
var numRows = 50;  // How many rows?
var numColumns = 50;  // How many columns?
var blockSize = 15;  // How many pixels should each square cell be?
var aliveColor = 'rgb(145, 45, 45)';  // What should a living cell look like?
var blockColor = 'rgb(255, 255, 255)';  // What should a non-living cell look like?
var worldState;  //  What is the current state of the world?



// Empty matrix of undefindes...
function worldGen(){                       // pretend numRows=3 & numColumns=2
  var localWorld = new Array(numRows);         // [undefined, undefined, undefined]
  for (var i = 0; i < numRows; i++) {  // Iterate through number of rows to populate the columns
    localWorld[i] = new Array(numColumns);     // [[undefined, undefined], [undefined, undefined], [undefined, undefined]]
  }
  return localWorld;
}

// *** Random Cell Birth **
function letThereBeLife(numBorn) {
  for (var i = 0; i < numBorn; i++) {   // numBorn number of times...
    var rowIndex = Math.floor(Math.random()*numRows); // Row: Randomly selected
    var colIndex = Math.floor(Math.random()*numColumns); // Column: Randomly selected
    worldState[rowIndex][colIndex] = true;  // It has life!
  }
  return worldState;
}


$(function(){

  worldState = worldGen(); // "And then there was the world"
  letThereBeLife(10); //  "Let there be life"..

  $canvas = $('#board');
  context = $canvas[0].getContext('2d');

  setInterval(function(){
    //  ... compute the next world state.
    //  ... redraw the world
  }, 50);

});
