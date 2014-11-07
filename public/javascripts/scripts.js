console.log(':)');


// ************** Global **************
var $canvas;  // Canvas Node... this is an html node
var context;  // Canvas Context... this is my connection to my canvas... WITH all the functions needed to draw
var numRows = 100;  // How many rows?
var numColumns = 100;  // How many columns?
var aliveColor = 'rgb(145, 45, 45)';  // What should a living cell look like?
var blockColor = 'rgb(200, 255, 255)';  // What should a non-living cell look like?
var worldState;  //  What is the current state of the world?
var blockSize = 15;  // How many pixels should each square cell be?


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



// Poke life with your mouse!
function lifeWand(e){
  var x = e.offsetX; // X: Where is the wand?
  var y = e.offsetY; // Y: Where is the wand?
  var col = Math.floor(x/blockSize); // Column: Where is the wand with relation to the cells
  var row = Math.floor(y/blockSize); // Row:    Where is the wand with relation to the cells
  worldState[row][col] = true; // Set the cell to living
  console.log('Life!');
}



function countNeighbors(row, col){
  var count = worldState[row][col] ? -1 : 0 ;  // If the cell is living... start with -1 to cancle... other wise start with 0
  for (var r = row-1; r <= row+1; r++) {  // Iterate through all the row indexes
    for (var c = col-1; c <= col+1; c++) {  // Iterate through all the column indexes
      if (r>=0 && c>=0 && r<numRows && c<numColumns && worldState[r][c]){  // If the cell is on the board... and alive
        count+=1;  // ... include it in the count
      }
    }
  }
  return count;
}


function tick() {
  var newWorld = worldGen();  //  Prepare the next world... starts out without life... all cells are non-living
  for (var row = 0; row < numRows; row++) {    // Iterate through all the row indexes
    for (var col = 0; col < numColumns; col++) {  // Iterate through all the column indexes
      var numNeighbors = countNeighbors(row, col);  // How many neighboring cells are there?
      if (numNeighbors===3){  // Regardless of living or not... if neighboring is 3...
        newWorld[row][col] = true;  // ... life remains/begins
      } else if (worldState[row][col] && numNeighbors===2){  // If alive with 2 neighbors...
        newWorld[row][col] = true; // ... life remains
      }
    }
  }
  worldState = newWorld;  // The globally define world is now... the newly prepared world
}



function drawWorld() {
  context.translate(0, 0); // This should not be needed... Andrew found it comforting to verify we are starting with a clean slate... which is should already do... given that we restore() on every draw...
  context.clearRect(0, 0, numRows*blockSize, numColumns*blockSize); // Clear all pixels... we are about to draw the board fresh

  for (var row = 0; row < numRows; row++) { // Iterate through all the row indexes
    for (var col = 0; col < numColumns; col++) {  // Iterate through all the column indexes
      var x = col * blockSize; // X: Starting location for the next block
      var y = row * blockSize; // Y: tarting location for the next block

      context.save(); // Save the state of the canvas
      context.translate(x, y);  // Set (0, 0) of the context to a new location
      context.fillStyle = worldState[row][col] ? aliveColor : blockColor;  // Color based on living or not living

      // // *** DRAW CIRLCE **
      context.beginPath();  // Place the pen on the papter
      var nudge = blockSize/2.5;  // Just some random numbers to nudge things left/right
      var radius = blockSize*1.5;  // For creative effect... make the cirlce size somewhat random
      context.arc(nudge, nudge,  Math.random()*radius, 0, Math.random()*2*Math.PI);  // Draw a circle
      context.fill(); // fill in the circle with color

      // *** DRAW RECTANGLE **
      // context.fillRect(0, 0, blockSize, blockSize);  // Draw a sqaure... It is at postion 0, 0 BECAUSE we translated before this

      context.restore(); // Apply the changes

    }
  }
}

function draw(){
  drawWorld();
}


// Document ready
$(function(){

  worldState = worldGen(); // "And then there was the world"
  letThereBeLife(numRows*numColumns);  //  "Let there be life"... (numRows*numColumns) was chosenly without good reason...  We are asking for some number of life at the begining... so I thought to make it realative to the size of the board.

   //   Andrew's preppared version.....
  // $canvas = $('#board');  // Search the dom for the canvas
  // $canvas.attr('width', blockSize*numColumns); // Modify the canvas width to match the needed size
  // $canvas.attr('height', blockSize*numRows); // Modify the canvas height to match the needed size
  // context = $canvas[0].getContext('2d'); // Obtain a 2d context of the canvas... this will include all the functioned needed to draw

  //   Amanda's version.....
  var docWidth = $(window).width();
  var docHeight = $(window).height();
  $canvas = $('#board');  // Search the dom for the canvas
  $canvas.attr('width', docHeight); // Modify the canvas width to match the needed size
  $canvas.attr('height', docHeight); // Modify the canvas height to match the needed size
  blockSize = docHeight/numRows;
  context = $canvas[0].getContext('2d'); // Obtain a 2d context of the canvas... this will include all the functioned needed to draw


  $canvas.on('mousemove', lifeWand); // The mouse is a life giver... when there is a mouse move event... life should follow


  setInterval(function(){
    tick(); //  ... compute the next world state.
    draw(); //  ... redraw the world
    // console.table(worldState);
  }, 100);

});
