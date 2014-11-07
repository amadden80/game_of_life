console.log(':)');


// ************** Global **************
var $canvas;  // Canvas Node... this is an html node
var context;  // Canvas Context... this is my connection to my canvas... WITH all the functions needed to draw
var numRows = 50;  // How many rows?
var numColumns = 50;  // How many columns?
var worldState;  //  What is the current state of the world?



// Empty matrix of undefindes...
function worldGen(){                       // pretend numRows=3 & numColumns=2
  var localWorld = new Array(numRows);         // [undefined, undefined, undefined]
  for (var i = 0; i < numRows; i++) {  // Iterate through number of rows to populate the columns
    localWorld[i] = new Array(numColumns);     // [[undefined, undefined], [undefined, undefined], [undefined, undefined]]
  }
  return localWorld;
}


$(function(){

  worldState = worldGen(); // "And then there was the world"
  //  "Let there be life"..

  $canvas = $('#board');
  context = $canvas[0].getContext('2d');

  setInterval(function(){
    //  ... compute the next world state.
    //  ... redraw the world
  }, 50);

});
